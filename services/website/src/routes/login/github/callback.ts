import type { RequestHandler } from "@sveltejs/kit";

import { cloneTemplateRepository, createUser, getAccessToken, getUser as getGitHubUser, signJwtAndSerializeCookie } from "./_helpers";

export const get: RequestHandler = async ({ url }) => {
  const code = url.searchParams.get("code") || "";
  const accessToken = await getAccessToken(code);
  const gitHubUser = await getGitHubUser(accessToken);
  const persistedUser = await createUser(gitHubUser);

  await cloneTemplateRepository(gitHubUser.id);

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
