<script lang="ts">
  const allModules: string[] = [
    "web/react",
    "styles/css",
    "web/nextjs",
    "apitype/graphql",
    "api/rust",
    "database/mysql",
    "styles/styledcomponents",
    "web/vue",
    "styles/chakraui",
    "api/nodejs",
    "database/mongodb",
    "api/go",
    "database/postgresql",
  ];
</script>

<div class="relative flex overflow-x-hidden">
  <div class="flex whitespace-nowrap py-12 motion-safe:animate-marquee">
    {#each Array.from(allModules) as modulePath}
      <img
        src="/svg/byoc/{modulePath.split('/')[0]}/{modulePath.split(
          '/'
        )[1]}.svg"
        alt="logo"
        title=""
        height="80px"
        width="80px"
        class="mr-20 inline-block h-20 w-20"
      />
    {/each}
  </div>
</div>
