import type { Octokit } from "@octokit/core";

export const acceptRepositoryInvitation = async (
  octokit: Octokit,
  invitationId: number
): Promise<void> => {
  // May 22, 2022: REST API because the GraphQL API does not provide this feature
  await octokit.request("PATCH /user/repository_invitations/{invitation_id}", {
    invitation_id: invitationId,
  });
};

export const addRepositoryCollaborator = async (
  octokit: Octokit,
  owner: string,
  repo: string,
  username: string
): Promise<number> => {
  // May 22, 2022: REST API because the GraphQL API does not provide this feature
  const { data } = await octokit.request(
    "PUT /repos/{owner}/{repo}/collaborators/{username}",
    {
      owner,
      repo,
      username,
    }
  );
  if (!data) {
    throw new Error("User is already a collaborator");
  }
  return data.id;
};

export const forkRepository = async (
  octokit: Octokit,
  owner: string,
  repo: string,
  organization?: string
): Promise<string> => {
  // May 22, 2022: REST API because the GraphQL API does not provide this feature
  const {
    data: { name },
  } = await octokit.request("POST /repos/{owner}/{repo}/forks", {
    owner,
    repo,
    organization,
  });
  return name;
};

export const renameRepository = async (
  octokit: Octokit,
  owner: string,
  repo: string,
  newName: string
) => {
  await octokit.request("PATCH /repos/{owner}/{repo}", {
    owner,
    repo,
    name: newName,
  });
};
