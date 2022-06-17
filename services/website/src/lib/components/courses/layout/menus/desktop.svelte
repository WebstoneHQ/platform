<script lang="ts">
  import Item from "./item.svelte";
  import { getContext } from "svelte";
  import { contextKeyCourse } from "$lib/context-keys";

  const course = getContext<Course>(contextKeyCourse);
</script>

<div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
  <div
    class="flex flex-grow flex-col overflow-y-auto border-r border-[#503CFF] pt-5"
  >
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
      <div class="mt-5 flex flex-grow flex-col">
        <h2 class="px-4 pb-6 text-lg font-semibold">
          <a href="/courses/{course.id}">{course.name}</a>
        </h2>
        <nav class="flex-1 space-y-1 px-2 pb-4">
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
</div>
