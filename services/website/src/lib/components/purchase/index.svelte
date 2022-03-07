<script lang="ts">
  import type { Writable } from "svelte/store";

  import { getContext, setContext } from "svelte";
  import { writable } from "svelte/store";
  import {
    contextKeyPurchaseWizardActiveStep,
    contextKeyPurchaseInfo,
  } from "$lib/context-keys";
  import Step1 from "./step-1-email.svelte";
  import Step2 from "./step-2-location.svelte";
  import Step3 from "./step-3-payment.svelte";

  const stepToComponentMap = {
    email: Step1,
    location: Step2,
    payment: Step3,
  };

  const activeStep = writable<"email" | "location" | "payment">("email");
  setContext(contextKeyPurchaseWizardActiveStep, activeStep);

  const purchaseInfo = getContext<Writable<PurchaseInfo>>(
    contextKeyPurchaseInfo
  );
</script>

<div class="hidden md:block">
  <nav class="flex" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-4">
      <li>
        <div>
          <a href="/">
            <!-- Heroicon name: solid/home -->
            <svg
              class="h-5 w-5 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
              ></path>
            </svg>
            <span class="sr-only">Home</span>
          </a>
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
            on:click="{() => ($activeStep = 'email')}"
            class="ml-4 text-sm font-medium">Email</button
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
            class:cursor-not-allowed="{!$purchaseInfo.email}"
            disabled="{!$purchaseInfo.email}"
            on:click="{() => ($activeStep = 'location')}"
            class="ml-4 text-sm font-medium"
            aria-current="page">Location</button
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
            class:cursor-not-allowed="{!$purchaseInfo.country}"
            disabled="{!$purchaseInfo.country}"
            on:click="{() => ($activeStep = 'payment')}"
            class="ml-4 text-sm font-medium"
            aria-current="page">Payment</button
          >
        </div>
      </li>
    </ol>
  </nav>
</div>

<div>
  <svelte:component this="{stepToComponentMap[$activeStep]}" />
</div>
