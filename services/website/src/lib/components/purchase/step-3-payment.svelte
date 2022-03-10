<script lang="ts">
  import type { Writable } from "svelte/store";

  import { getContext, onMount } from "svelte";
  import { page } from "$app/stores";
  import { contextKeyUser, contextKeyPurchaseInfo } from "$lib/context-keys";

  const purchaseInfo = getContext<Writable<PurchaseInfo>>(
    contextKeyPurchaseInfo
  );

  const user = getContext<User>(contextKeyUser);

  let isCheckoutInitialized = false;

  const paddleEventCallback = (event: any) => {
    // Paddle uses this event callback for all checkout events (see https://developer.paddle.com/reference/ZG9jOjI1MzU0MDIx-checkout-events)
    // We need to know the tax, if applicable, and total price. If that's not available we return.
    if (!event.eventData?.checkout?.recurring_prices?.customer) {
      return;
    }

    $purchaseInfo.tax =
      event.eventData.checkout.recurring_prices.customer.total_tax;
    $purchaseInfo.total =
      event.eventData.checkout.recurring_prices.customer.total;
  };

  const openCheckout = () => {
    if (isCheckoutInitialized) {
      return;
    }

    if (typeof window.Paddle === "undefined") {
      console.log("Waiting for the Paddle script to load...");
      setTimeout(openCheckout, 200);
      return;
    }

    isCheckoutInitialized = true;
    let product, vendor;
    if ($page.url.host === "www.webstone.app") {
      product = 758738;
      vendor = 139895;
    } else {
      window.Paddle.Environment.set("sandbox");
      product = 24959;
      vendor = 4895;
    }

    window.Paddle.Setup({ eventCallback: paddleEventCallback, vendor });
    window.Paddle.Checkout.open({
      allowQuantity: false,
      country: $purchaseInfo.country,
      email: $purchaseInfo.email,
      postcode: $purchaseInfo.postcode,
      disableLogout: true,
      frameInitialHeight: 416,
      frameStyle: "width: 100%; background-color: transparent; border: none;",
      frameTarget: "checkout-container",
      passthrough: JSON.stringify({ user_id: user?.id }),
      product,
    });
  };

  onMount(() => {
    openCheckout();
  });
</script>

<svelte:head>
  <script
    async
    on:load="{openCheckout}"
    src="https://cdn.paddle.com/paddle/paddle.js"></script>
</svelte:head>

<h2 class="text-2xl font-bold">Payment</h2>
<div class="checkout-container"></div>
