import type { Octokit } from "@octokit/core";

import { parse as parseYaml } from "yaml";

const REPO_OWNER = "webstonehq";
const REPO_NAME = "courses";
const REPO_BRANCH = "mikenikles/add-the-framework-sveltekit-10";

type LessonConfig = {
  name: string;
  id: string;
};

type ListDirectoriesResponse = {
  repository: {
    object?: {
      entries: {
        name: string;
        type: "blog" | "tree";
      }[];
    };
  };
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
  octokit: Octokit,
  ownerId: string
): Promise<void> => {
  await octokit.graphql(
    `mutation($ownerId: ID!) {
    cloneTemplateRepository(input: {
      description: "Your Webstone Education courses."
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

export const listDirectories = async (
  octokit: Octokit,
  path: string
): Promise<string[]> => {
  const result: ListDirectoriesResponse = await octokit.graphql(
    `query ListDirectories($owner: String!, $name: String!, $expression: String!) {
    repository(owner: $owner, name: $name) {
      object(expression: $expression) {
        ... on Tree {
          entries {
            name
            type
          }
        }
      }
    }
  }`,
    {
      owner: REPO_OWNER,
      name: REPO_NAME,
      expression: `${REPO_BRANCH}:${path}`,
    }
  );

  if (!result.repository.object?.entries) {
    return [];
  }

  return result.repository.object.entries
    .filter((entry) => entry.type === "tree")
    .map((entry) => entry.name);
};

export const readFile = async (
  octokit: Octokit,
  path: string
): Promise<string> => {
  const result: ReadFileResponse = await octokit.graphql(
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
      owner: REPO_OWNER,
      name: REPO_NAME,
      expression: `${REPO_BRANCH}:${path}`,
    }
  );

  if (!result.repository.object?.text) {
    console.log(result);
    throw new Error(
      `Cannot read file. Owner: ${REPO_OWNER}; name: ${REPO_NAME}; expression: ${REPO_BRANCH}:${path}`
    );
  }

  return result.repository.object.text;
};

export const readFileYaml = async <TConfig>(
  octokit: Octokit,
  path: string
): Promise<TConfig> => {
  const fileContent = await readFile(octokit, path);
  return parseYaml(fileContent) as TConfig;
};

export const readLessonConfigFiles = async (
  octokit: Octokit,
  path: string
): Promise<
  {
    id: string;
    name: string;
  }[]
> => {
  const result: ReadLessonConfigFilesResponse = await octokit.graphql(
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
      owner: REPO_OWNER,
      name: REPO_NAME,
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
        parseYaml(
          entry.object.entries.find((entry) => entry.name === "config.yaml")
            ?.object.text || ""
        ) as LessonConfig
    )
    .sort((a, b) => a.id.localeCompare(b.id));
};

export const queryRepository = async (
  octokit: Octokit,
  owner: string,
  name: string
): Promise<{ name?: string }> => {
  const result: QueryRepositoryResponse = await octokit.graphql(
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
