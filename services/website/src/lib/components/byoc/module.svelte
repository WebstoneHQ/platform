<script lang="ts">
  import type { Writable } from "svelte/store";
  import type {
    CurriculumSelections,
    CurriculumConfigurationApiOptions,
    CurriculumConfigurationApiTypeOptions,
    CurriculumConfigurationDatabaseOptions,
    CurriculumConfigurationStylesOptions,
    CurriculumConfigurationWebOptions,
  } from "$lib/components/byoc/index.svelte";

  import { getContext } from "svelte";
  import { contextKeyCurriculum } from "$lib/context-keys";

  export let layer: keyof CurriculumSelections;
  export let name:
    | CurriculumConfigurationApiOptions
    | CurriculumConfigurationApiTypeOptions
    | CurriculumConfigurationDatabaseOptions
    | CurriculumConfigurationStylesOptions
    | CurriculumConfigurationWebOptions;
  export let readOnly = false;

  const curriculumSelections: Writable<CurriculumSelections> =
    getContext(contextKeyCurriculum);

  const moduleClicked = () => {
    if (!readOnly) {
      // @ts-ignore
      $curriculumSelections[layer] = name;
    }
  };
</script>

<img
  src="/svg/byoc/{layer}/{name}.svg"
  alt="{name} logo"
  title="{name}"
  height="80px"
  width="80px"
  class:cursor-pointer="{!readOnly}"
  class="h-20 w-20"
  on:click="{moduleClicked}"
/>
