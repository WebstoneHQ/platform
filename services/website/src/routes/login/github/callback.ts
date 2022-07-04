import type { Octokit } from "@octokit/core";
import type { RequestHandler } from "@sveltejs/kit";

import {
  cloneTemplateRepository,
  createRepositorySecret,
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
  // dispatchRepositoryEvent,
  getActionsWorkflow,
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

const _waitForActionsWorkflowToBeReady = async (
  systemOctokit: Octokit,
  gitHubUser: User
) => {
  for (let i = 1; i <= 5; i++) {
    // Let's talk about this loop... enabling Actions on a newly created repo is an asynchronous operation.
    // This not-so-elegant loop waits for GitHub to complete that operation.
    // Yes, I agree. This should be cleaned up at some point.
    console.log(
      `Waiting for Actions workflow "new-content-available.yml" to be available in repository ${gitHubUser.providerLogin}/webstone-education... ${i}/5`
    );
    try {
      await getActionsWorkflow(
        systemOctokit,
        gitHubUser.providerLogin,
        "webstone-education",
        "new-content-available.yml"
      );
    } catch (_error) {
      // We can ignore this
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  console.error(
    new Error(
      `Actions workflow "new-content-available.yml" is not available in repository ${gitHubUser.providerLogin}/webstone-education.`
    )
  );
};

// const _provideCourseToStudent = async (
//   systemOctokit: Octokit,
//   gitHubUser: User,
//   courseId: string,
//   stackgroup: string,
//   stack: string
// ) => {
//   console.log(
//     `Providing course ${courseId}-${stackgroup}-${stack} to student ${gitHubUser.providerLogin}`
//   );

//   const clientPayload = {
//     course: {
//       id: courseId,
//       stackgroup,
//       stack,
//       privateDeployKeyName:
//         `COURSE_REPO_PRIVATE_DEPLOY_KEY_${courseId}_${stackgroup}_${stack.replaceAll(
//           "-",
//           "_"
//         )}`.toUpperCase(),
//     },
//     git: {
//       branch: `new-course-${courseId}-${stackgroup}-${stack}`,
//       commitmessage: "Add new course",
//     },
//     pr: {
//       title: "New Course 🎉",
//       description: `Hi :wave:,

// Fantastic news, a new course is available. Please review this PR and when ready, merge it to update your own course content.`,
//     },
//   };
//   await dispatchRepositoryEvent(
//     systemOctokit,
//     clientPayload,
//     "on_new_content_available",
//     gitHubUser.providerLogin,
//     "webstone-education"
//   );
//   console.log(
//     `Provided course ${courseId}-${stackgroup}-${stack} to student ${gitHubUser.providerLogin}`
//   );
// };

export const get: RequestHandler = async ({ url }) => {
  const code = url.searchParams.get("code") || "";
  const state = JSON.parse(
    Buffer.from(url.searchParams.get("state") || "", "base64").toString()
  ) as GitHubSignUpState;
  const userOctokit = await getUserOctokit(code);
  const gitHubUser = await getGitHubUser(userOctokit);

  if (!(await hasPreordered(state.preorderId, gitHubUser.providerLogin))) {
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

  const persistedUser = await createUser(gitHubUser);
  const systemOctokit = getSystemOctokit();
  await _cloneTemplateRepository(userOctokit, gitHubUser);
  await _addSystemUserAsRepoCollaborator(
    systemOctokit,
    userOctokit,
    gitHubUser
  );
  await _addCourseDeployPrivateKeyToStudentRepo(systemOctokit, gitHubUser);
  await _waitForActionsWorkflowToBeReady(systemOctokit, gitHubUser);
  // await _provideCourseToStudent(
  //   systemOctokit,
  //   gitHubUser,
  //   state.course.id,
  //   state.course.stackgroup,
  //   state.course.stack
  // );

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
