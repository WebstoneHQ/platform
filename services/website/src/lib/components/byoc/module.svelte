<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { CurriculumSelections } from "$lib/components/byoc/index.svelte";

  import { getContext } from "svelte";
  import { contextKeyCurriculum } from "$lib/context-keys";

  export let layer: string;
  export let name: string;
  export let readOnly = false;

  const curriculumSelections: Writable<CurriculumSelections> =
    getContext(contextKeyCurriculum);
</script>

<img
  src="/svg/byoc/{layer}/{name}.svg"
  alt="{name} logo"
  title="{name}"
  class:cursor-pointer="{!readOnly}"
  class="w-20 h-20"
  on:click="{() => !readOnly && ($curriculumSelections[layer] = name)}"
/>
