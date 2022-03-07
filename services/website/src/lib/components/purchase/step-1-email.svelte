<script lang="ts">
  import type { Writable } from "svelte/store";
  import { getContext } from "svelte";
  import {
    contextKeyPurchaseWizardActiveStep,
    contextKeyPurchaseInfo,
  } from "$lib/context-keys";

  const purchaseInfo = getContext<Writable<PurchaseInfo>>(
    contextKeyPurchaseInfo
  );
  const activeStep = getContext<Writable<"email" | "location" | "payment">>(
    contextKeyPurchaseWizardActiveStep
  );

  const submitForm = () => {
    $activeStep = "location";
  };
</script>

<h2>Complete your purchase</h2>
<p>
  To get started, please enter your email address. It will be used to create
  your account on the Webstone Education platform.
</p>

<form on:submit|preventDefault="{submitForm}">
  <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
    <label for="email" class="block text-sm font-medium sm:mt-px sm:pt-2">
      Email
    </label>
    <div class="mt-1 sm:col-span-2 sm:mt-0">
      <input
        type="email"
        bind:value="{$purchaseInfo.email}"
        placeholder="email@domain.com"
        required
        aria-required="true"
        name="email"
        id="email"
        autocomplete="email"
        class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
      />
    </div>
  </div>
  <button type="submit">Continue »</button>
</form>
