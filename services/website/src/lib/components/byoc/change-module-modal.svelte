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
  import ModuleIcon from "./module-icon.svelte";

  const curriculumSelection: Writable<CurriculumSelections> =
    getContext(contextKeyCurriculum);
  const layerToChange: Writable<Layer> = getContext(
    contextKeyCurriculumChangeModuleModal
  );

  const clearInvalidModules = (changedModuleId: string) => {
    switch ($layerToChange.id) {
      case "web":
        // @ts-ignore
        // prettier-ignore
        if (!curriculumValidation.web[changedModuleId]?.styles[$curriculumSelection.styles?.id]) {
          $curriculumSelection = {
            ...$curriculumSelection,
            // @ts-ignore
            styles: undefined,
          };
        }
        // @ts-ignore
        // prettier-ignore
        if (!curriculumValidation.web[changedModuleId]?.apitype[$curriculumSelection.apitype?.id]) {
          $curriculumSelection = {
            ...$curriculumSelection,
            // @ts-ignore
            apitype: undefined,
          };
        }
        // @ts-ignore
        // prettier-ignore
        if (!curriculumValidation.web[changedModuleId]?.apitype[$curriculumSelection.apitype?.id]?.api[$curriculumSelection.api?.id]) {
          $curriculumSelection = {
            ...$curriculumSelection,
            // @ts-ignore
            api: undefined,
          };
        }
        // @ts-ignore
        // prettier-ignore
        if (!curriculumValidation.web[changedModuleId]?.apitype[$curriculumSelection.apitype?.id]?.api[$curriculumSelection.api?.id]?.database[$curriculumSelection.database?.id]) {
          $curriculumSelection = {
            ...$curriculumSelection,
            // @ts-ignore
            database: undefined,
          };
        }
        break;
      case "styles":
        // @ts-ignore
        // prettier-ignore
        if (!curriculumValidation.web[$curriculumSelection.web?.id]?.styles[changedModuleId]) {
          $curriculumSelection = {
            ...$curriculumSelection,
            // @ts-ignore
            web: undefined,
          };
        }
        // @ts-ignore
        // prettier-ignore
        if (!curriculumValidation.web[$curriculumSelection.web?.id]?.apitype[$curriculumSelection.apitype?.id]) {
          $curriculumSelection = {
            ...$curriculumSelection,
            // @ts-ignore
            apitype: undefined,
          };
        }
        // @ts-ignore
        // prettier-ignore
        if (!curriculumValidation.web[$curriculumSelection.web?.id]?.apitype[$curriculumSelection.apitype?.id]?.api[$curriculumSelection.api?.id]) {
          $curriculumSelection = {
            ...$curriculumSelection,
            // @ts-ignore
            api: undefined,
          };
        }
        // @ts-ignore
        // prettier-ignore
        if (!curriculumValidation.web[$curriculumSelection.web?.id]?.apitype[$curriculumSelection.apitype?.id]?.api[$curriculumSelection.api?.id]?.database[$curriculumSelection.database?.id]) {
          $curriculumSelection = {
            ...$curriculumSelection,
            // @ts-ignore
            database: undefined,
          };
        }
        break;
      case "apitype":
        // @ts-ignore
        // prettier-ignore
        if (!curriculumValidation.web[$curriculumSelection.web?.id]?.apitype[changedModuleId]) {
          $curriculumSelection = {
            ...$curriculumSelection,
            // @ts-ignore
            web: undefined,
          };
        }
        // @ts-ignore
        // prettier-ignore
        if (!curriculumValidation.web[$curriculumSelection.web?.id]?.styles[$curriculumSelection.styles?.id]) {
          $curriculumSelection = {
            ...$curriculumSelection,
            // @ts-ignore
            web: undefined,
          };
        }
        // @ts-ignore
        // prettier-ignore
        if (!curriculumValidation.web[$curriculumSelection.web?.id]?.apitype[changedModuleId]?.api[$curriculumSelection.api?.id]) {
          $curriculumSelection = {
            ...$curriculumSelection,
            // @ts-ignore
            api: undefined,
          };
        }
        // @ts-ignore
        // prettier-ignore
        if (!curriculumValidation.web[$curriculumSelection.web?.id]?.apitype[changedModuleId]?.api[$curriculumSelection.api?.id]?.database[$curriculumSelection.database?.id]) {
          $curriculumSelection = {
            ...$curriculumSelection,
            // @ts-ignore
            database: undefined,
          };
        }
        break;
      case "api":
        // @ts-ignore
        // prettier-ignore
        if (!curriculumValidation.web[$curriculumSelection.web?.id]?.apitype[$curriculumSelection.apitype?.id]?.api[changedModuleId]) {
          $curriculumSelection = {
            ...$curriculumSelection,
            // @ts-ignore
            apitype: undefined,
          };
        }
        // @ts-ignore
        // prettier-ignore
        if (!curriculumValidation.web[$curriculumSelection.web?.id]?.apitype[$curriculumSelection.apitype?.id]) {
          $curriculumSelection = {
            ...$curriculumSelection,
            // @ts-ignore
            web: undefined,
          };
        }
        // @ts-ignore
        // prettier-ignore
        if (!curriculumValidation.web[$curriculumSelection.web?.id]?.apitype[$curriculumSelection.apitype?.id]?.api[changedModuleId]?.database[$curriculumSelection.database?.id]) {
          $curriculumSelection = {
            ...$curriculumSelection,
            // @ts-ignore
            database: undefined,
          };
        }
        // @ts-ignore
        // prettier-ignore
        if (!curriculumValidation.web[$curriculumSelection.web?.id]?.styles[$curriculumSelection.styles?.id]) {
          $curriculumSelection = {
            ...$curriculumSelection,
            // @ts-ignore
            web: undefined,
          };
        }
        break;
      case "database":
        // @ts-ignore
        // prettier-ignore
        if (!curriculumValidation.web[$curriculumSelection.web?.id]?.apitype[$curriculumSelection.apitype?.id]?.api[$curriculumSelection.api?.id]?.database[changedModuleId]) {
          $curriculumSelection = {
            ...$curriculumSelection,
            // @ts-ignore
            api: undefined,
          };
        }
        // @ts-ignore
        // prettier-ignore
        if (!curriculumValidation.web[$curriculumSelection.web?.id]?.apitype[$curriculumSelection.apitype?.id]?.api[$curriculumSelection.api?.id]) {
          $curriculumSelection = {
            ...$curriculumSelection,
            // @ts-ignore
            apitype: undefined,
          };
        }
        // @ts-ignore
        // prettier-ignore
        if (!curriculumValidation.web[$curriculumSelection.web?.id]?.apitype[$curriculumSelection.apitype?.id]) {
          $curriculumSelection = {
            ...$curriculumSelection,
            // @ts-ignore
            web: undefined,
          };
        }
        // @ts-ignore
        // prettier-ignore
        if (!curriculumValidation.web[$curriculumSelection.web?.id]?.styles[$curriculumSelection.styles?.id]) {
          $curriculumSelection = {
            ...$curriculumSelection,
            // @ts-ignore
            web: undefined,
          };
        }
        break;
    }
  };

  const changeSelection = (module: Module) => {
    $curriculumSelection = {
      ...$curriculumSelection,
      [$layerToChange?.id]: module,
    };
    clearInvalidModules(module.id);
    // @ts-ignore
    $layerToChange = null;
  };

  const getArticle = (noun: string) => {
    return ["a", "e", "i", "o", "u"].includes(noun[0].toLowerCase())
      ? "an"
      : "a";
  };

  const capitalizeCorrectly = (words: string) => {
    return words.includes("API") ? words : words.toLowerCase();
  };

  const closeModal = () => {
    // @ts-ignore
    $layerToChange = null;
  };

  $: title =
    $layerToChange &&
    `Select ${getArticle($layerToChange.title)} ${capitalizeCorrectly(
      $layerToChange.title
    )}`;
</script>

{#if $layerToChange}
  <div
    class="fixed inset-0 z-10 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="sm:p-o flex min-h-screen items-end justify-center text-center sm:block md:px-4 md:pt-4 md:pb-20"
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
        on:click="{closeModal}"
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:h-screen sm:align-middle"
        aria-hidden="true">&#8203;</span
      >

      <div
        class="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all dark:bg-slate-900 sm:my-8 sm:max-w-[85vw] sm:p-6 sm:align-middle"
      >
        <div>
          <div class="flex justify-end">
            <button on:click="{closeModal}">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                  fill="#6E6D7A"></path>
              </svg>
            </button>
          </div>
          <p class="mt-4 mb-12 text-2xl">{title}</p>
          <div class="flex flex-wrap gap-4">
            {#each $layerToChange.modules as module}
              <div
                on:click="{() => changeSelection(module)}"
                class="grid max-w-sm cursor-pointer grid-cols-3 gap-4 rounded-2xl border-4 border-solid border-transparent p-2 hover:border-black"
              >
                <div class="row-span-2">
                  <ModuleIcon
                    layerId="{$layerToChange.id}"
                    moduleId="{module.id}"
                  />
                </div>
                <div class="text-xl">{module.name}</div>
                {#if module.status}
                  <div
                    class="flex items-center justify-center rounded-full bg-slate-200 align-middle text-xs uppercase dark:bg-slate-700"
                  >
                    {module.status}
                  </div>
                {/if}
                <div class="col-span-2 text-gray-500">{module.description}</div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
