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
  import { getContext } from "svelte";
  import { contextKeyCourse } from "$lib/context-keys";
  import { layers } from "$lib/byoc-layers";
  import Stack from "$lib/components/byoc/stack.svelte";
  // import PreorderButton from "$lib/components/preorder-button.svelte";
  import PreorderButtonGumroad from "$lib/components/preorder-button-gumroad.svelte";
  import PreorderBenefits from "$lib/components/preorder-benefits.svelte";

  export let user: User;

  const course = getContext<Course>(contextKeyCourse);
</script>

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
      <div class="mt-8 flex justify-center text-center">
        <a
          href="lessons/{course.lessons[0].id}"
          class="w-full rounded-full bg-[#503CFF] py-4 text-white md:w-auto md:px-14"
        >
          <span class="block text-base font-semibold">Start learning</span>
        </a>
      </div>
    {:else}
      <PreorderButtonGumroad />
      <PreorderBenefits />
    {/if}
  </div>
</div>
