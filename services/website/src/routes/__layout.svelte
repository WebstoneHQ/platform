<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = ({ session }) => {
    return {
      props: {
        user: session.user,
      },
    };
  };
</script>

<script lang="ts">
  import "../app.css";
  import { setContext } from "svelte";
  import { contextKeyUser } from "$lib/context-keys";
  import Nav from "$lib/components/nav/index.svelte";

  export let user: string;
  setContext(contextKeyUser, user);
</script>

<svelte:head>
  <title>Learn full-stack web development | Webstone Education</title>
  <meta
    name="description"
    content="Webstone Education is on a mission to simplify full-stack web development education."
  />
  <meta
    property="og:title"
    content="Learn full-stack web development | Webstone Education"
  />
  <meta
    property="og:description"
    content="Webstone Education is on a mission to simplify full-stack web development education."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://webstone.app" />
  <meta property="og:image" content="https://webstone.app/og-image.png" />
</svelte:head>

<div
  class="min-h-screen bg-white text-black antialiased dark:bg-[#2A2840] dark:text-[#FAFAFA]"
>
  <div class="">
    <Nav />
    <slot />
    <footer class="mx-auto mt-32 max-w-5xl pb-20">
      &copy; 2022 Webstone Technologies Inc. All rights reserved.
    </footer>
  </div>
</div>
