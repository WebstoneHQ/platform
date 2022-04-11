<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({fetch, params}) => {
    const { courseid } = params;
    const response = await fetch(`/api/courses/${courseid}/__data.json`);

    if (response.ok) {
      const course = await response.json();
      return {
        props: {
          course,
        },
        stuff: {
          course
        },
      };
    }

    return {
      props: {}
    }

  };
</script>

<script lang="ts">
  import { beforeNavigate } from "$app/navigation";
  import { contextKeyCoursesIsOffCanvasMenuOpen, contextKeyCourse } from "$lib/context-keys";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import MenuDesktop from "$lib/components/courses/layout/menus/desktop.svelte"
  import MenuMobile from "$lib/components/courses/layout/menus/mobile.svelte"
  import Nav from "$lib/components/courses/layout/nav.svelte"

  export let course: Course;

  const isOffCanvasMenuOpen = writable(false);
  setContext(contextKeyCoursesIsOffCanvasMenuOpen, isOffCanvasMenuOpen);
  setContext(contextKeyCourse, course);

  beforeNavigate(() => {
    $isOffCanvasMenuOpen = false
  });
</script>

<!--
  This example requires updating your template:

  ```
  <html class="h-full">
  <body class="h-full">
  ```
-->
<div>
  <MenuMobile />
  <MenuDesktop />

  <div class="md:pl-64">
    <div class="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0">
      <Nav />
      <main class="flex-1">
        <slot />
      </main>
    </div>
  </div>
</div>
