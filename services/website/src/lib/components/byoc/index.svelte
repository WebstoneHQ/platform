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
          description: "TODO: SvelteKit description.",
          icon: "sveltekit",
          name: "SvelteKit",
        },
        {
          description: "TODO: React description.",
          icon: "react",
          name: "React",
        },
        {
          description: "TODO: Angular description",
          icon: "angular",
          name: "Angular",
        },
        {
          description: "TODO: NextJS description",
          icon: "nextjs",
          name: "NextJS",
        },
      ],
    },
    styles: {
      id: "styles",
      title: "Styling",
      modules: [
        {
          description: "TODO: Tailwind CSS description.",
          icon: "tailwind",
          name: "Tailwind CSS",
        },
      ],
    },
    apitype: {
      id: "apitype",
      title: "API type",
      modules: [
        {
          description: "TODO: REST API description",
          icon: "rest",
          name: "REST API",
        },
      ],
    },
    api: {
      id: "api",
      title: "API framework",
      modules: [
        {
          description: "TODO: SvelteKit description",
          icon: "sveltekit",
          name: "SvelteKit",
        },
      ],
    },
    database: {
      id: "database",
      title: "Database",
      modules: [
        {
          description: "TODO: PostgreSQL description",
          icon: "postgresql",
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
        (module) => module.icon === $curriculumSelection[layerName]
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
