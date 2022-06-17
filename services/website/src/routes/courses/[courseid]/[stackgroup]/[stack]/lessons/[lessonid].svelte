<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, params, session, stuff }) => {
    if (stuff.course) {
      const response = await fetch(
        `/api/courses/${params.courseid}/${params.stackgroup}/${params.stack}/lessons/${params.lessonid}/__data.json`
      );
      if (!response.ok) {
        return {
          error: new Error("Lesson not found"),
          status: 404,
        };
      }

      return {
        props: {
          lessonContent: await response.text(),
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
  import { marked } from "marked";
  import HowToLearn from "$lib/components/how-to-learn.svelte";
  import PreorderButtonGumroad from "$lib/components/preorder-button-gumroad.svelte";
  import PreorderBenefits from "$lib/components/preorder-benefits.svelte";

  export let lessonContent: string;
  export let user: User;
</script>

<article class="prose dark:prose-invert lg:prose-xl">
  {@html marked.parse(lessonContent)}
</article>

{#if user}
  <HowToLearn gitHubLogin="{user.providerLogin}" />
{:else}
  <PreorderButtonGumroad />
  <PreorderBenefits />
{/if}
