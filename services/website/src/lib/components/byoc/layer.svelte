<script lang="ts" context="module">
  export type Module = {
    description: string;
    id: string;
    name: string;
    status?: string;
  };

  export type Layer = {
    id: "web" | "styles" | "apitype" | "api" | "database";
    modules: Module[];
    title: string;
  };
</script>

<script lang="ts">
  import type { Writable } from "svelte/store";
  import { getContext } from "svelte";
  import { contextKeyCurriculumChangeModuleModal } from "$lib/context-keys";
  import Tooltip from "$lib/components/tooltip.svelte";

  const layerToChange: Writable<Layer> = getContext(
    contextKeyCurriculumChangeModuleModal
  );

  export let layer: Layer;
  export let layerName: string; // "web" | "styles" | "apitype" | "api" | "database";
  export let selectedModule: Module = undefined;
</script>

{#if selectedModule}
  <div
    class="flex cursor-pointer flex-col items-center rounded-3xl border bg-[#FBFBFB] py-4 px-6 dark:bg-slate-800 md:w-48"
    on:click="{() => ($layerToChange = layer)}"
  >
    <h2 class="flex items-center font-semibold">
      <span>{layer.title}</span>
      <svg
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
      </svg>
    </h2>
    <img
      src="/svg/byoc/{layerName}/{selectedModule.id}.svg"
      alt="logo"
      title=""
      height="80px"
      width="80px"
      class="mt-4 h-20 w-20"
    />
    <span class="mt-3 text-gray-400">{selectedModule.name}</span>
  </div>
{:else}
  <div
    class="min-h-[160px] flex items-center justify-center rounded-3xl border-2 border-black border-dashed bg-[#FBFBFB] py-4 px-6 dark:bg-slate-800 md:w-48"
  >
    <div class="flex flex-col items-center">
      <button
        on:click="{() => ($layerToChange = layer)}"
        class="underline text-[#503CFF] font-medium"
        >Select another {layerName} framework</button
      >
      <Tooltip />
    </div>
  </div>
{/if}
