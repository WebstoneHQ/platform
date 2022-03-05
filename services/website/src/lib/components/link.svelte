<script lang="ts">
  let clazz = "";
  export { clazz as class };
  export let href: string;
</script>

<a
  href="{href}"
  target="_blank"
  rel="noreferrer"
  class="leading-7 tracking-wide underline underline-offset-2 hover:decoration-[#503cff] {clazz}"
>
  <slot />
</a>
