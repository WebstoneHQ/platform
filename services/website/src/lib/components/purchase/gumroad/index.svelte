<script lang="ts">
  // import type { Writable } from "svelte/store";

  import { getContext, setContext } from "svelte";
  import { writable } from "svelte/store";
  import {
    contextKeyPurchaseGumroadWizardActiveStep,
    // contextKeyPurchaseGumroadInfo,
  } from "$lib/context-keys";
  import Step1 from "./step-1-verify-key.svelte";
  import Step2 from "./step-2-create-account.svelte";

  const stepToComponentMap = {
    verifyLicense: Step1,
    createAccount: Step2,
  };

  const activeStep = writable<"verifyLicense" | "createAccount">(
    "verifyLicense"
  );
  setContext(contextKeyPurchaseGumroadWizardActiveStep, activeStep);

  // const purchaseInfo = getContext<Writable<PurchaseInfoGumroad>>(
  //   contextKeyPurchaseGumroadInfo
  // );
</script>

<div class="py-4">
  <svelte:component this="{stepToComponentMap[$activeStep]}" />
</div>
