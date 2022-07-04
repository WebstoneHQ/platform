<script lang="ts">
  // import type { Writable } from "svelte/store";

  import { /*getContext, */ setContext } from "svelte";
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

<div class="hidden p-4 md:block">
  <nav class="flex" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-4">
      <li>
        <div class="flex items-center">
          <button
            on:click="{() => ($activeStep = 'verifyLicense')}"
            class="text-sm font-medium">Verify License</button
          >
        </div>
      </li>

      <li>
        <div class="flex items-center">
          <!-- Heroicon name: solid/chevron-right -->
          <svg
            class="h-5 w-5 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"></path>
          </svg>
          <button
            on:click="{() => ($activeStep = 'createAccount')}"
            class="ml-4 text-sm font-medium"
            aria-current="page">Create Account</button
          >
        </div>
      </li>
    </ol>
  </nav>
</div>

<div class="p-4">
  <svelte:component this="{stepToComponentMap[$activeStep]}" />
</div>
