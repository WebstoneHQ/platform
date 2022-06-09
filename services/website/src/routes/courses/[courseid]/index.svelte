<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ session, stuff }) => {
    if (stuff.course) {
      return {
        props: {
          course: stuff.course,
          user: session.user,
        },
      };
    }

    return {
      error: new Error("Course not found"),
      status: 404,
    };
  };
</script>

<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { page } from "$app/stores";
  import { contextKeyCourse } from "$lib/context-keys";
  import { layers } from "$lib/byoc-layers";
  import Stack from "$lib/components/byoc/stack.svelte";
  // import PreorderButton from "$lib/components/preorder-button.svelte";
  import HowToLearn from "$lib/components/how-to-learn.svelte";
  import PreorderButtonGumroad from "$lib/components/preorder-button-gumroad.svelte";
  import PreorderBenefits from "$lib/components/preorder-benefits.svelte";

  export let user: User;

  const course = getContext<Course>(contextKeyCourse);

  onMount(() => {
    if ($page.url.searchParams.has("refreshToLoadCookie")) {
      // When we set the cookie and redirect from /login/github/callback,
      // the cookie isn't available in src/hooks.ts until we reload the page.
      location.href = $page.url.pathname;
    }
  });
</script>

{#if !$page.url.searchParams.has("refreshToLoadCookie")}
  <div class="py-6">
    <div class="px-4 sm:px-6 md:px-0">
      <h1 class="text-2xl font-semibold">{course.name}</h1>
    </div>
    <div class="px-4 sm:px-6 md:px-0">
      <p>{course.description}</p>
      <div class="mt-4 px-4 md:mt-16 md:px-0">
        <Stack layers="{layers}" />
      </div>

      {#if user}
        <HowToLearn gitHubLogin="{user.providerLogin}" />
      {:else}
        <PreorderButtonGumroad />
        <PreorderBenefits />
      {/if}
    </div>
  </div>
{/if}
