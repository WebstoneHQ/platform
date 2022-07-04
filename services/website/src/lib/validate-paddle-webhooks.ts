import { createVerify } from "crypto";
import { serialize } from "php-serialize";

type JsonWithStrings = {
  [key: string]: string;
};

const publicKeySandbox = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEApQg3FoPsWuzTLOqU7Oqh
qhPkxNg5YOsvAAN0Bbi8AyQ0fBiprd/BigNcciIKD/ou/X0di/3ZUSuGoLihTKg0
J8bYQtwn/lvwZ37vNrThXPA6flrjoKkTSD5DcryF/UrIPB17gpK0ZYEN1lrwvuL8
35u5Uy+2+GU0lFQjVpsX6roNayONnmonveh2GBFZgcFuEnAx6S+D/GxmrdKeUfN/
X/UxtHHTqhAZuxmFjLaLOKOkwyb3S+Dvfu11uMvKEnT54aslB2+QLwbTHWCJSO8x
GzA/a0ZqMbFBPOJVFpjZPMvafLhhNndIEdSho4VxmE5c9p/6cefygUZm/wSi6NcT
o7qQJjRHzD55ArTwKE9Qq0GBNIEjR8yhvIX+BAxFgTZIDsca9baKJkhdVq7CU6hm
8GCpd3OFc+D8d04B1BAvidC/kPIH6S1HqlONbkh5slc5WLvR/QYU1rvK1tQMEBxe
AKMvfPcr3bGjZyFi7EYa97aG6vc9u5sAmFZBfCwiFZrtXOJrG67mMAi2s7VjOH/q
di1k7IIA68Xb6e/iIHjsadZV6LEESObfACZRI1oUnXu6zP6uCvGfns9l4J+X4NBO
oTJvVehPqj8NpNTyKNp6Vk4Ek7rIpiMFPTigOnfF2Xgl8rlseRm2LTHjE1R6A+p/
0t6RABsPf0sLKItUbwWWEuMCAwEAAQ==
-----END PUBLIC KEY-----`;

const publicKeyProduction = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAw8AzJaVjEVFSp0zgfRhw
gUfNjZplPpyPKOEuAEJ1c4WVKfCoLiDMwwmPXLTmKPQ/jNoDecHcR/S4OW0PE7l9
WXBgHuw1+X1kkCx7yVnt6GrapRLDLQtm4jDClecD/7PSbkBhS5ZMAXPl/hLa8vAN
6Ax7vIyYLOOA781aE4sZRBJVFGBMVeeJ0KRHtVdgLglsjMe8zaU3ugDu8aOGM/qX
wgtifhxnlVuNoD17JE5FFnP9jgVYm7PP5wGcVs68dTz3UbSk0k7OLBZaXUk64E7c
YE2CAXPieuwiD+oQWO82jkjiCcPaQVZGRNf6CTs2dLs5ryQmUpvOxHq2rgjX32KG
1qR7dEBJU+LFPOtVNXGxH9x+Eu6YVxIDSiKafeNfJ1/xY49WiDW12yhb4mA7UXwf
ny2D+R2lEGK3uknD5eV/MHM5Wow/HoR79DfqscIqnahihTJaaJ9bFKfnyGajscOt
WgEMBi3O1xN7dB0LTiLg1jzgSc5ZQqZY0QGVC7Iu1MNo1UMyAkC+rTCULJ+YfsoT
Ez/IFL6uSJvvUxhmE5GEsnib7RxnkTncTODqbKJ+mCvTQkVAE/WoHKkXhVyqkYKi
cUDykMgxmY50qsVqAwD/KjCiLFhBi8zK7N/Ug+soAA07FCPWjxgGlB3FneYghhhX
0mYPKf2RWFIyM3p2fslJHLMCAwEAAQ==
-----END PUBLIC KEY-----`;

const sortJsonObjectByKeys = (obj: JsonWithStrings) => {
  const keys = Object.keys(obj).sort();
  const sortedObj: JsonWithStrings = {};
  for (const i of keys) {
    sortedObj[i] = obj[i];
  }
  return sortedObj;
};

/**
 * Determines whether a webhook was genuinely sent by Paddle.
 *
 * @param body FormData The body received from Paddle.
 * @returns boolean true if the webhook was genuinely sent by Paddle, false otherwise.
 * @see https://developer.paddle.com/webhook-reference/ZG9jOjI1MzUzOTg2-verifying-webhooks
 */
export const isValidateWebhook = (body: FormData): boolean => {
  const webhookSignature = Buffer.from(
    String(body.get("p_signature")),
    "base64"
  );
  body.delete("p_signature");
  const bodyJson: {
    [key: string]: string;
  } = {};
  body.forEach((value, key) => {
    bodyJson[key] = value.toString();
  });

  const sortedBodyJson = sortJsonObjectByKeys(bodyJson);
  for (const property in sortedBodyJson) {
    if (
      Object.prototype.hasOwnProperty.call(sortedBodyJson, property) &&
      typeof sortedBodyJson[property] !== "string"
    ) {
      if (Array.isArray(sortedBodyJson[property])) {
        // is it an array
        sortedBodyJson[property] = sortedBodyJson[property].toString();
      } else {
        //if its not an array and not a string, then it is a JSON obj
        sortedBodyJson[property] = JSON.stringify(sortedBodyJson[property]);
      }
    }
  }

  const serialized = serialize(sortedBodyJson);
  const verifier = createVerify("sha1");
  verifier.update(serialized);
  verifier.end();

  return verifier.verify(
    process.env.VERCEL_ENV === "production"
      ? publicKeyProduction
      : publicKeySandbox,
    webhookSignature
  );
};
