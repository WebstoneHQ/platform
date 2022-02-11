<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { CurriculumSelections } from "./index.svelte";
  import type { Layer, Module } from "./layer.svelte";

  import { getContext } from "svelte";
  import {
    contextKeyCurriculum,
    contextKeyCurriculumChangeModuleModal,
  } from "$lib/context-keys";
  import curriculumValidation from "$lib/curriculum-validation";

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

  const isModuleInvalidGivenExistingCurriculum = (module: Module) => {
    let isValid: boolean;
    switch ($layerToChange.id) {
      case "web":
        isValid =
          !!curriculumValidation.web[module.id]?.styles[
            $curriculumSelection.styles
          ] &&
          !!curriculumValidation.web[module.id]?.apitype[
            $curriculumSelection.apitype
          ]?.api[$curriculumSelection.api]?.database[
            $curriculumSelection.database
          ];
        break;
      case "styles":
        isValid =
          !!curriculumValidation.web[$curriculumSelection.web]?.styles[
            module.id
          ] &&
          !!curriculumValidation.web[$curriculumSelection.web]?.apitype[
            $curriculumSelection.apitype
          ]?.api[$curriculumSelection.api]?.database[
            $curriculumSelection.database
          ];
        break;
      case "apitype":
        isValid =
          !!curriculumValidation.web[$curriculumSelection.web]?.styles[
            $curriculumSelection.styles
          ] &&
          !!curriculumValidation.web[$curriculumSelection.web]?.apitype[
            module.id
          ]?.api[$curriculumSelection.api]?.database[
            $curriculumSelection.database
          ];
        break;
      case "api":
        isValid =
          !!curriculumValidation.web[$curriculumSelection.web]?.styles[
            $curriculumSelection.styles
          ] &&
          !!curriculumValidation.web[$curriculumSelection.web]?.apitype[
            $curriculumSelection.apitype
          ]?.api[module.id]?.database[$curriculumSelection.database];
        break;
      case "database":
        isValid =
          !!curriculumValidation.web[$curriculumSelection.web]?.styles[
            $curriculumSelection.styles
          ] &&
          !!curriculumValidation.web[$curriculumSelection.web]?.apitype[
            $curriculumSelection.apitype
          ]?.api[$curriculumSelection.api]?.database[module.id];
        break;
    }
    return !isValid;
  };
</script>

<style>
  .is-invalid {
    @apply bg-gray-200;
  }
</style>

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
        class="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all dark:bg-slate-900 sm:my-8 sm:w-full sm:max-w-[85vw] sm:p-6 sm:align-middle"
      >
        <div>
          <p>Select a {$layerToChange.title}</p>
          <div class="flex flex-wrap gap-4">
            {#each $layerToChange.modules as module}
              <div
                on:click="{() =>
                  !isModuleInvalidGivenExistingCurriculum(module) &&
                  changeSelection(module.id)}"
                class:is-invalid="{isModuleInvalidGivenExistingCurriculum(
                  module
                )}"
                class="grid cursor-pointer grid-cols-3 gap-4 rounded-2xl border-4 border-solid border-transparent p-2 hover:border-black"
              >
                <div class="row-span-2">
                  <img
                    src="/svg/byoc/{$layerToChange.id}/{module.id}.svg"
                    alt="logo"
                    title=""
                    height="80px"
                    width="80px"
                    class="h-20 w-20"
                  />
                </div>
                <div class="">{module.name}</div>
                {#if isModuleInvalidGivenExistingCurriculum(module)}
                  <div
                    class="flex items-center justify-center bg-gray-200 text-xs"
                  >
                    Invalid option
                  </div>
                {:else if module.status}
                  <div
                    class="bg-gray-200 flex justify-center items-center text-xs"
                  >
                    {module.status}
                  </div>
                {/if}
                <div class="col-span-2">{module.description}</div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
