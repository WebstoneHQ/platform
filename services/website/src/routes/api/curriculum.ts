import type { RequestHandler } from "@sveltejs/kit";
import { v4 as uuid } from "uuid";

export const post: RequestHandler = async ({ request }) => {
  const body = (await request.json()) as Record<string, unknown>;
  const curriculumId = uuid();
  const payload = {
    ...body,
    id: curriculumId,
  };

  await fetch(process.env.WEBHOOK_ENDPOINT_SUBMIT_CURRICULUM || "", {
    body: JSON.stringify(payload),
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
