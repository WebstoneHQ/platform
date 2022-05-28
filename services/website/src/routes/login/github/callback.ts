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
    await cloneTemplateRepository(userOctokit, gitHubUser.id);
  }

  if (
    !(await isRepositoryCollaborator(
      userOctokit,
      gitHubUser.providerLogin,
      "webstone-education",
      "mikenikles"
    ))
  ) {
    const invitationId = await addRepositoryCollaborator(
      userOctokit,
      gitHubUser.providerLogin,
      "webstone-education",
      "mikenikles"
    );
    await acceptRepositoryInvitation(systemOctokit, invitationId);
  }

  const forkedRepoName = await forkRepository(
    systemOctokit,
    gitHubUser.providerLogin,
    "webstone-education",
    "webstonehq-student-repos"
  );
  await renameRepository(
    systemOctokit,
    "webstonehq-student-repos",
    forkedRepoName,
    `webstone-education-${gitHubUser.providerLogin}`
  );

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
