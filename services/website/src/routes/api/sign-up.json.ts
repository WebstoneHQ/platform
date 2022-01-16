import type { RequestHandler } from "@sveltejs/kit";

export const post: RequestHandler<unknown, FormData> = async ({ body }) => {
  await fetch(process.env.WEBHOOK_ENDPOINT_SIGN_UP, {
    body: JSON.stringify({ email: body.get("email") }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  return {
    status: 301,
    headers: {
      location: "/",
    },
  };
};
