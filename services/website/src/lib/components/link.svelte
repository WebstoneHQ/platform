<script lang="ts">
  let clazz = "";
  export { clazz as class };
  export let href: string;
</script>

<a
  href="{href}"
  target="_blank"
  rel="noreferrer"
  class="underline underline-offset-4 text-lg font-semibold leading-10 tracking-wide hover:decoration-orange-500 {clazz}"
>
  <slot />
</a>
