import type { RequestHandler } from "@sveltejs/kit";

type Payload = {
  email: string;
  curriculumId?: string;
};

export const post: RequestHandler = async ({ request }) => {
  const form = await request.formData();
  const payload: Payload = {
    email: String(form.get("email")),
  };
  if (form.get("curriculumId")) {
    payload.curriculumId = String(form.get("curriculumId"));
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
