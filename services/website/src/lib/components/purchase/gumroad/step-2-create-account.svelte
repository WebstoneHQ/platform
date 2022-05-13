<!-- <script lang="ts">
  import type { Writable } from "svelte/store";
  import { getContext } from "svelte";
  import {
    contextKeyPurchaseGumroadWizardActiveStep,
    contextKeyPurchaseGumroadInfo,
  } from "$lib/context-keys";

  const purchaseInfo = getContext<Writable<PurchaseInfo>>(
    contextKeyPurchaseGumroadInfo
  );
  const activeStep = getContext<Writable<"verifyLicense" | "createAccount">>(
    contextKeyPurchaseGumroadWizardActiveStep
  );
</script> -->

<h2 class="text-2xl font-bold">Create Webstone Education account</h2>
<p class="mt-4">
  Please sign up with GitHub below. When you start a course, we will create a
  GitHub repository for you with the necessary course content.
</p>

<p class="mt-8 text-center">
  <a
    href="/login/github"
    rel="external"
    class="rounded-xl border border-black p-4 dark:border-white"
  >
    Continue with GItHub
  </a>
</p>
