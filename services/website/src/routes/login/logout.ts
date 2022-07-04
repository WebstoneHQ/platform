import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = () => {
  return {
    status: 302,
    headers: {
      "set-cookie": "jwt=; path=/; max-age=-1",
      location: "/",
    },
  };
};
