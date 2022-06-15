<script lang="ts">
  import type { Writable } from "svelte/store";
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
</script>

<h2 class="text-2xl font-bold">Create Webstone Education account</h2>
<p class="mt-4">
  Please sign up with your GitHub account. We will do the following:
</p>
<ol class="mt-4 list-inside list-decimal space-y-2">
  <li>
    Create your student repo at https://www.github.com/{$purchaseInfo.githubusername}/webstone-education
  </li>
  <li>
    Create a private fork of your student repo in the Webstone GitHub
    organization
  </li>
  <li>Create your Webstone Education account</li>
</ol>

<div class="text-center">
  <p class="mt-8">
    <a
      href="/login/github?state={$purchaseInfo.preorderid}"
      rel="external"
      class="rounded-xl border border-black p-4 dark:border-white"
    >
      Continue with GitHub
    </a>
  </p>
  <p class="mt-8 italic">This may take up to 5 seconds...</p>
</div>
