import type { Octokit } from "@octokit/core";
import type { RequestHandler } from "@sveltejs/kit";

import {
  cloneTemplateRepository,
  createUser,
  doesRepositoryExist,
  getSystemOctokit,
  getUserOctokit,
  hasPreordered,
  signJwtAndSerializeCookie,
} from "./_helpers";

import { getGitHubUser } from "$lib/github/graphql-api";

import {
  acceptRepositoryInvitation,
  addRepositoryCollaborator,
  createRepositorySecret,
  dispatchRepositoryEvent,
} from "$lib/github/rest-api";

const _cloneTemplateRepository = async (
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
    await cloneTemplateRepository(userOctokit, gitHubUser);
    console.log(
      `Cloned template repo for GitHub user: ${gitHubUser.providerLogin}`
    );
  }
};

const _addSystemUserAsRepoCollaborator = async (
  systemOctokit: Octokit,
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
    await acceptRepositoryInvitation(systemOctokit, invitationId);
    console.log(
      `Accepted "webstone-education-bot" collaborator invitation for GitHub user: ${gitHubUser.providerLogin}`
    );
  } catch (error: unknown) {
    console.log(`"webstone-education-bot" is already a collaborator.`);
  }
};

const _addCourseDeployPrivateKeyToStudentRepo = async (
  systemOctokit: Octokit,
  gitHubUser: User
) => {
  console.log(
    `Adding course deploy private key to student repo: ${gitHubUser.providerLogin}/webstone-education`
  );
  await createRepositorySecret(
    systemOctokit,
    gitHubUser.providerLogin,
    "webstone-education",
    "COURSE_REPO_PRIVATE_DEPLOY_KEY_TODOAPP_FRAMEWORK_SVELTEKIT_CSS_REST_POSTGRESQL",
    process.env[
      "COURSE_REPO_PRIVATE_DEPLOY_KEY_TODOAPP_FRAMEWORK_SVELTEKIT_CSS_REST_POSTGRESQL"
    ]
  );
  console.log(
    `Added course deploy private key to student repo: ${gitHubUser.providerLogin}/webstone-education`
  );
};

const _provideCourseToStudent = async (
  systemOctokit: Octokit,
  gitHubUser: User
) => {
  // FIXME: Use dynamic values once we have more than one course/stack
  const courseid = "todoapp";
  const stackgroup = "framework";
  const stack = "sveltekit-css-rest-postgresql";
  console.log(
    `Providing course ${courseid}-${stackgroup}-${stack} to student ${gitHubUser.providerLogin}`
  );

  const clientPayload = {
    course: {
      id: courseid,
      stackgroup,
      stack,
      privateDeployKeyName:
        `COURSE_REPO_PRIVATE_DEPLOY_KEY_${courseid}_${stackgroup}_${stack.replaceAll(
          "-",
          "_"
        )}`.toUpperCase(),
    },
    git: {
      branch: `${new Date()
        .toISOString()
        .replaceAll(":", "")
        .replace(/\.\d{3}/, "")}-${courseid}-${stackgroup}-${stack}`,
      commitmessage: "Add new course",
    },
    pr: {
      title: "New Course 🎉",
      description: `Hi :wave:,

Fantastic news, a new course is available. Please review this PR and when ready, merge it to update your own course content.`,
    },
  };
  await dispatchRepositoryEvent(
    systemOctokit,
    clientPayload,
    "on_new_content_available",
    gitHubUser.providerLogin,
    "webstone-education"
  );
  console.log(
    `Provided course ${courseid}-${stackgroup}-${stack} to student ${gitHubUser.providerLogin}`
  );
};

export const get: RequestHandler = async ({ url }) => {
  const code = url.searchParams.get("code") || "";
  const state = url.searchParams.get("state") || "";
  const userOctokit = await getUserOctokit(code);
  const gitHubUser = await getGitHubUser(userOctokit);

  if (!(await hasPreordered(state, gitHubUser.providerLogin))) {
    console.error(
      `GitHub user ${gitHubUser.providerLogin} tried to sign up with GitHub but has not pre-ordered. OAuth state provided: ${state}`
    );
    return {
      status: 302,
      headers: {
        location: "/login",
      },
    };
  }

  const persistedUser = await createUser(gitHubUser);
  const systemOctokit = getSystemOctokit();
  await _cloneTemplateRepository(userOctokit, gitHubUser);
  await _addSystemUserAsRepoCollaborator(
    systemOctokit,
    userOctokit,
    gitHubUser
  );
  await _addCourseDeployPrivateKeyToStudentRepo(systemOctokit, gitHubUser);
  await _provideCourseToStudent(systemOctokit, gitHubUser);

  if (persistedUser) {
    const userCookie = await signJwtAndSerializeCookie(persistedUser);
    return {
      status: 302,
      headers: {
        "set-cookie": [userCookie],
        location:
          "/courses/todo-app/framework/sveltekit-css-rest-postgresql?refreshToLoadCookie=true",
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
