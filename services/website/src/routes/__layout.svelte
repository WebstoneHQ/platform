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
  // import Nav from "$lib/components/nav/index.svelte";

  export let user: string;
  setContext(contextKeyUser, user);
</script>

<div
  class="min-h-screen bg-white text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-200"
>
  <!-- <Nav /> -->
  <slot />
</div>
