<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = ({ session }) => {
    if (session.user) {
      return {
        props: {
          userId: session.user.id,
        },
      };
    }
    return {
      status: 302,
      redirect: "/login",
    };
  };
</script>

<script lang="ts">
  import { page } from "$app/stores";

  export let userId: string;

  const openCheckout = () => {
    let product, vendor;
    if ($page.url.host === "webstone.app") {
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
      passthrough: JSON.stringify({ user_id: userId }),
      product,
    });
  };
</script>

<svelte:head>
  <script src="https://cdn.paddle.com/paddle/paddle.js"></script>
</svelte:head>

<h1 class="mb-4 text-4xl">Dashboard</h1>

<p>You arrived here a bit early - welcome 👋.</p>
<p>
  We are actively working on this project, please join our Discord server to get
  exclusive project updates and access to pre-release pricing.
</p>

<div class="mx-auto mt-4 w-1/2 md:w-1/3">
  <a
    href="https://discord.gg/EzJDBT6uRv"
    target="_blank"
    rel="noreferrer"
    class="block w-full rounded-md border border-transparent bg-orange-500 px-5 py-3 text-center text-base font-medium text-slate-900 shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:px-10"
    >Join Community</a
  >
</div>

<div class="mt-10 flex w-full justify-center">
  <button on:click="{openCheckout}" class="underline underline-offset-2"
    >Enroll Now!</button
  >
</div>
