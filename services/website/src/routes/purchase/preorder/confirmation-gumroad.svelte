<script lang="ts">
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { contextKeyPurchaseGumroadInfo } from "$lib/context-keys";

  import Container from "$lib/components/container.svelte";
  import GumroadNextSteps from "$lib/components/purchase/gumroad/index.svelte";

  const purchaseInfo = writable<PurchaseInfoGumroad>({});
  setContext(contextKeyPurchaseGumroadInfo, purchaseInfo);
</script>

<div class="mx-auto max-w-5xl pt-16 md:pt-24">
  <a href="/">
    <span class="sr-only">Webstone</span>
    <img
      src="/svg/webstone-logo.svg"
      alt="logo"
      title=""
      height="24px"
      width="148px"
      class="h-5 dark:invert md:h-6"
    />
  </a>
</div>

<Container class="mt-14">
  <!--
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->

  <GumroadNextSteps />
</Container>

<!-- 
  3. If valid, create a new Webstone Education account with that email address and mark the user a preorder supporter
  4. Show a confirmation message, redirect to /courses/sveltekit-css-rest-postgresql/ after a few seconds (also add a manual link).
 -->
