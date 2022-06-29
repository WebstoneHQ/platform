import type { Octokit } from "@octokit/core";
// import * as libsodium from "libsodium-wrappers";
import { crypto_box_seal, ready as libsodiumReady } from "libsodium-wrappers";

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

export const dispatchRepositoryEvent = async (
  octokit: Octokit,
  clientPayload: Record<string, unknown>,
  eventType: string,
  owner: string,
  repo: string
) => {
  await octokit.request("POST /repos/{owner}/{repo}/dispatches", {
    owner,
    repo,
    event_type: eventType,
    client_payload: clientPayload,
  });
};

export const createRepositorySecret = async (
  octokit: Octokit,
  owner: string,
  repo: string,
  secretName: string,
  value: string
) => {
  const {
    data: { key, key_id },
  } = await octokit.request(
    "GET /repos/{owner}/{repo}/actions/secrets/public-key",
    {
      owner,
      repo,
    }
  );

  const messageBytes = Buffer.from(value);
  const keyBytes = Buffer.from(key, "base64");

  await libsodiumReady;
  const encryptedBytes = crypto_box_seal(messageBytes, keyBytes);
  const encryptedValue = Buffer.from(encryptedBytes).toString("base64");

  await octokit.request(
    "PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}",
    {
      owner,
      repo,
      secret_name: secretName,
      encrypted_value: encryptedValue,
      key_id,
    }
  );
};

export const getRepositorySecret = async (
  octokit: Octokit,
  owner: string,
  repo: string,
  secretName: string
) => {
  const {
    data: { name },
  } = await octokit.request(
    "GET /repos/{owner}/{repo}/actions/secrets/{secret_name}",
    {
      owner,
      repo,
      secret_name: secretName,
    }
  );

  return name;
};
