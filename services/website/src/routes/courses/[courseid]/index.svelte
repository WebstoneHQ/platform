<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = () => {
    // const { courseid } = params;
    // TODO: Fetch course information from database

    return {
      props: {},
    };
  };
</script>

<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
  in culpa qui officia deserunt mollit anim id est laborum.
</p>
<div class="flex justify-around text-center text-black">
  <div
    class="flex h-40 w-40 items-center justify-center  rounded-xl border bg-slate-100"
  >
    Web<br /><br />SvelteKit
  </div>
  <div
    class="flex h-40 w-40 items-center justify-center  rounded-xl border bg-slate-100"
  >
    Styling<br /><br />Tailwind CSS
  </div>
  <div
    class="flex h-40 w-40 items-center justify-center  rounded-xl border bg-slate-100"
  >
    API Type<br /><br />REST
  </div>
  <div
    class="flex h-40 w-40 items-center justify-center  rounded-xl border bg-slate-100"
  >
    API<br /><br />SvelteKit
  </div>
  <div
    class="flex h-40 w-40 items-center justify-center  rounded-xl border bg-slate-100"
  >
    Database<br /><br />PostgreSQL
  </div>
</div>
<div class="mt-20 flex justify-center">
  <a href="lessons/1" class="rounded-lg bg-green-200 p-6 text-black"
    >Enroll now<br />(Start learning)</a
  >
</div>
