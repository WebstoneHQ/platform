import type { Prisma, PrismaClient } from "@prisma/client";

export const hasPreordered = async (
  db: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >,
  preorderId: string,
  gitHubUsername: string
): Promise<boolean> => {
  const count = await db.preorder.count({
    where: {
      id: preorderId,
      form_github_username: gitHubUsername,
    },
  });

  return count >= 1;
};
