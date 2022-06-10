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
  <!-- Heroicon name: outline/academic-cap -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="mr-1 h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
    <path
      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
    ></path>
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
    ></path>
  </svg>
  <slot />
</a>
