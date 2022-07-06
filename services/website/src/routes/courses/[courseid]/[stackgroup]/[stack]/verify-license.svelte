<script lang="ts">
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { contextKeyPurchaseGumroadInfo } from "$lib/context-keys";

  import Container from "$lib/components/container.svelte";
  import GumroadNextSteps from "$lib/components/purchase/gumroad/index.svelte";

  const purchaseInfo = writable<PurchaseInfoGumroad>({});
  setContext(contextKeyPurchaseGumroadInfo, purchaseInfo);
</script>

<Container class="mt-6">
  <h1 class="text-4xl font-semibold md:text-6xl">
    Pre-order license verification
  </h1>
  <GumroadNextSteps />
</Container>
