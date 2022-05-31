import { dev } from "$app/env";
import {
  serialize as serializeCookie,
  type CookieSerializeOptions,
} from "cookie";
import { sign as signCookie } from "cookie-signature";
import { sign as signJwt } from "jsonwebtoken";
import { Octokit } from "@octokit/core";
import { createOAuthUserAuth } from "@octokit/auth-oauth-user";
import PrismaClient from "$lib/db/prisma";
import { Prisma, type User as PrismaUser } from "@prisma/client";
import {
  cloneTemplateRepositoryMutation,
  queryRepository,
} from "$lib/github-graphql-queries";

const db = new PrismaClient();

const throwInProdIfNotSet = (devValue: string) => {
  if (dev) {
    return devValue;
  }
  throw new Error(`Environment variable not set. Dev value: ${devValue}`);
};

const cookieConfig: CookieSerializeOptions = {
  path: "/",
  maxAge: 1000 * 60 * 60 * 24 * 7,
  httpOnly: true,
  sameSite: true,
  secure: true,
};

const {
  COOKIE_SECRET = throwInProdIfNotSet("cookie-dev-secret"),
  GITHUB_CLIENT_ID = throwInProdIfNotSet("github-client-id"),
  GITHUB_CLIENT_SECRET = throwInProdIfNotSet("cookie-dev-secret"),
  JWT_SECRET = throwInProdIfNotSet("jwt-dev-secret"),
} = process.env;

export const acceptRepositoryInvitation = async (
  octokit: Octokit,
  invitationId: number
): Promise<void> => {
  // May 22, 2022: REST API because the GraphQL API does not provide this feature
  await octokit.request("PATCH /user/repository_invitations/{invitation_id}", {
    invitation_id: invitationId,
  });
};

export const addRepositoryCollaborator = async (
  octokit: Octokit,
  owner: string,
  repo: string,
  username: string
): Promise<number> => {
  // May 22, 2022: REST API because the GraphQL API does not provide this feature
  const { data } = await octokit.request(
    "PUT /repos/{owner}/{repo}/collaborators/{username}",
    {
      owner,
      repo,
      username,
    }
  );
  if (!data) {
    throw new Error("User is already a collaborator");
  }
  return data.id;
};

export const forkRepository = async (
  octokit: Octokit,
  owner: string,
  repo: string,
  organization?: string
): Promise<string> => {
  // May 22, 2022: REST API because the GraphQL API does not provide this feature
  const {
    data: { name },
  } = await octokit.request("POST /repos/{owner}/{repo}/forks", {
    owner,
    repo,
    organization,
  });
  return name;
};

export const renameRepository = async (
  octokit: Octokit,
  owner: string,
  repo: string,
  newName: string
) => {
  await octokit.request("PATCH /repos/{owner}/{repo}", {
    owner,
    repo,
    name: newName,
  });
};

export const cloneTemplateRepository = async (
  userOctokit: Octokit,
  gitHubUserId: string
): Promise<void> => {
  await cloneTemplateRepositoryMutation(userOctokit, gitHubUserId);
};

export const createUser = async (user: User): Promise<PrismaUser> => {
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

export const getUserOctokit = async (code: string): Promise<Octokit> => {
  const webflowOctokit = new Octokit({
    authStrategy: createOAuthUserAuth,
    auth: {
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      code,
    },
  });

  const auth = (await webflowOctokit.auth()) as { token: string };
  return new Octokit({
    auth: auth.token,
  });
};

export const getSystemOctokit = () =>
  new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

export const getGitHubUser = async (userOctokit: Octokit): Promise<User> => {
  const result: {
    viewer: {
      id: string;
      email: string;
      login: string;
      name: string;
    };
  } = await userOctokit.graphql(`query {
    viewer {
      databaseId
      email
      id
      login
      name
    }
  }`);

  const { email, id, login, name } = result.viewer;
  return {
    id,
    name,
    provider: "github",
    providerEmail: email,
    providerId: `${id}`,
    providerLogin: login,
  };
};

export const doesRepositoryExist = async (
  userOctokit: Octokit,
  owner: string,
  name: string
): Promise<boolean> => {
  try {
    await queryRepository(userOctokit, owner, name);
    return true;
  } catch (error) {
    return false;
  }
};

export const signJwtAndSerializeCookie = (
  payload: Record<string, unknown>
): Promise<string> => {
  return new Promise((resolve, reject) => {
    signJwt(payload, JWT_SECRET, (error, token = "") => {
      if (error) {
        console.error(error);
        reject();
      }
      const value = `s:${signCookie(token, COOKIE_SECRET)}`;
      const serializedCookie = serializeCookie("jwt", value, cookieConfig);
      resolve(serializedCookie);
    });
  });
};
