<script lang="ts">
  export let title: string;
</script>

<div class="pt-2">
  <p class="max-w-3xl text-lg font-semibold leading-7">
    {title}
  </p>
  <div class="flex flex-wrap justify-start space-x-2">
    <slot />
  </div>
</div>
