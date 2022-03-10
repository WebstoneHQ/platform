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

  const countriesSortedByName = Object.entries(countries).sort((a, b) => {
    if (a[1].name < b[1].name) {
      return -1;
    }
    if (a[1].name > b[1].name) {
      return 1;
    }
    return 0;
  });

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

<h2 class="text-2xl font-bold">Where are you located?</h2>
<p class="mt-4">
  We need this information to determine whether there is a sales tax applicable
  or not.
</p>

<form on:submit|preventDefault="{submitForm}">
  <div class="mt-4 flex items-center">
    <label for="country" class="block"> Country </label>
    <div class="flex-1 pl-9 pr-1">
      <select
        bind:value="{$purchaseInfo.country}"
        id="country"
        name="country"
        required
        aria-required="true"
        autocomplete="country-name"
        class="w-full rounded-3xl text-black focus:shadow focus:outline-none"
      >
        <option value="" disabled>Select your country</option>
        {#each countriesSortedByName as [isoCode, country]}
          <option value="{isoCode}">{country.name}</option>
        {/each}
      </select>
    </div>
  </div>
  {#if postalCodeLabel}
    <div class="mt-4 flex items-center">
      <label for="postalCode" class="block">
        {postalCodeLabel}
      </label>
      <div class="flex-1 pl-2 pr-1">
        <input
          type="text"
          bind:value="{$purchaseInfo.postcode}"
          required
          aria-required="true"
          name="postalCode"
          id="postalCode"
          autocomplete="postal-code"
          class="w-full rounded-3xl text-black focus:shadow focus:outline-none"
        />
      </div>
    </div>
  {/if}
  <button
    type="submit"
    class="mt-10 w-full rounded-full bg-[#503CFF] py-4 font-semibold text-white md:px-14"
    >Continue »</button
  >
</form>
