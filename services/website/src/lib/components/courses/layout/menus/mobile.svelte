<script lang="ts">
  import type { Writable } from "svelte/store";
  import { getContext } from "svelte";
  import { fade, fly } from "svelte/transition";
  import {
    contextKeyCoursesIsOffCanvasMenuOpen,
    contextKeyCourse,
  } from "$lib/context-keys";
  import Item from "./item.svelte";

  const isOffCanvasMenuOpen = getContext<Writable<boolean>>(
    contextKeyCoursesIsOffCanvasMenuOpen
  );
  const course = getContext<Course>(contextKeyCourse);
</script>

<!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
{#if $isOffCanvasMenuOpen}
  <div
    transition:fly="{{ x: -400, opacity: 100 }}"
    class="fixed inset-0 z-40 flex md:hidden"
    role="dialog"
    aria-modal="true"
  >
    <!--
  Off-canvas menu overlay, show/hide based on off-canvas menu state.

  Entering: "transition-opacity ease-linear duration-300"
    From: "opacity-0"
    To: "opacity-100"
  Leaving: "transition-opacity ease-linear duration-300"
    From: "opacity-100"
    To: "opacity-0"
-->
    <div
      on:click="{() => ($isOffCanvasMenuOpen = false)}"
      transition:fade
      class="fixed inset-0 bg-gray-600 bg-opacity-75"
      aria-hidden="true"
    ></div>

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
      class="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4 dark:bg-[#272727]"
    >
      <!--
    Close button, show/hide based on off-canvas menu state.

    Entering: "ease-in-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in-out duration-300"
      From: "opacity-100"
      To: "opacity-0"
  -->
      <div transition:fade class="absolute top-0 right-0 -mr-12 pt-2">
        <button
          on:click="{() => ($isOffCanvasMenuOpen = false)}"
          type="button"
          class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        >
          <span class="sr-only">Close sidebar</span>
          <!-- Heroicon name: outline/x -->
          <svg
            class="h-6 w-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div class="flex flex-shrink-0 items-center px-4">
        <a href="/">
          <img
            class="h-5 w-auto dark:invert md:h-6"
            src="/svg/webstone-logo.svg"
            alt="Webstone logo"
          />
        </a>
      </div>
      {#if course}
        <div class="mt-5 h-0 flex-1 overflow-y-auto">
          <h2 class="px-4 pb-6 font-semibold">
            <a href="/courses/{course.id}/{course.stackgroup}/{course.stack}"
              >{course.name}</a
            >
          </h2>
          <nav class="space-y-1 px-2">
            {#each course.lessons as lesson}
              <Item
                href="/courses/{course.id}/{course.stackgroup}/{course.stack}/lessons/{lesson.id}"
                >{lesson.name}</Item
              >
            {/each}
          </nav>
        </div>
      {/if}
    </div>

    <div class="w-14 flex-shrink-0">
      <!-- Dummy element to force sidebar to shrink to fit close icon -->
    </div>
  </div>
{/if}
