import type { RequestHandler } from "@sveltejs/kit";

import { dev } from "$app/env";

const throwInProdIfNotSet = (devValue: string) => {
  if (dev) {
    return devValue;
  }
  throw new Error(`Environment variable not set. Dev value: ${devValue}`);
};

const { GITHUB_CLIENT_ID = throwInProdIfNotSet("github-client-id") } =
  process.env;

export const get: RequestHandler = ({ url }) => {
  return {
    status: 302,
    headers: {
      location: `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user:email%20public_repo&state=${url.searchParams.get(
        "state"
      )}`,
    },
  };
};
