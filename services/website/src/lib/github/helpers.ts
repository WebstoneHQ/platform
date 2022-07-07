import { Octokit } from "@octokit/core";
import { createOAuthUserAuth } from "@octokit/auth-oauth-user";

import { throwInProdIfNotSet } from "$lib/env-vars";
import {
  cloneTemplateRepositoryMutation,
  queryRepository,
} from "$lib/github/graphql-api";

import {
  createRepositorySecret as createRepositorySecretRest,
  getRepositorySecret,
} from "$lib/github/rest-api";

const {
  GITHUB_CLIENT_ID = throwInProdIfNotSet("github-client-id"),
  GITHUB_CLIENT_SECRET = throwInProdIfNotSet("cookie-dev-secret"),
} = process.env;

export const cloneTemplateRepository = async (
  userOctokit: Octokit,
  gitHubUser: User
): Promise<void> => {
  await cloneTemplateRepositoryMutation(userOctokit, gitHubUser.id);
  for (let i = 1; i <= 5; i++) {
    // Let's talk about this loop... creating a repo based on a template is an asynchronous operation.
    // This not-so-elegant loop waits for GitHub to complete that operation.
    // Yes, I agree. This should be cleaned up at some point.
    console.log(
      `Waiting for repository ${gitHubUser.providerLogin}/webstone-education to be created... ${i}/5`
    );
    if (
      await doesRepositoryExist(
        userOctokit,
        gitHubUser.providerLogin,
        "webstone-education"
      )
    ) {
      console.log(
        `Repository ${gitHubUser.providerLogin}/webstone-education is created.`
      );
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  console.error(
    new Error(
      `Repository could not be created for student ${gitHubUser.providerLogin} from template.`
    )
  );
};

export const createRepositorySecret = async (
  owner: string,
  repo: string,
  secretName: string,
  value: string
): Promise<void> => {
  await createRepositorySecretRest(owner, repo, secretName, value);
  for (let i = 1; i <= 5; i++) {
    // Let's talk about this loop... creating a repo secret is an asynchronous operation.
    // This not-so-elegant loop waits for GitHub to complete that operation.
    // Yes, I agree. This should be cleaned up at some point.
    console.log(
      `Waiting for secret ${secretName} to be added to repository ${owner}/${repo} to be created... ${i}/5`
    );
    if (await getRepositorySecret(owner, repo, secretName)) {
      console.log(
        `Secret ${secretName} created in repository ${owner}/${repo}.`
      );
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  console.error(
    new Error(
      `Secret ${secretName} could not be created in repository ${owner}/${repo}.`
    )
  );
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
