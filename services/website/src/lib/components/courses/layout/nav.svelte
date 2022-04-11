<script lang="ts">
  import type { Writable } from "svelte/store";
  import { getContext } from "svelte";
  import { beforeNavigate } from "$app/navigation";
  import { contextKeyCoursesIsOffCanvasMenuOpen } from "$lib/context-keys";

  const isOffCanvasMenuOpen = getContext<Writable<boolean>>(contextKeyCoursesIsOffCanvasMenuOpen);

  let isUserMenuOpen = false;

  beforeNavigate(() => {
    isUserMenuOpen = false
  });
</script>

<div class="sticky top-0 z-10 flex-shrink-0 h-16 flex bg-white dark:bg-[#272727]">
  <button on:click="{() => $isOffCanvasMenuOpen = !$isOffCanvasMenuOpen}" type="button" class="px-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#503CFF] md:hidden">
    <span class="sr-only">Open sidebar</span>
    <!-- Heroicon name: outline/menu-alt-2 -->
    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
    </svg>
  </button>
  <div class="flex-1 flex justify-between px-4 md:px-0">
    <div class="flex-1 flex">
      <!-- <form class="w-full flex md:ml-0" action="#" method="GET">
        <label for="search-field" class="sr-only">Search</label>
        <div class="relative w-full text-gray-400 focus-within:text-gray-600">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>
          <input id="search-field" class="dark:text-[#FAFAFA] bg-transparent block h-full w-full border-transparent py-2 pl-8 pr-3 TTTtext-gray-900 TTTplaceholder-gray-500 focus:outline-none TTTfocus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm" placeholder="Search" type="search" name="search">
        </div>
      </form> -->
    </div>
    <div class="ml-4 flex items-center md:ml-6">
      <!-- <button type="button" class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <span class="sr-only">View notifications</span>
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </button> -->

      <!-- Profile dropdown -->
      <div class="ml-3 relative">
        <div>
          <button on:click="{() => isUserMenuOpen = !isUserMenuOpen}" type="button" class="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
            <span class="sr-only">Open user menu</span>
            <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
          </button>
        </div>

        <!--
          Dropdown menu, show/hide based on menu state.

          Entering: "transition ease-out duration-100"
            From: "transform opacity-0 scale-95"
            To: "transform opacity-100 scale-100"
          Leaving: "transition ease-in duration-75"
            From: "transform opacity-100 scale-100"
            To: "transform opacity-0 scale-95"
        -->
        {#if isUserMenuOpen}
          <div class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-[#272727] ring-1 ring-black ring-opacity-5 py-1 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
            <!-- Active: "bg-gray-100", Not Active: "" -->
            <a href="#" class="block py-2 px-4 text-sm" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>

            <a href="#" class="block py-2 px-4 text-sm" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>

            <a href="#" class="block py-2 px-4 text-sm" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>