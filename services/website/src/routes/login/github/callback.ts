import type { RequestHandler } from "@sveltejs/kit";

import { createAccount } from "$lib/github/account-creation";
import { purchaseCourse } from "$lib/github/course-purchase";

import { getGitHubUser } from "$lib/github/graphql-api";

import { getUserOctokit } from "$lib/github/helpers";

import { signJwtAndSerializeCookie } from "$lib/cookies-and-jwt";
import { hasPreordered } from "$lib/preorders";
import PrismaClient from "$lib/db/prisma";

const db = new PrismaClient();

export const get: RequestHandler = async ({ url }) => {
  const code = url.searchParams.get("code") || "";
  const state = JSON.parse(
    Buffer.from(url.searchParams.get("state") || "", "base64").toString()
  ) as GitHubSignUpState;
  const userOctokit = await getUserOctokit(code);
  const gitHubUser = await getGitHubUser(userOctokit);

  if (!(await hasPreordered(db, state.preorderId, gitHubUser.providerLogin))) {
    console.error(
      `GitHub user ${
        gitHubUser.providerLogin
      } tried to sign up with GitHub but has not pre-ordered. OAuth state provided: ${JSON.stringify(
        state
      )}`
    );
    return {
      status: 302,
      headers: {
        location: "/login",
      },
    };
  }

  const persistedUser = await createAccount(db, gitHubUser, userOctokit);

  await purchaseCourse(
    gitHubUser /*, {
    id: state.course.id,
    stackgroup: state.course.stackgroup,
    stack: state.course.stack,
  }*/
  );

  if (persistedUser) {
    const userCookie = await signJwtAndSerializeCookie(persistedUser);
    return {
      status: 302,
      headers: {
        "set-cookie": [userCookie],
        location: `/courses/${state.course.id}/${state.course.stackgroup}/${state.course.stack}?refreshToLoadCookie=true`,
      },
    };
  }

  return {
    status: 302,
    headers: {
      location: "/login",
    },
  };
};
