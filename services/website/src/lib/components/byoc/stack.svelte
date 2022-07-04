<script lang="ts">
  import type { Layers } from "$lib/byoc-layers";
  import LayerComponent from "./layer.svelte";

  export let layers: Layers;
  export let readOnly: boolean = false;
</script>

<div class="overflow-hidden rounded-3xl drop-shadow-md md:flex">
  <!-- Hard-coded until we need the interactive BYOC -->
  <LayerComponent
    layer="{layers.web}"
    layerName="web"
    selectedModule="{layers.web.modules.find(
      (module) => module.id === 'sveltekit'
    )}"
    readOnly="{readOnly}"
  />
  <LayerComponent
    layer="{layers.styles}"
    layerName="styles"
    selectedModule="{layers.styles.modules.find(
      (module) => module.id === 'css'
    )}"
    readOnly="{readOnly}"
  />
  <LayerComponent
    layer="{layers.apitype}"
    layerName="apitype"
    selectedModule="{layers.apitype.modules.find(
      (module) => module.id === 'rest'
    )}"
    readOnly="{readOnly}"
  />
  <LayerComponent
    layer="{layers.database}"
    layerName="database"
    selectedModule="{layers.database.modules.find(
      (module) => module.id === 'postgresql'
    )}"
    readOnly="{readOnly}"
  />

  <!-- {#each layerEntries as [layerName, layer]}
    <LayerComponent
      layer="{layer}"
      layerName="{layerName}"
      selectedModule="{layers[layerName].modules.find(
        (module) => module.id === $curriculumSelection[layerName]?.id
      )}"
    />
  {/each} -->
</div>
