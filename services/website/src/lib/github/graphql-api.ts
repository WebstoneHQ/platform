import type { Octokit } from "@octokit/core";

import { parse as parseYaml } from "yaml";

import { getSystemOctokit } from "$lib/github/helpers";

const REPO_BRANCH = "main";

type LessonConfig = {
  name: string;
  id: string;
};

type ReadFileResponse = {
  repository: {
    object?: {
      text: string;
    };
  };
};

type ReadLessonConfigFilesResponse = {
  repository: {
    object?: {
      entries: {
        name: string;
        type: "blog" | "tree";
        object: {
          entries: {
            name: string;
            type: "blog" | "tree";
            object: {
              text: string;
            };
          }[];
        };
      }[];
    };
  };
};

type QueryRepositoryResponse = {
  repository: {
    name?: string;
  };
};

export const cloneTemplateRepositoryMutation = async (
  userOctokit: Octokit,
  ownerId: string
): Promise<void> => {
  await userOctokit.graphql(
    `mutation($ownerId: ID!) {
    cloneTemplateRepository(input: {
      description: "Your Webstone Education courses. Learn more at https://webstone.app."
      name: "webstone-education"
      ownerId: $ownerId
      repositoryId: "R_kgDOHFnt3g"
      visibility: PRIVATE
    }) {
      repository {
        id
      }
    }
  }`,
    {
      ownerId: ownerId,
    }
  );
};

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

export const readFile = async (
  owner: string,
  repo: string,
  path: string
): Promise<string> => {
  const expression = `${REPO_BRANCH}:${path}`;
  const result: ReadFileResponse = await getSystemOctokit().graphql(
    `query ReadFile($owner: String!, $name: String!, $expression: String!) {
    repository(owner: $owner, name: $name) {
      object(expression: $expression) {
        ... on Blob{
          text
        }
      }
    }
  }`,
    {
      owner,
      name: repo,
      expression,
    }
  );

  if (!result.repository.object?.text) {
    console.log(result);
    throw new Error(
      `Cannot read file. Owner: ${owner}; repo: ${repo}; expression: ${expression}`
    );
  }

  return result.repository.object.text;
};

export const readFileYaml = async <TConfig>(
  owner: string,
  repo: string,
  path: string
): Promise<TConfig> => {
  const fileContent = await readFile(owner, repo, path);
  return parseYaml(fileContent) as TConfig;
};

export const readLessonConfigFiles = async (
  owner: string,
  repo: string,
  path: string
): Promise<
  {
    id: string;
    name: string;
  }[]
> => {
  const result: ReadLessonConfigFilesResponse =
    await getSystemOctokit().graphql(
      `query ReadLessonConfigFiles($owner: String!, $name: String!, $expression: String!) {
    repository(owner: $owner, name: $name) {
      object(expression: $expression) {
        ... on Tree {
          entries {
            name
            type
            object {
              ... on Tree {
                entries {
                  name
                  type
                  object {
                    ... on Blob {
                      text
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`,
      {
        owner,
        name: repo,
        expression: `${REPO_BRANCH}:${path}`,
      }
    );

  if (!result.repository.object?.entries) {
    return [];
  }

  return result.repository.object.entries
    .filter((entry) => entry.type === "tree")
    .map(
      (entry) =>
        ({
          ...parseYaml(
            entry.object.entries.find((entry) => entry.name === "config.yaml")
              ?.object.text || ""
          ),
          id: `${entry.name
            .replace("[...", "")
            .replaceAll("_", "-")
            .replace("]", "-")}`, // convert "[...01_00]course-introduction" to "01-00-course-introduction"
        } as LessonConfig)
    )
    .sort((a, b) => a.id.localeCompare(b.id));
};

export const queryRepository = async (
  userOctokit: Octokit,
  owner: string,
  name: string
): Promise<{ name?: string }> => {
  const result: QueryRepositoryResponse = await userOctokit.graphql(
    `query QueryRepository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
    }
  }`,
    {
      owner,
      name,
    }
  );

  if (result.repository === null) {
    throw new Error(`Repository does not exist: ${owner}/${name}`);
  }

  return result.repository;
};
