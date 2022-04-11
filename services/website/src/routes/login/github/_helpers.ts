import { dev } from "$app/env";
import cookie from "cookie";
import { sign } from "cookie-signature";
import jwt from "jsonwebtoken";
import { Octokit } from "octokit";
import PrismaClient from "$lib/db/prisma";
import { Prisma } from "@prisma/client";
import { cloneTemplateRepositoryMutation } from "$lib/github-graphql-queries";

const db = new PrismaClient();
const octokit = new Octokit({ auth: "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" });

const throwInProdIfNotSet = (devValue: string) => {
  if (dev) {
    return devValue;
  }
  throw new Error(`Environment variable not set. Dev value: ${devValue}`);
};

const cookieConfig: cookie.CookieSerializeOptions = {
  path: "/",
  maxAge: 1000 * 60 * 60 * 24 * 7,
  httpOnly: true,
  sameSite: true,
  secure: true,
};

const {
  COOKIE_SECRET = throwInProdIfNotSet("cookie-dev-secret"),
  GITHUB_CLIENT_ID = throwInProdIfNotSet("github-client-id"),
  GITHUB_CLIENT_SECRET = throwInProdIfNotSet("cookie-dev-secret"),
  JWT_SECRET = throwInProdIfNotSet("jwt-dev-secret"),
} = process.env;

export const cloneTemplateRepository = async (gitHubUserId: string) => {
  await cloneTemplateRepositoryMutation(octokit, gitHubUserId);
}

export const createUser = async (user: User) => {
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
  return persistedUser;
};

export const getAccessToken = async (code: string) => {
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

export const getUser = async (accessToken: string): Promise<User> => {
  const gitHubResponse = await fetch("https://api.github.com/user", {
    headers: {
      Accept: "application/json",
      Authorization: `Token ${accessToken}`,
    },
  });
  const response = (await gitHubResponse.json()) as {
    id: string,
    node_id: string;
    email: string;
    login: string;
    name: string;
  };
  console.log({response})
  const { id, node_id, email, login, name } = response;

  return {
    id: node_id,
    name,
    provider: "github",
    providerEmail: email,
    providerId: `${id}`,
    providerLogin: login,
  };
};

export const signJwtAndSerializeCookie = (
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
