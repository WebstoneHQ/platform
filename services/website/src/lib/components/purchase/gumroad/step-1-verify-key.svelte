<script lang="ts">
  import type { Writable } from "svelte/store";
  import { getContext } from "svelte";
  import {
    contextKeyPurchaseGumroadWizardActiveStep,
    contextKeyPurchaseGumroadInfo,
  } from "$lib/context-keys";
  import { enhance } from "$lib/actions/form";

  const purchaseInfo = getContext<Writable<PurchaseInfo>>(
    contextKeyPurchaseGumroadInfo
  );
  const activeStep = getContext<Writable<"verifyLicense" | "createAccount">>(
    contextKeyPurchaseGumroadWizardActiveStep
  );

  const licenseVerificationSuccessful = () => {
    $activeStep = "createAccount";
  };

  let isInvalidInfo = false;
  const licenseVerificationError = () => {
    isInvalidInfo = true;
  };

  const licenseVerificationPending = () => {
    isInvalidInfo = false;
  }
</script>

<h2 class="text-2xl font-bold">Pre-order verification</h2>
<p class="mt-4">
  Please fill in the form below to verify your Webstone Education license.
</p>

<!-- <form on:submit|preventDefault="{submitForm}">
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
</form> -->



<form
  action="/api/gumroad-license-verification/" method="post"
  use:enhance="{{
    error: licenseVerificationError,
    pending: licenseVerificationPending,
    result: licenseVerificationSuccessful,
  }}"
  class="space-y-8 divide-y divide-gray-200">
  <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
    <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
      <div>
        <h1 class="text-lg leading-6 font-medium">Pre-order verification</h1>
      </div>
      <div class="space-y-6 sm:space-y-5">
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label for="email" class="block text-sm font-medium sm:mt-px sm:pt-2"> Email<sup>*</sup> </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <input type="email" name="email" id="email" autocomplete="email" required class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md dark:text-black" />
            <p class="text-sm mt-2">Please use the same email address you used on Gumroad.</p>
          </div>
        </div>

        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label for="githubusername" class="block text-sm font-medium sm:mt-px sm:pt-2"> GitHub username<sup>*</sup> </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <input type="text" name="githubusername" id="githubusername" required class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md dark:text-black" />
            <p class="text-sm mt-2">Required to access courses, lessons, etc.</p>
          </div>
        </div>

        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label for="licensekey" class="block text-sm font-medium sm:mt-px sm:pt-2"> License Key<sup>*</sup> </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <input type="text" name="licensekey" id="licensekey" required class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md dark:text-black" />
            <p class="text-sm mt-2">You can find this in your Gumroad confirmation email.</p>
          </div>
        </div>

        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label for="discordusername" class="block text-sm font-medium sm:mt-px sm:pt-2"> Discord username </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <input type="text" name="discordusername" id="discordusername" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md dark:text-black" />
            <p class="text-sm mt-2">Format: <code>abc#1234</code>. To gain exclusive access to early adopter channels.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="pt-5">
    <div class="flex justify-start">
      <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create account</button>
    </div>
  </div>
</form>

{#if isInvalidInfo}
  <div class="pt-5 text-red-600">
    <p>The information you provided don't match. If you think that's a mistake, please contact us via DM on Twitter <a href="https://twitter.com/webstonehq">@webstonehq</a>.</p>
  </div>
{/if}