import type { RequestHandler } from "@sveltejs/kit";

type Payload = {
  email: string;
  curriculumId?: string;
};

export const post: RequestHandler<unknown, FormData> = async ({ body }) => {
  const payload: Payload = {
    email: body.get("email"),
  };
  if (body.get("curriculumId")) {
    payload.curriculumId = body.get("curriculumId");
  }

  await fetch(process.env.WEBHOOK_ENDPOINT_SIGN_UP, {
    body: JSON.stringify(payload),
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
