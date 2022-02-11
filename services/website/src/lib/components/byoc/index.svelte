<script lang="ts" context="module">
  export type CurriculumSelections = {
    web: string;
    styles: string;
    apitype: string;
    api: string;
    database: string;
  };
</script>

<script lang="ts">
  import { setContext } from "svelte";
  import { writable, Writable } from "svelte/store";
  import {
    contextKeyCurriculum,
    contextKeyCurriculumChangeModuleModal,
  } from "$lib/context-keys";
  import LayerComponent, { Layer } from "./layer.svelte";
  import ChangeModuleModal from "./change-module-modal.svelte";

  type Layers = {
    web: Layer;
    styles: Layer;
    apitype: Layer;
    api: Layer;
    database: Layer;
  };

  const layers: Layers = {
    web: {
      id: "web",
      title: "Web framework",
      modules: [
        {
          description: "TODO: Angular description",
          id: "angular",
          name: "Angular",
          status: "Coming soon",
        },
        {
          description: "TODO: NextJS description",
          id: "nextjs",
          name: "NextJS",
          status: "Coming soon",
        },
        {
          description: "TODO: NuxtJS description",
          id: "nuxtjs",
          name: "NuxtJS",
          status: "Coming soon",
        },
        {
          description: "TODO: React description.",
          id: "react",
          name: "React",
          status: "Coming soon",
        },
        {
          description: "TODO: Svelte description.",
          id: "svelte",
          name: "Svelte",
          status: "Coming soon",
        },
        {
          description: "TODO: SvelteKit description.",
          id: "sveltekit",
          name: "SvelteKit",
        },
        {
          description: "TODO: Vue.js description.",
          id: "vue",
          name: "Vue.js",
          status: "Coming soon",
        },
      ],
    },
    styles: {
      id: "styles",
      title: "Styling",
      modules: [
        {
          description: "TODO: Bootstrap description.",
          id: "bootstrap",
          name: "Bootstrap",
          status: "Coming soon",
        },
        {
          description: "TODO: Chakra UI description.",
          id: "chakraui",
          name: "Chakra UI",
          status: "Coming soon",
        },
        {
          description: "TODO: CSS description.",
          id: "css",
          name: "Css",
          status: "Coming soon",
        },
        {
          description: "TODO: styled components description.",
          id: "styledcomponents",
          name: "styled components",
          status: "Coming soon",
        },
        {
          description: "TODO: Tailwind CSS description.",
          id: "tailwind",
          name: "Tailwind CSS",
        },
        {
          description: "TODO: UnoCSS description.",
          id: "unocss",
          name: "UnocSS",
          status: "Coming soon",
        },
        {
          description: "TODO: Windi CSS description.",
          id: "windicss",
          name: "Windi CSS",
          status: "Coming soon",
        },
      ],
    },
    apitype: {
      id: "apitype",
      title: "API type",
      modules: [
        {
          description: "TODO: GraphQL API description",
          id: "graphql",
          name: "GraphQL API",
          status: "Coming soon",
        },
        {
          description: "TODO: REST API description",
          id: "rest",
          name: "REST API",
        },
      ],
    },
    api: {
      id: "api",
      title: "API framework",
      modules: [
        {
          description: "TODO: Go description",
          id: "go",
          name: "Go",
          status: "Coming soon",
        },
        {
          description: "TODO: Java description",
          id: "java",
          name: "Java",
          status: "Coming soon",
        },
        {
          description: "TODO: NextJS description",
          id: "nextjs",
          name: "NextJS",
          status: "Coming soon",
        },
        {
          description: "TODO: Node.js description",
          id: "nodejs",
          name: "Node.js",
          status: "Coming soon",
        },
        {
          description: "TODO: NuxtJS description",
          id: "nuxtjs",
          name: "NuxtJS",
          status: "Coming soon",
        },
        {
          description: "TODO: Rust description",
          id: "rust",
          name: "Rust",
          status: "Coming soon",
        },
        {
          description: "TODO: SvelteKit description",
          id: "sveltekit",
          name: "SvelteKit",
        },
      ],
    },
    database: {
      id: "database",
      title: "Database",
      modules: [
        {
          description: "TODO: Mongo DB description",
          id: "mongodb",
          name: "Mongo DB",
          status: "Coming soon",
        },
        {
          description: "TODO: MySQL description",
          id: "mysql",
          name: "MySQL",
          status: "Coming soon",
        },
        {
          description: "TODO: PlanetScale description",
          id: "planetscale",
          name: "PlanetScale",
          status: "Coming soon",
        },
        {
          description: "TODO: PostgreSQL description",
          id: "postgresql",
          name: "PostgreSQL",
        },
      ],
    },
  };

  const curriculumSelection: Writable<CurriculumSelections> = writable({
    web: "sveltekit",
    styles: "tailwind",
    apitype: "rest",
    api: "sveltekit",
    database: "postgresql",
  });
  setContext(contextKeyCurriculum, curriculumSelection);
  setContext(contextKeyCurriculumChangeModuleModal, writable());
</script>

<div class="flex justify-around">
  {#each Object.entries(layers) as [layerName, layer]}
    <LayerComponent
      layer="{layer}"
      layerName="{layerName}"
      selectedModule="{layers[layerName].modules.find(
        (module) => module.id === $curriculumSelection[layerName]
      )}"
    />
  {/each}
</div>

<div class="mt-20 flex justify-center">
  <button class="rounded-3xl bg-violet-600 py-3 px-4 text-white"
    >Start this curriculum</button
  >
</div>

<ChangeModuleModal />
