<script lang="ts">
  import { getContext } from "svelte";
  import { contextKeyCurriculum } from "$lib/context-keys";

  export let layer: string;
  export let name: string;
  export let readOnly = false;

  const curriculum = getContext(contextKeyCurriculum);
</script>

<img
  src="/static/svg/byoc/{layer}/{name}.svg"
  alt="{name} logo"
  class:cursor-pointer="{!readOnly}"
  class="w-20 h-20"
  on:click="{() => !readOnly && ($curriculum[layer] = name)}"
/>
