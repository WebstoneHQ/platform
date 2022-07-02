<script lang="ts">
  import type { Writable } from "svelte/store";
  import { browser } from "$app/env";
  import { page } from "$app/stores";
  import { getContext } from "svelte";
  import {
    contextKeyPurchaseGumroadWizardActiveStep,
    contextKeyPurchaseGumroadInfo,
  } from "$lib/context-keys";

  const purchaseInfo = getContext<Writable<PurchaseInfoGumroad>>(
    contextKeyPurchaseGumroadInfo
  );
  const activeStep = getContext<Writable<"verifyLicense" | "createAccount">>(
    contextKeyPurchaseGumroadWizardActiveStep
  );

  const convertToBase64Browser = (value: string) =>
    window.btoa(unescape(encodeURIComponent(value)));
  const convertToBase64Server = (value: string) =>
    Buffer.from(value).toString("base64");

  const gitHubState: GitHubSignUpState = {
    preorderId: $purchaseInfo.preorderid,
    course: {
      id: $page.url.searchParams.get("courseid"),
      stackgroup: $page.url.searchParams.get("stackgroup"),
      stack: $page.url.searchParams.get("stack"),
    },
  };
  const gitHubStateBase64Encoded = browser
    ? convertToBase64Browser(JSON.stringify(gitHubState))
    : convertToBase64Server(JSON.stringify(gitHubState));
</script>

<h2 class="text-2xl font-bold">Create Webstone Education account</h2>
<p class="mt-4">
  Please sign up with your GitHub account. We will do the following:
</p>
<ol class="mt-4 list-inside list-decimal space-y-2">
  <li>
    Create your student repo at https://www.github.com/{$purchaseInfo.githubusername}/webstone-education
  </li>
  <li>Open a pull request with your first course 🎉</li>
  <li>Create your Webstone Education account</li>
</ol>

<div class="text-center">
  <p class="mt-8">
    <a
      href="/login/github?state={gitHubStateBase64Encoded}"
      rel="external"
      class="rounded-xl border border-black p-4 dark:border-white"
    >
      Continue with GitHub
    </a>
  </p>
  <p class="mt-8 italic">This may take up to 10 seconds...</p>
</div>
