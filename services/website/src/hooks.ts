import type { GetSession, Handle } from "@sveltejs/kit";

import { dev } from "$app/env";
import { sequence } from "@sveltejs/kit/hooks";
import * as cookie from "cookie";
import * as cookieParser from "cookie-parser";
import * as jwt from "jsonwebtoken";

interface JwtUser {
  id: string;
  name: string;
  provider_login: string;
}

const throwInProdIfNotSet = (devValue: string) => {
  if (dev) {
    return devValue;
  }
  throw new Error(`Environment variable not specified. Dev value: ${devValue}`);
};

const {
  COOKIE_SECRET = throwInProdIfNotSet("cookie-dev-secret"),
  JWT_SECRET = throwInProdIfNotSet("jwt-dev-secret"),
} = process.env;

const handleUser: Handle = async ({ event, resolve }) => {
  const cookies = cookie.parse(event.request.headers.get("cookie") || "");

  if (cookies.jwt) {
    const jwtToken = cookieParser.signedCookie(cookies.jwt, [COOKIE_SECRET]);
    const user = jwtToken
      ? (jwt.verify(jwtToken, JWT_SECRET) as JwtUser)
      : null;
    event.locals.user = {
      // Extend this with other necessary properties, but beware this is available publicly
      name: user?.name || "",
      id: user?.id,
      providerLogin: user?.provider_login,
    };
  }
  const response = await resolve(event);
  return response;
};

export const handle = sequence(handleUser);

export const getSession: GetSession = ({ locals }) => ({
  user: locals.user,
});
