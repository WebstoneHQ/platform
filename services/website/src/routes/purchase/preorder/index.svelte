<script lang="ts">
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { contextKeyPurchaseInfo } from "$lib/context-keys";
  import Container from "$lib/components/container.svelte";
  import PurchaseWizard from "$lib/components/purchase/index.svelte";

  const purchaseInfo = writable<PurchaseInfo>({
    tax: "0.00",
    total: "7.50",
  });
  setContext(contextKeyPurchaseInfo, purchaseInfo);
</script>

<Container class="mt-14 gap-20 md:flex">
  <div class="md:w-1/2">
    <h2 class="text-2xl font-bold">Preorder Offer</h2>
    <p class="mt-4">
      Learn full-stack web development. This monthly subscription gives you
      access to all current and future Webstone courses.
    </p>

    <div class="mt-5">
      <dl class="divide-y">
        <div class="flex justify-between py-4">
          <dt class="text-sm font-medium">Subtotal</dt>
          <dd class="mt-1 text-sm sm:col-span-2 sm:mt-0">USD 24.99 / month</dd>
        </div>
        <div class="flex justify-between py-4">
          <dt class="text-sm font-medium">Preorder Discount</dt>
          <dd class="mt-1 text-sm sm:col-span-2 sm:mt-0">70% / month</dd>
        </div>
        <div class="flex justify-between py-4">
          <dt class="text-sm font-medium">Sales Tax / VAT</dt>
          <dd class="mt-1 text-sm sm:col-span-2 sm:mt-0">
            USD {$purchaseInfo.tax} / month
          </dd>
        </div>
        <div class="flex justify-between py-4">
          <dt class="text-sm font-medium">Total Price</dt>
          <dd class="mt-1 text-sm sm:col-span-2 sm:mt-0">
            USD {$purchaseInfo.total} / month
          </dd>
        </div>
      </dl>
    </div>
  </div>
  <div class="rounded-lg  bg-[#2A2840] text-white md:w-1/2">
    <PurchaseWizard />
  </div>
</Container>
