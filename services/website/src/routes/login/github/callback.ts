import type { RequestHandler } from "@sveltejs/kit";

import {
  cloneTemplateRepository,
  createUser,
  doesRepositoryExist,
  getUserOctokit,
  getGitHubUser,
  signJwtAndSerializeCookie,
} from "./_helpers";

export const get: RequestHandler = async ({ url }) => {
  const code = url.searchParams.get("code") || "";
  const userOctokit = await getUserOctokit(code);
  const gitHubUser = await getGitHubUser(userOctokit);
  const persistedUser = await createUser(gitHubUser);

  if (
    !(await doesRepositoryExist(
      userOctokit,
      gitHubUser.providerLogin,
      "webstone-education"
    ))
  ) {
    await cloneTemplateRepository(userOctokit, gitHubUser.id);
  }

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
