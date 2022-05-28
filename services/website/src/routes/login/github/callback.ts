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
  isRepositoryCollaborator,
  signJwtAndSerializeCookie,
} from "./_helpers";

export const get: RequestHandler = async ({ url }) => {
  const code = url.searchParams.get("code") || "";
  const userOctokit = await getUserOctokit(code);
  const gitHubUser = await getGitHubUser(userOctokit);
  const persistedUser = await createUser(gitHubUser);
  const systemOctokit = getSystemOctokit();

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

  if (
    !(await isRepositoryCollaborator(
      userOctokit,
      gitHubUser.providerLogin,
      "webstone-education",
      "mikenikles"
    ))
  ) {
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
  }

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

  if (persistedUser) {
    const userCookie = await signJwtAndSerializeCookie(persistedUser);
    console.log("AAA");
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
