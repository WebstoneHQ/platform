import type { RequestHandler } from "@sveltejs/kit";

import { dev } from "$app/env";
import cookie from "cookie";
import { sign } from "cookie-signature";
import jwt from "jsonwebtoken";
import PrismaClient from "$lib/db/prisma";
import { Prisma } from "@prisma/client";

const db = new PrismaClient();

const throwInProdIfNotSet = (devValue: string) => {
  if (dev) {
    return devValue;
  }
  throw new Error(`Environment variable not set. Dev value: ${devValue}`);
};

const {
  COOKIE_SECRET = throwInProdIfNotSet("cookie-dev-secret"),
  GITHUB_CLIENT_ID = throwInProdIfNotSet("github-client-id"),
  GITHUB_CLIENT_SECRET = throwInProdIfNotSet("cookie-dev-secret"),
  JWT_SECRET = throwInProdIfNotSet("jwt-dev-secret"),
} = process.env;

const cookieConfig: cookie.CookieSerializeOptions = {
  path: "/",
  maxAge: 1000 * 60 * 60 * 24 * 7,
  httpOnly: true,
  sameSite: true,
  secure: true,
};

const getAccessToken = async (code: string) => {
  const gitHubResponse = await fetch(
    `https://github.com/login/oauth/access_token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      }),
    }
  );
  const { access_token: accessToken } = (await gitHubResponse.json()) as {
    access_token: string;
  };

  return accessToken;
};

const getUser = async (accessToken: string): Promise<User> => {
  const gitHubResponse = await fetch("https://api.github.com/user", {
    headers: {
      Accept: "application/json",
      Authorization: `Token ${accessToken}`,
    },
  });
  const { id, email, login, name } = (await gitHubResponse.json()) as {
    id: string;
    email: string;
    login: string;
    name: string;
  };

  return {
    id: "ignored-but-needed-by-typescript-theres-probably-a-better-way",
    name,
    provider: "github",
    providerEmail: email,
    providerId: `${id}`,
    providerLogin: login,
  };
};

const signJwtAndSerializeCookie = (
  payload: Record<string, unknown>
): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, (error, token = "") => {
      if (error) {
        console.error(error);
        reject();
      }
      const value = `s:${sign(token, COOKIE_SECRET)}`;
      const serializedCookie = cookie.serialize("jwt", value, cookieConfig);
      resolve(serializedCookie);
    });
  });
};

export const get: RequestHandler = async ({ url }) => {
  const code = url.searchParams.get("code") || "";
  const accessToken = await getAccessToken(code);
  const user = await getUser(accessToken);

  let persistedUser;
  try {
    persistedUser = await db.user.create({
      data: {
        name: user.name,
        provider: user.provider,
        provider_email: user.providerEmail,
        provider_id: user.providerId,
        provider_login: user.providerLogin,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // https://www.prisma.io/docs/reference/api-reference/error-reference
      if (error.code === "P2002") {
        const tempDbUser = await db.user.findFirst({
          where: {
            provider: user.provider,
            provider_id: user.providerId,
          },
        });
        if (tempDbUser) {
          persistedUser = await db.user.update({
            where: {
              id: tempDbUser.id,
            },
            data: {
              last_login_at: new Date(),
            },
          });
        }
      }
    } else {
      console.error(
        `Unexpected error when processing the GitHub callback GET handler: ${String(
          error
        )}`
      );
    }
  }

  if (persistedUser) {
    const userCookie = await signJwtAndSerializeCookie(persistedUser);
    return {
      status: 302,
      headers: {
        "set-cookie": [userCookie],
        location: "/dashboard",
      },
    };
  }

  return {
    status: 302,
    headers: {
      location: "/login",
    },
  };
};
