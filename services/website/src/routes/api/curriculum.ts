import type { RequestHandler } from "@sveltejs/kit";

import PrismaClient from "$lib/db/prisma";

const db = new PrismaClient();

export const post: RequestHandler = async ({ request }) => {
  const body = (await request.json()) as Record<string, unknown>;

  const persistedCurriculum = await db.curriculum.create({
    data: {
      web: body.web as string,
      styles: body.styles as string,
      apitype: body.apitype as string,
      api: body.api as string,
      database: body.database as string,
    },
  });

  return {
    body: { curriculumId: persistedCurriculum.id },
    status: 201,
  };
};
