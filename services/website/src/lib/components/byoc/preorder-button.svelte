<script lang="ts">
  import { getContext } from "svelte";
  import { contextKeyUser } from "$lib/context-keys";

  const user = getContext<User>(contextKeyUser);
</script>

<div class="sticky bottom-12 mt-8 flex justify-center text-center">
  {#if user}
    <a
      href="/dashboard"
      class="rounded-full bg-[#503CFF] py-4 text-white md:px-14"
    >
      <span class="block text-base font-semibold">Start learning</span>
    </a>
  {:else}
    <a
      href="/purchase/preorder"
      class="rounded-full bg-[#503CFF] py-4 md:px-14 text-white w-full md:w-auto"
    >
      <span class="block text-base font-semibold">Enroll now</span>
      <span class="block text-gray-300">$7.50 per month for a limited time</span
      >
    </a>
  {/if}
</div>
