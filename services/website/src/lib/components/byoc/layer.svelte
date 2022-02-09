<script lang="ts" context="module">
  type Module = {
    description: string;
    icon: string;
    name: string;
  };

  export type Layer = {
    id: string;
    modules: Module[];
    title: string;
  };
</script>

<script lang="ts">
  import type { Writable } from "svelte/store";
  import { getContext } from "svelte";
  import { contextKeyCurriculumChangeModuleModal } from "$lib/context-keys";

  const layerToChange: Writable<Layer> = getContext(
    contextKeyCurriculumChangeModuleModal
  );

  export let layer: Layer;
  export let layerName: string; // "web" | "styles" | "apitype" | "api" | "database";
  export let selectedModule: Module;
</script>

<div
  class="flex cursor-pointer flex-col items-center rounded bg-slate-100 py-4 px-6 dark:bg-slate-800"
  on:click="{() => ($layerToChange = layer)}"
>
  <h2 class="font-medium">
    {layer.title}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="inline h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clip-rule="evenodd"></path>
    </svg>
  </h2>
  <img
    src="/svg/byoc/{layerName}/{selectedModule.icon}.svg"
    alt="logo"
    title=""
    height="80px"
    width="80px"
    class="h-20 w-20"
  />
  <span>{selectedModule.name}</span>
</div>
