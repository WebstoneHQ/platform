import type { RequestHandler } from "@sveltejs/kit";

import PrismaClient from "$lib/db/prisma";

const db = new PrismaClient();

export const post: RequestHandler = async ({ request }) => {
  const form = await request.formData();
  if (form.get("curriculumId")) {
    const curriculumId = String(form.get("curriculumId"));
    await db.curriculum.update({
      where: {
        id: curriculumId,
      },
      data: {
        email: String(form.get("email")),
      },
    });
  } else {
    await db.curriculum.create({
      data: {
        email: String(form.get("email")),
      },
    });
  }

  return {
    status: 301,
    headers: {
      location: "/",
    },
  };
};
