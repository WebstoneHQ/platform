<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, params, session, stuff }) => {
    // TODO: Check if the authenticated student has purchased this course. If not, redirect to ../ (course page) and display a message to purchase the course
    if (stuff.course) {
      const response = await fetch(
        `/api/courses/${params.courseid}/lessons/${params.lessonid}/__data.json`
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
  import PreorderButtonGumroad from "$lib/components/preorder-button-gumroad.svelte";
  import PreorderBenefits from "$lib/components/preorder-benefits.svelte";

  export let lessonContent: string;
  export let user: User;
</script>

{#if user}
  <article class="prose dark:prose-invert lg:prose-xl">
    {@html marked.parse(lessonContent)}
  </article>
{:else}
  <div class="py-6">
    <div class="px-4 sm:px-6 md:px-0">
      <h1 class="text-2xl font-semibold">Sign in required</h1>
    </div>
    <div class="px-4 sm:px-6 md:px-0">
      <p>To access this lesson, please sign up below.</p>
    </div>

    <div class="px-4 sm:px-6 md:px-0">
      <PreorderButtonGumroad />
      <PreorderBenefits />
    </div>
  </div>
{/if}
