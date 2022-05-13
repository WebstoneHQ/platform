<script lang="ts">
  export let isActive = false;
  export let href: string;
</script>

<a
  href="{href}"
  class:bg-gray-100="{isActive}"
  class:text-gray-900="{isActive}"
  class:hover:bg-gray-50="{!isActive}"
  class:hover:text-gray-900="{!isActive}"
  class:ml-10="{href.match(/lessons\/\d{2}-\d[1-9]-/)}"
  class:md:ml-8="{href.match(/lessons\/\d{2}-\d[1-9]-/)}"
  class="group flex items-center rounded-md py-2 px-2 text-base font-medium md:text-sm"
>
  <!-- Heroicon name: outline/users -->
  <svg
    class:group-hover:text-gray-500="{!isActive}"
    class="mr-4 h-6 w-6 flex-shrink-0 md:mr-3"
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
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    ></path>
  </svg>
  <slot />
</a>
