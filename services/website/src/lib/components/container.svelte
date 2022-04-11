<script lang="ts">
  export let isFullWidth: boolean = false;

  let clazz = "";
  export { clazz as class };
</script>

<div class="mx-auto {!isFullWidth && 'max-w-5xl px-4 md:px-0'} {clazz}">
  <slot />
</div>
