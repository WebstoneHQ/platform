<script lang="ts">
  import type { Writable } from "svelte/store";
  import { getContext } from "svelte";
  import {
    contextKeyPurchaseGumroadWizardActiveStep,
    contextKeyPurchaseGumroadInfo,
  } from "$lib/context-keys";
  import { enhance } from "$lib/actions/form";

  const purchaseInfo = getContext<Writable<PurchaseInfoGumroad>>(
    contextKeyPurchaseGumroadInfo
  );
  const activeStep = getContext<Writable<"verifyLicense" | "createAccount">>(
    contextKeyPurchaseGumroadWizardActiveStep
  );

  const licenseVerificationSuccessful = async (
    response: Response,
    form: HTMLFormElement
  ) => {
    const formValues = new FormData(form);
    $purchaseInfo.email = formValues.get("email").toString();
    $purchaseInfo.githubusername = formValues.get("githubusername").toString();
    $purchaseInfo.licensekey = formValues.get("licensekey").toString();
    $purchaseInfo.discordusername = formValues
      .get("discordusername")
      .toString();
    $purchaseInfo.preorderid = (await response.json()).preorderId;
    $activeStep = "createAccount";
  };

  let isInvalidInfo = false;
  const licenseVerificationError = () => {
    isInvalidInfo = true;
  };

  const licenseVerificationPending = () => {
    isInvalidInfo = false;
  };
</script>

<h2 class="text-2xl font-bold">Pre-order verification</h2>
<p class="mt-4">
  Please fill in the form below to verify your Webstone Education license.
</p>

<form
  action="/api/gumroad-license-verification/"
  method="post"
  use:enhance="{{
    error: licenseVerificationError,
    pending: licenseVerificationPending,
    result: licenseVerificationSuccessful,
  }}"
  class="space-y-8 divide-y divide-gray-200"
>
  <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
    <div class="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
      <div>
        <h1 class="text-lg font-medium leading-6">Pre-order verification</h1>
      </div>
      <div class="space-y-6 sm:space-y-5">
        <div
          class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
        >
          <label for="email" class="block text-sm font-medium sm:mt-px sm:pt-2">
            Email<sup>*</sup>
          </label>
          <div class="mt-1 sm:col-span-2 sm:mt-0">
            <input
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              required
              class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:text-black sm:max-w-xs sm:text-sm"
            />
            <p class="mt-2 text-sm">
              Please use the same email address you used on Gumroad.
            </p>
          </div>
        </div>

        <div
          class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
        >
          <label
            for="githubusername"
            class="block text-sm font-medium sm:mt-px sm:pt-2"
          >
            GitHub username<sup>*</sup>
          </label>
          <div class="mt-1 sm:col-span-2 sm:mt-0">
            <input
              type="text"
              name="githubusername"
              id="githubusername"
              required
              class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:text-black sm:max-w-xs sm:text-sm"
            />
            <p class="mt-2 text-sm">
              Required to access courses, lessons, etc.
            </p>
          </div>
        </div>

        <div
          class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
        >
          <label
            for="licensekey"
            class="block text-sm font-medium sm:mt-px sm:pt-2"
          >
            License Key<sup>*</sup>
          </label>
          <div class="mt-1 sm:col-span-2 sm:mt-0">
            <input
              type="text"
              name="licensekey"
              id="licensekey"
              required
              class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:text-black sm:max-w-xs sm:text-sm"
            />
            <p class="mt-2 text-sm">
              You can find this in your Gumroad confirmation email.
            </p>
          </div>
        </div>

        <div
          class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
        >
          <label
            for="discordusername"
            class="block text-sm font-medium sm:mt-px sm:pt-2"
          >
            Discord username
          </label>
          <div class="mt-1 sm:col-span-2 sm:mt-0">
            <input
              type="text"
              name="discordusername"
              id="discordusername"
              class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:text-black sm:max-w-xs sm:text-sm"
            />
            <p class="mt-2 text-sm">
              Format: <code>abc#1234</code>. To gain exclusive access to early
              adopter channels.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="pt-5">
    <div class="flex justify-start">
      <button
        type="submit"
        class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >Create account</button
      >
    </div>
  </div>
</form>

{#if isInvalidInfo}
  <div class="pt-5 text-red-600">
    <p>
      The information you provided don't match. If you think that's a mistake,
      please contact us via DM on Twitter <a
        href="https://twitter.com/webstonehq">@webstonehq</a
      >.
    </p>
  </div>
{/if}
