<script lang="ts">
  import Item from "./item.svelte";
  import { getContext } from "svelte";
  import { contextKeyCourse } from "$lib/context-keys";

  const course = getContext<Course>(contextKeyCourse);
</script>

<div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
  <!-- Sidebar component, swap this element with another sidebar if you like -->
  <div class="border-r border-[#503CFF] pt-5 flex flex-col flex-grow overflow-y-auto">
    <div class="flex-shrink-0 px-4 flex items-center">
      <a href="/">
        <img class="h-5 dark:invert md:h-6 w-auto" src="/svg/webstone-logo.svg" alt="Webstone logo" />
      </a>
    </div>
    {#if course}
      <div class="flex-grow mt-5 flex flex-col">
        <h2 class="px-4 pb-6 font-semibold">
          <a href="/courses/{course.id}">{course.name}</a>
        </h2>
        <h2 class="px-4 pb-6 font-semibold">Lessons</h2>
        <nav class="flex-1 px-2 pb-4 space-y-1">
          {#each course.lessons as lesson}
            <Item href="/courses/{course.id}/lessons/{lesson.id}">{lesson.name}</Item>
          {/each}
        </nav>
      </div>
    {/if}
  </div>
</div>
