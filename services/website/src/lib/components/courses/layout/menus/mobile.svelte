<script lang="ts">
  import type { Writable } from "svelte/store";
  import { getContext } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { contextKeyCoursesIsOffCanvasMenuOpen, contextKeyCourse } from "$lib/context-keys";
  import Item from "./item.svelte";

  const isOffCanvasMenuOpen = getContext<Writable<boolean>>(contextKeyCoursesIsOffCanvasMenuOpen);
  const course = getContext<Course>(contextKeyCourse);
</script>

  <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
  {#if $isOffCanvasMenuOpen}

<div
transition:fly="{{x: -400, opacity:100}}"
class="fixed inset-0 z-40 flex md:hidden" role="dialog" aria-modal="true">
<!--
  Off-canvas menu overlay, show/hide based on off-canvas menu state.

  Entering: "transition-opacity ease-linear duration-300"
    From: "opacity-0"
    To: "opacity-100"
  Leaving: "transition-opacity ease-linear duration-300"
    From: "opacity-100"
    To: "opacity-0"
-->
<div on:click="{() => $isOffCanvasMenuOpen = false}"
  transition:fade
  class="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true"></div>

<!--
  Off-canvas menu, show/hide based on off-canvas menu state.

  Entering: "transition ease-in-out duration-300 transform"
    From: "-translate-x-full"
    To: "translate-x-0"
  Leaving: "transition ease-in-out duration-300 transform"
    From: "translate-x-0"
    To: "-translate-x-full"
-->
<div
  class="relative max-w-xs w-full bg-white dark:bg-[#272727] pt-5 pb-4 flex-1 flex flex-col">
  <!--
    Close button, show/hide based on off-canvas menu state.

    Entering: "ease-in-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in-out duration-300"
      From: "opacity-100"
      To: "opacity-0"
  -->
  <div
    transition:fade
    class="absolute top-0 right-0 -mr-12 pt-2">
    <button on:click="{() => $isOffCanvasMenuOpen = false}" type="button" class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
      <span class="sr-only">Close sidebar</span>
      <!-- Heroicon name: outline/x -->
      <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>

  <div class="flex-shrink-0 px-4 flex items-center">
    <a href="/">
      <img class="h-5 dark:invert md:h-6 w-auto" src="/svg/webstone-logo.svg" alt="Webstone logo" />
    </a>
  </div>
  {#if course}
    <div class="mt-5 flex-1 h-0 overflow-y-auto">
      <h2 class="px-4 pb-6 font-semibold">
        <a href="/courses/{course.id}">{course.name}</a>
      </h2>
      <nav class="px-2 space-y-1">
        {#each course.lessons as lesson}
          <Item href="/courses/{course.id}/lessons/{lesson.id}">{lesson.name}</Item>
        {/each}
      </nav>
    </div>
  {/if}
</div>

<div class="flex-shrink-0 w-14">
  <!-- Dummy element to force sidebar to shrink to fit close icon -->
</div>
</div>
{/if}