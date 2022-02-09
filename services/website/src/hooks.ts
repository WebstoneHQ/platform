import type { GetSession, Handle } from "@sveltejs/kit";

import { dev } from "$app/env";
import { sequence } from "@sveltejs/kit/hooks";
import cookie from "cookie";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

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
    const user = jwtToken ? (jwt.verify(jwtToken, JWT_SECRET) as User) : null;
    event.locals.user = {
      login: user?.login,
      name: user?.name,
    };
  }
  const response = await resolve(event);
  return response;
};

export const handle = sequence(handleUser);

export const getSession: GetSession = ({ locals }) => ({
  user: locals.user,
});
