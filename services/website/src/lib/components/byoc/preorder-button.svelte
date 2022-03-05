<script lang="ts">
  import { getContext } from "svelte";
  import { page } from "$app/stores";
  import { contextKeyUser } from "$lib/context-keys";

  const user = getContext<User>(contextKeyUser);

  const openCheckout = () => {
    let product, vendor;
    if ($page.url.host === "www.webstone.app") {
      product = 756466;
      vendor = 139895;
    } else {
      window.Paddle.Environment.set("sandbox");
      product = 24553;
      vendor = 4895;
    }

    window.Paddle.Setup({ vendor });
    window.Paddle.Checkout.open({
      allowQuantity: true,
      disableLogout: true,
      passthrough: JSON.stringify({ user_id: user.id }),
      product,
    });
  };
</script>

<svelte:head>
  <script src="https://cdn.paddle.com/paddle/paddle.js"></script>
</svelte:head>

<div class="sticky bottom-12 mt-8 flex justify-center text-center">
  {#if user}
    <button
      on:click="{openCheckout}"
      class="rounded-full bg-[#503CFF] py-4 px-14 text-white"
    >
      <span class="block text-base font-semibold">Preorder today</span>
      <span class="block text-gray-300">$7.50 per month for a limited time</span
      >
    </button>
  {:else}
    <a
      href="/login/github"
      rel="external"
      class="rounded-full bg-[#503CFF] py-4 px-14 text-white"
    >
      <span class="block text-base font-semibold">Sign up with GitHub</span>
      <span class="block text-gray-300">$7.50 per month for a limited time</span
      >
    </a>
  {/if}
</div>
