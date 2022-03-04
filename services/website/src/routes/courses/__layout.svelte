<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = ({ params }) => {
    const { courseid } = params;
    return {
      props: {
        courseid,
      },
    };
  };
</script>

<script lang="ts">
  export let courseid: string;
</script>

<div class="flex">
  <div class="w-1/5">
    <h2>Todo app ({courseid})</h2>
    <ul>
      <li>Lesson 1</li>
      <li>Lesson 2</li>
      <li>Lesson 3</li>
    </ul>
  </div>
  <div class="w-4/5">
    <slot />
  </div>
</div>
