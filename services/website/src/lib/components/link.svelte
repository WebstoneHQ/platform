<script lang="ts">
  let clazz = "";
  export { clazz as class };
  export let href: string;
</script>

<a
  href="{href}"
  target="_blank"
  rel="noreferrer"
  class="text-lg font-semibold leading-10 tracking-wide underline underline-offset-4 hover:decoration-orange-500 {clazz}"
>
  <slot />
</a>
