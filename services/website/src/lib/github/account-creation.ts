import type { Octokit } from "@octokit/core";
import {
  Prisma,
  type PrismaClient,
  type User as PrismaUser,
} from "@prisma/client";

import {
  cloneTemplateRepository as cloneTemplateRepositoryRest,
  doesRepositoryExist,
} from "$lib/github/helpers";
import {
  acceptRepositoryInvitation,
  addRepositoryCollaborator,
} from "$lib/github/rest-api";

const addSystemUserAsRepoCollaborator = async (
  userOctokit: Octokit,
  gitHubUser: User
) => {
  try {
    console.log(
      `Inviting "webstone-education-bot" as a collaborator for GitHub user: ${gitHubUser.providerLogin}`
    );
    const invitationId = await addRepositoryCollaborator(
      userOctokit,
      gitHubUser.providerLogin,
      "webstone-education",
      "webstone-education-bot"
    );
    console.log(
      `Invited "webstone-education-bot" as a collaborator for GitHub user: ${gitHubUser.providerLogin}`
    );
    console.log(
      `Accepting "webstone-education-bot" collaborator invitation for GitHub user: ${gitHubUser.providerLogin}`
    );
    await acceptRepositoryInvitation(invitationId);
    console.log(
      `Accepted "webstone-education-bot" collaborator invitation for GitHub user: ${gitHubUser.providerLogin}`
    );
  } catch (error: unknown) {
    console.log(`"webstone-education-bot" is already a collaborator.`);
  }
};

const cloneTemplateRepository = async (
  userOctokit: Octokit,
  gitHubUser: User
) => {
  if (
    !(await doesRepositoryExist(
      userOctokit,
      gitHubUser.providerLogin,
      "webstone-education"
    ))
  ) {
    console.log(
      `Cloning template repo for GitHub user: ${gitHubUser.providerLogin}`
    );
    await cloneTemplateRepositoryRest(userOctokit, gitHubUser);
    console.log(
      `Cloned template repo for GitHub user: ${gitHubUser.providerLogin}`
    );
  }
};

const createUser = async (
  db: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >,
  user: User
): Promise<PrismaUser> => {
  let persistedUser: PrismaUser;
  try {
    persistedUser = await db.user.create({
      data: {
        name: user.name || "",
        provider: user.provider,
        provider_email: user.providerEmail,
        provider_id: user.providerId,
        provider_login: user.providerLogin,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // https://www.prisma.io/docs/reference/api-reference/error-reference
      if (error.code === "P2002") {
        const tempDbUser = await db.user.findFirst({
          where: {
            provider: user.provider,
            provider_id: user.providerId,
          },
        });
        if (tempDbUser) {
          persistedUser = await db.user.update({
            where: {
              id: tempDbUser.id,
            },
            data: {
              last_login_at: new Date(),
            },
          });
        }
      } else {
        console.error(
          `Unexpected error when processing the GitHub callback GET handler: ${String(
            error
          )}`
        );
      }
    } else {
      console.error(
        `Unexpected error when processing the GitHub callback GET handler: ${String(
          error
        )}`
      );
    }
  }
  return persistedUser;
};

export const createAccount = async (
  db: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >,
  gitHubUser: User,
  userOctokit: Octokit
) => {
  const persistedUser = await createUser(db, gitHubUser);
  await cloneTemplateRepository(userOctokit, gitHubUser);
  await addSystemUserAsRepoCollaborator(userOctokit, gitHubUser);
  return persistedUser;
};
