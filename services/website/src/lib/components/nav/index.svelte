<script lang="ts">
  import { getContext } from "svelte";
  import { beforeNavigate } from "$app/navigation";
  import { contextKeyUser } from "$lib/context-keys";

  const user: User = getContext(contextKeyUser);

  let isMobileMenuOpen = false;

  beforeNavigate(() => (isMobileMenuOpen = false));
</script>

<header class="relative mx-auto max-w-5xl">
  <div class="pt-6">
    <nav class="relative flex" aria-label="Global">
      <div class="flex flex-1 items-center">
        <div class="flex w-full items-center justify-end md:w-auto">
          <!-- <a href="#">
            <span class="sr-only">Workflow</span>
            <img class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-teal-200-cyan-400.svg" alt="">
          </a> -->
          <div class="-mr-2 flex items-center md:hidden">
            <!-- <button
              on:click="{() => (isMobileMenuOpen = true)}"
              type="button"
              class="focus-ring-inset inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="h-6 w-6"
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
                  d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button> -->
          </div>
        </div>
        <div class="hidden space-x-8 md:flex">
          {#if user}
            <a href="/" class="text-base font-medium hover:text-gray-300"
              >Home</a
            >
            <a
              href="/dashboard"
              class="text-base font-medium hover:text-gray-300">Dashboard</a
            >
          {/if}

          <!-- <a href="#" class="text-base font-medium hover:text-gray-300">Features</a>

          <a href="#" class="text-base font-medium hover:text-gray-300">Marketplace</a>

          <a href="#" class="text-base font-medium hover:text-gray-300">Company</a> -->
        </div>
      </div>
      <div class="hidden md:flex md:items-center md:space-x-6 md:font-medium">
        {#if user}
          {user.name}
          <!-- {:else}
          <a href="/login/github" rel="external" class="hover:text-gray-300">
            Log in
          </a> -->
        {/if}
        <!-- <a href="#" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-orange-500 hover:bg-orange-600 text-slate-900"> Start free trial </a> -->
      </div>
    </nav>
  </div>

  <!--
    Mobile menu, show/hide based on menu open state.

    Entering: "duration-150 ease-out"
      From: "opacity-0 scale-95"
      To: "opacity-100 scale-100"
    Leaving: "duration-100 ease-in"
      From: "opacity-100 scale-100"
      To: "opacity-0 scale-95"
  -->
  <div
    class:-translate-y-full="{!isMobileMenuOpen}"
    class:translate-y-0="{isMobileMenuOpen}"
    class="absolute inset-x-0 top-0 origin-top bg-white p-2 transition-transform dark:bg-slate-900 md:hidden"
  >
    <div
      class="overflow-hidden rounded-lg shadow-md ring-1 ring-black ring-opacity-5 dark:ring-white"
    >
      <div class="flex items-center justify-end px-5 pt-4">
        <!-- <div>
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-teal-500-cyan-600.svg" alt="">
        </div> -->
        <div class="-mr-2">
          <button
            on:click="{() => (isMobileMenuOpen = false)}"
            type="button"
            class="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600"
          >
            <span class="sr-only">Close menu</span>
            <!-- Heroicon name: outline/x -->
            <svg
              class="h-6 w-6"
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
      </div>
      <div class="pt-5 pb-6">
        <div class="space-y-1 px-2">
          {#if user}
            <a
              href="/"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
              >Home</a
            >
            <a
              href="/dashboard"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
              >Dashboard</a
            >
          {/if}

          <!-- <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Features</a>

          <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Marketplace</a>

          <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Company</a> -->
        </div>
        <!-- <div class="mt-6 px-5">
          <a href="#" class="block text-center w-full py-3 px-4 rounded-md shadow bg-orange-500 hover:bg-orange-600 text-slate-900">Start free trial</a>
        </div> -->
        <div class="mt-6 px-5 text-center">
          {#if user}
            {user.name}
          {:else}
            <p>
              <a href="/login" class="hover:underline">Login</a>
            </p>
          {/if}
        </div>
      </div>
    </div>
  </div>
</header>
