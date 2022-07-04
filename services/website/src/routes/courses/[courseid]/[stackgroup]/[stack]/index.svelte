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
  import { marked } from "marked";
  import { browser } from "$app/env";
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

{#if browser && !$page.url.searchParams.has("refreshToLoadCookie")}
  <div class="py-6">
    <div class="px-4 sm:px-6 md:px-0">
      <h1 class="text-4xl font-semibold md:text-6xl">{course.name}</h1>
    </div>
    <div class="my-6 px-4 sm:px-6 md:px-0">
      <div class="mt-4 mb-16 px-4 md:mt-16 md:px-0">
        <Stack layers="{layers}" readOnly />
      </div>
      {#if user}
        <HowToLearn gitHubLogin="{user.providerLogin}" />
      {/if}
      <article class="prose my-6 dark:prose-invert lg:prose-xl">
        {@html marked.parse(course.description)}
      </article>
      {#if !user}
        <PreorderButtonGumroad />
        <PreorderBenefits />
      {/if}
    </div>
  </div>
{/if}
