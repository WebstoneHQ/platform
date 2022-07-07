import {
  serialize as serializeCookie,
  type CookieSerializeOptions,
} from "cookie";
import { sign as signCookie } from "cookie-signature";
import { sign as signJwt } from "jsonwebtoken";

import { throwInProdIfNotSet } from "$lib/env-vars";

const {
  COOKIE_SECRET = throwInProdIfNotSet("cookie-dev-secret"),
  JWT_SECRET = throwInProdIfNotSet("jwt-dev-secret"),
} = process.env;

const cookieConfig: CookieSerializeOptions = {
  path: "/",
  maxAge: 1000 * 60 * 60 * 24 * 7,
  httpOnly: true,
  sameSite: true,
  secure: true,
};

export const signJwtAndSerializeCookie = (
  payload: Record<string, unknown>
): Promise<string> => {
  return new Promise((resolve, reject) => {
    signJwt(payload, JWT_SECRET, (error, token = "") => {
      if (error) {
        console.error(error);
        reject();
      }
      const value = `s:${signCookie(token, COOKIE_SECRET)}`;
      const serializedCookie = serializeCookie("jwt", value, cookieConfig);
      resolve(serializedCookie);
    });
  });
};
