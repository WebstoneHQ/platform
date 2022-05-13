import type { GetSession, Handle } from "@sveltejs/kit";

import { dev } from "$app/env";
import { sequence } from "@sveltejs/kit/hooks";
import { parse } from "cookie";
import { signedCookie } from "cookie-parser";
import { verify } from "jsonwebtoken";

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
  const cookies = parse(event.request.headers.get("cookie") || "");

  if (cookies.jwt) {
    const jwtToken = signedCookie(cookies.jwt, [COOKIE_SECRET]);
    const user = jwtToken ? (verify(jwtToken, JWT_SECRET) as User) : null;
    event.locals.user = {
      // Extend this with other necessary properties, but beware this is available publicly
      name: user?.name || "",
      id: user?.id,
    };
  }
  const response = await resolve(event);
  return response;
};

export const handle = sequence(handleUser);

export const getSession: GetSession = ({ locals }) => ({
  user: locals.user,
});
