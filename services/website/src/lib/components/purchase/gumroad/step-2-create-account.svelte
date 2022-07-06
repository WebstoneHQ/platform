<script lang="ts">
  import type { Writable } from "svelte/store";
  import { onMount } from "svelte";
  import { browser } from "$app/env";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { getContext } from "svelte";
  import {
    contextKeyPurchaseGumroadInfo,
    contextKeyUser,
  } from "$lib/context-keys";

  const purchaseInfo = getContext<Writable<PurchaseInfoGumroad>>(
    contextKeyPurchaseGumroadInfo
  );
  const user = getContext<User>(contextKeyUser);

  const convertToBase64Browser = (value: string) =>
    window.btoa(unescape(encodeURIComponent(value)));
  const convertToBase64Server = (value: string) =>
    Buffer.from(value).toString("base64");

  const gitHubState: GitHubSignUpState = {
    preorderId: $purchaseInfo.preorderid,
    course: {
      id: $page.params.courseid,
      stackgroup: $page.params.stackgroup,
      stack: $page.params.stack,
    },
  };
  const gitHubStateBase64Encoded = browser
    ? convertToBase64Browser(JSON.stringify(gitHubState))
    : convertToBase64Server(JSON.stringify(gitHubState));

  let btnText = "Continue with GitHub";
  const continueWithGitHub = () => {
    btnText = "Please wait...";
    goto(`/login/github?state=${gitHubStateBase64Encoded}`);
  };

  onMount(() => {
    if (user) {
      // This brings us back up to the course landing page since this component is rendered at the `/course-landing-page/verify-license/` path
      goto("../");
    }
  });
</script>

{#if !user}
  <p class="mt-4">
    Thanks for verifying your license. It looks like you don't have an account
    yet, let's fix that.
  </p>
  <p>Please sign up with your GitHub account. We will do the following:</p>
  <ol class="mt-4 list-inside list-decimal space-y-2">
    <li>Create your Webstone Education account</li>
    <li>
      Create your student repo at https://www.github.com/{$purchaseInfo.githubusername}/webstone-education
    </li>
    <li>Open a pull request with your first course 🎉</li>
  </ol>

  <div class="text-center">
    <p class="mt-8">
      <button
        on:click="{continueWithGitHub}"
        disabled="{btnText === 'Please wait...'}"
        class="rounded-xl border border-black p-4 disabled:cursor-wait dark:border-white"
      >
        {btnText}
      </button>
    </p>
    <p class="mt-8 italic">This may take up to 10 seconds...</p>
  </div>
{/if}
