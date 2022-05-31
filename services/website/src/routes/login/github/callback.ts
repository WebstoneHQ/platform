import type { Octokit } from "@octokit/core";
import type { RequestHandler } from "@sveltejs/kit";

import {
  acceptRepositoryInvitation,
  addRepositoryCollaborator,
  cloneTemplateRepository,
  createUser,
  doesRepositoryExist,
  forkRepository,
  renameRepository,
  getUserOctokit,
  getGitHubUser,
  getSystemOctokit,
  signJwtAndSerializeCookie,
} from "./_helpers";

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
    await cloneTemplateRepository(userOctokit, gitHubUser.id);
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
      `Inviting "mikenikles" as a collaborator for GitHub user: ${gitHubUser.providerLogin}`
    );
    const invitationId = await addRepositoryCollaborator(
      userOctokit,
      gitHubUser.providerLogin,
      "webstone-education",
      "mikenikles"
    );
    console.log(
      `Invited "mikenikles" as a collaborator for GitHub user: ${gitHubUser.providerLogin}`
    );
    console.log(
      `Accepting "mikenikles" collaborator invitation for GitHub user: ${gitHubUser.providerLogin}`
    );
    await acceptRepositoryInvitation(systemOctokit, invitationId);
    console.log(
      `Accepted "mikenikles" collaborator invitation for GitHub user: ${gitHubUser.providerLogin}`
    );
  } catch (error: unknown) {
    console.log(`"mikenikles" is already a collaborator.`);
  }
};

const _forkUserRepoToWebstoneStudentsOrg = async (
  systemOctokit: Octokit,
  gitHubUser: User
) => {
  console.log(`Forking repo for GitHub user: ${gitHubUser.providerLogin}`);
  const forkedRepoName = await forkRepository(
    systemOctokit,
    gitHubUser.providerLogin,
    "webstone-education",
    "webstonehq-student-repos"
  );
  console.log(`Forked repo for GitHub user: ${gitHubUser.providerLogin}`);
  console.log(`Renaming repo for GitHub user: ${gitHubUser.providerLogin}`);
  await renameRepository(
    systemOctokit,
    "webstonehq-student-repos",
    forkedRepoName,
    `webstone-education-${gitHubUser.providerLogin}`
  );
  console.log(`Renamed repo for GitHub user: ${gitHubUser.providerLogin}`);
};

export const get: RequestHandler = async ({ url }) => {
  const code = url.searchParams.get("code") || "";
  const userOctokit = await getUserOctokit(code);
  const gitHubUser = await getGitHubUser(userOctokit);
  const persistedUser = await createUser(gitHubUser);
  const systemOctokit = getSystemOctokit();

  await _cloneTemplateRepository(userOctokit, gitHubUser);
  await _addSystemUserAsRepoCollaborator(
    systemOctokit,
    userOctokit,
    gitHubUser
  );
  await _forkUserRepoToWebstoneStudentsOrg(systemOctokit, gitHubUser);

  if (persistedUser) {
    const userCookie = await signJwtAndSerializeCookie(persistedUser);
    return {
      status: 302,
      headers: {
        "set-cookie": [userCookie],
        location: "/courses/sveltekit-css-rest-postgresql",
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
