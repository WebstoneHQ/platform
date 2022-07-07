import type { Octokit } from "@octokit/core";
import * as libsodium from "@devtomio/sodium";

import { getSystemOctokit } from "$lib/github/helpers";

export const acceptRepositoryInvitation = async (
  invitationId: number
): Promise<void> => {
  // May 22, 2022: REST API because the GraphQL API does not provide this feature
  await getSystemOctokit().request(
    "PATCH /user/repository_invitations/{invitation_id}",
    {
      invitation_id: invitationId,
    }
  );
};

export const addRepositoryCollaborator = async (
  userOctokit: Octokit,
  owner: string,
  repo: string,
  username: string
): Promise<number> => {
  // May 22, 2022: REST API because the GraphQL API does not provide this feature
  const { data } = await userOctokit.request(
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
  clientPayload: Record<string, unknown>,
  eventType: string,
  owner: string,
  repo: string
) => {
  await getSystemOctokit().request("POST /repos/{owner}/{repo}/dispatches", {
    owner,
    repo,
    event_type: eventType,
    client_payload: clientPayload,
  });
};

export const createRepositorySecret = async (
  owner: string,
  repo: string,
  secretName: string,
  value: string
) => {
  const {
    data: { key, key_id },
  } = await getSystemOctokit().request(
    "GET /repos/{owner}/{repo}/actions/secrets/public-key",
    {
      owner,
      repo,
    }
  );

  const messageBytes = Buffer.from(value);
  const keyBytes = Buffer.from(key, "base64");

  const encryptedBytes = libsodium.crypto_box_seal(messageBytes, keyBytes);
  const encryptedValue = Buffer.from(encryptedBytes).toString("base64");

  await getSystemOctokit().request(
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
  owner: string,
  repo: string,
  secretName: string
) => {
  const {
    data: { name },
  } = await getSystemOctokit().request(
    "GET /repos/{owner}/{repo}/actions/secrets/{secret_name}",
    {
      owner,
      repo,
      secret_name: secretName,
    }
  );

  return name;
};

export const getActionsWorkflow = async (
  owner: string,
  repo: string,
  workflowIdOrFilename: string
) => {
  const { data } = await getSystemOctokit().request(
    "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}",
    {
      owner,
      repo,
      workflow_id: workflowIdOrFilename,
    }
  );
  return data;
};
