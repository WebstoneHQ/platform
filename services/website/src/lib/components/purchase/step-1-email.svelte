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

<h2 class="text-2xl font-bold">Complete your purchase</h2>
<p class="mt-4">
  To get started, please enter your email address. It will be used to create
  your account on the Webstone Education platform.
</p>

<form on:submit|preventDefault="{submitForm}">
  <div class="mt-4 flex items-center">
    <label for="email" class="block"> Email </label>
    <div class="flex-1 pl-2 pr-1">
      <input
        type="email"
        bind:value="{$purchaseInfo.email}"
        placeholder="email@domain.com"
        required
        aria-required="true"
        name="email"
        id="email"
        autocomplete="email"
        class="w-full rounded-3xl text-black focus:shadow focus:outline-none"
      />
    </div>
  </div>
  <button
    type="submit"
    class="mt-10 w-full rounded-full bg-[#503CFF] py-4 font-semibold text-white md:px-14"
    >Continue »</button
  >
</form>
