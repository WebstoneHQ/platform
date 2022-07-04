<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = ({ session }) => {
    if (session.user) {
      return {
        props: {
          userId: session.user.id,
        },
      };
    }
    return {
      status: 302,
      redirect: "/login",
    };
  };
</script>

<h1 class="mb-4 text-4xl">Dashboard</h1>

<p>You arrived here a bit early - welcome 👋.</p>
<p>
  We are actively working on this project, please join our Discord server to get
  exclusive project updates and access to pre-release pricing.
</p>

<div class="mx-auto mt-4 w-1/2 md:w-1/3">
  <a
    href="https://discord.gg/EzJDBT6uRv"
    target="_blank"
    rel="noreferrer"
    class="block w-full rounded-md border border-transparent bg-orange-500 px-5 py-3 text-center text-base font-medium text-slate-900 shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:px-10"
    >Join Community</a
  >
</div>
