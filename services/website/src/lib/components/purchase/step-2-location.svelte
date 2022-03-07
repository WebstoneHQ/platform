<script lang="ts">
  import type { Writable } from "svelte/store";
  import { getContext } from "svelte";
  import {
    contextKeyPurchaseWizardActiveStep,
    contextKeyPurchaseInfo,
  } from "$lib/context-keys";
  import { countries } from "$lib/paddle-location-helpers";

  const purchaseInfo = getContext<Writable<PurchaseInfo>>(
    contextKeyPurchaseInfo
  );
  const activeStep = getContext<Writable<"email" | "location" | "payment">>(
    contextKeyPurchaseWizardActiveStep
  );

  const submitForm = (event: SubmitEvent) => {
    const formData = new FormData(event.target as HTMLFormElement);
    if (!formData.get("postalCode")) {
      // This may happen if a visitor selects a country with a postal code, enters a postal code, then changes the country to one that does not require a postal code.
      // We need to make sure we clear the postal code from the purchaseInfo store.
      $purchaseInfo.postcode = undefined;
    }
    $activeStep = "payment";
  };

  $: postalCodeLabel = countries[$purchaseInfo.country || ""]?.postalCodeLabel;
</script>

<h2>Where are you located?</h2>
<p>
  We need this information to determine whether there is a sales tax applicable
  or not.
</p>

<form on:submit|preventDefault="{submitForm}">
  <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
    <label for="country" class="block text-sm font-medium sm:mt-px sm:pt-2">
      Country
    </label>
    <div class="mt-1 sm:col-span-2 sm:mt-0">
      <select
        bind:value="{$purchaseInfo.country}"
        id="country"
        name="country"
        required
        aria-required="true"
        autocomplete="country-name"
        class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
      >
        <option value="" disabled>Select your country</option>
        {#each Object.entries(countries) as [isoCode, country]}
          <option value="{isoCode}">{country.name}</option>
        {/each}
      </select>
    </div>
  </div>
  {#if postalCodeLabel}
    <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
      <label
        for="postalCode"
        class="block text-sm font-medium sm:mt-px sm:pt-2"
      >
        {postalCodeLabel}
      </label>
      <div class="mt-1 sm:col-span-2 sm:mt-0">
        <input
          type="text"
          bind:value="{$purchaseInfo.postcode}"
          required
          aria-required="true"
          name="postalCode"
          id="postalCode"
          autocomplete="postal-code"
          class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
        />
      </div>
    </div>
  {/if}
  <button type="submit">Continue »</button>
</form>
