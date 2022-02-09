import type { RequestHandler } from "@sveltejs/kit";

import { dev } from "$app/env";
import cookie from "cookie";
import { sign } from "cookie-signature";
import jwt from "jsonwebtoken";

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
  const { access_token: accessToken } = await gitHubResponse.json();

  return accessToken;
};

const getUser = async (accessToken: string) => {
  const gitHubResponse = await fetch("https://api.github.com/user", {
    headers: {
      Accept: "application/json",
      Authorization: `Token ${accessToken}`,
    },
  });
  const { login, name } = await gitHubResponse.json();

  return {
    login,
    name,
  };
};

const signJwtAndSerializeCookie = (
  payload: Record<string, unknown>
): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, (error, token) => {
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
  const code = url.searchParams.get("code");
  const accessToken = await getAccessToken(code);
  const user = await getUser(accessToken);

  // TODO: Persist user in database

  const userCookie = await signJwtAndSerializeCookie(user);

  return {
    status: 302,
    headers: {
      "set-cookie": [userCookie],
      location: "/",
    },
  };
};
