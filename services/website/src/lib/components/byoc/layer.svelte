<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { Layer, Module } from "$lib/byoc-layers";
  import { getContext } from "svelte";
  import { contextKeyCurriculumChangeModuleModal } from "$lib/context-keys";
  import Tooltip from "$lib/components/tooltip.svelte";
  import ModuleIcon from "$lib/components/byoc/module-icon.svelte";

  const layerToChange: Writable<Layer> = getContext(
    contextKeyCurriculumChangeModuleModal
  );

  export let layer: Layer;
  export let layerName: string; // "web" | "styles" | "apitype" | "api" | "database";
  export let selectedModule: Module | undefined = undefined;
</script>

{#if selectedModule}
  <!-- Uncomment the next div and remove the subsequent one, plus the svg below, to enable the interactive BYOC -->
  <!-- div
    class="flex cursor-pointer flex-col items-center rounded-3xl border bg-[#FBFBFB] py-4 px-6 dark:bg-slate-800 md:w-48"
    on:click="{() => ($layerToChange = layer)}"
  -->
  <div
    class="grid grid-cols-2 grid-rows-2 bg-[#FBFBFB] py-3 px-4 text-center dark:bg-[#333333] md:flex md:w-48 md:flex-1 md:flex-col md:items-center md:py-5 md:px-4"
  >
    <h2 class="order-2 flex items-center font-semibold md:order-1">
      <span>{selectedModule.name}</span>
      <!-- svg
        class="ml-1"
        width="13"
        height="8"
        viewBox="0 0 13 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5 2.00009L11.09 0.590088L6.5 5.17009L1.91 0.590087L0.5 2.00009L6.5 8.00009L12.5 2.00009Z"
          fill="#503CFF"></path>
      </svg -->
    </h2>
    <div class="order-1 row-span-2 md:order-2 md:mt-3">
      <ModuleIcon layerId="{layerName}" moduleId="{selectedModule.id}" />
    </div>
    <span class="order-3 text-gray-400 md:mt-3">{layer.title}</span>
  </div>
{:else}
  <div
    class="flex min-h-[160px] items-center justify-center rounded-3xl border-2 border-dashed border-black bg-[#FBFBFB] dark:bg-slate-800 md:w-48"
  >
    <div class="flex flex-col items-center">
      <button
        on:click="{() => ($layerToChange = layer)}"
        class="font-medium text-[#503CFF] underline"
        >Select another {layerName} framework</button
      >
      <Tooltip />
    </div>
  </div>
{/if}
