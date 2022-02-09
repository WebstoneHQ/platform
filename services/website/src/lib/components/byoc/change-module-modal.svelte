<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { CurriculumSelections } from "./index.svelte";
  import type { Layer } from "./layer.svelte";

  import { getContext } from "svelte";
  import {
    contextKeyCurriculum,
    contextKeyCurriculumChangeModuleModal,
  } from "$lib/context-keys";

  const curriculumSelection: Writable<CurriculumSelections> =
    getContext(contextKeyCurriculum);
  const layerToChange: Writable<Layer> = getContext(
    contextKeyCurriculumChangeModuleModal
  );

  const changeSelection = (moduleIcon) => {
    $curriculumSelection = {
      ...$curriculumSelection,
      [$layerToChange.id]: moduleIcon,
    };
    $layerToChange = null;
  };
</script>

{#if $layerToChange}
  <div
    class="fixed inset-0 z-10 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
    >
      <!--
        Background overlay, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
      -->
      <div
        on:click="{() => ($layerToChange = null)}"
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:h-screen sm:align-middle"
        aria-hidden="true">&#8203;</span
      >

      <div
        class="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[85vw] sm:p-6 sm:align-middle"
      >
        <div>
          <p>Select a {$layerToChange.title}</p>
          <div class="flex flex-wrap">
            {#each $layerToChange.modules as module}
              <div class="grid grid-flow-col grid-rows-3 gap-4">
                <div class="row-span-3">
                  <img
                    src="/svg/byoc/{$layerToChange.id}/{module.icon}.svg"
                    alt="logo"
                    title=""
                    height="80px"
                    width="80px"
                    class="h-20 w-20 cursor-pointer"
                    on:click="{() => changeSelection(module.icon)}"
                  />
                </div>
                <div class="col-span-2">{module.name}</div>
                <div class="col-span-2 row-span-2">{module.description}</div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
