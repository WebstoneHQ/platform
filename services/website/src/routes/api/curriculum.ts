import type { RequestHandler } from "@sveltejs/kit";
import { v4 as uuid } from "uuid";

export const post: RequestHandler<unknown, FormData> = async ({ body }) => {
  const curriculumId = uuid();
  await fetch(process.env.WEBHOOK_ENDPOINT_SUBMIT_CURRICULUM, {
    body: JSON.stringify({
      ...body,
      id: curriculumId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  return {
    body: { curriculumId },
    status: 201,
  };
};
