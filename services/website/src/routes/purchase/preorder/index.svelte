<script lang="ts">
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { contextKeyPurchaseInfo } from "$lib/context-keys";
  import PurchaseWizard from "$lib/components/purchase/index.svelte";

  const purchaseInfo = writable<PurchaseInfo>({
    tax: "0.00",
    total: "7.50",
  });
  setContext(contextKeyPurchaseInfo, purchaseInfo);
</script>

<div class="mx-auto max-w-5xl md:flex">
  <div class="md:w-1/2">
    <h2>Preorder</h2>
    <p>
      Learn full-stack web development. This subscription gives you access to
      all current and future Webstone courses.
    </p>

    <div class="mt-5">
      <dl class="">
        <div class="flex justify-between py-4">
          <dt class="text-sm font-medium">Subtotal</dt>
          <dd class="mt-1 text-sm sm:col-span-2 sm:mt-0">
            USD 24.99 per month
          </dd>
        </div>
        <div class="flex justify-between py-4">
          <dt class="text-sm font-medium">Preorder Discount</dt>
          <dd class="mt-1 text-sm sm:col-span-2 sm:mt-0">70%</dd>
        </div>
        <div class="flex justify-between py-4">
          <dt class="text-sm font-medium">Sales Tax / VAT</dt>
          <dd class="mt-1 text-sm sm:col-span-2 sm:mt-0">
            USD {$purchaseInfo.tax}
          </dd>
        </div>
        <div class="flex justify-between py-4">
          <dt class="text-sm font-medium">Total Price</dt>
          <dd class="mt-1 text-sm sm:col-span-2 sm:mt-0">
            USD {$purchaseInfo.total} per month
          </dd>
        </div>
      </dl>
    </div>
  </div>
  <div class="md:w-1/2">
    <PurchaseWizard />
  </div>
</div>
