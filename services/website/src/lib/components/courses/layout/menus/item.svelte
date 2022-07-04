<script lang="ts">
  export let isActive = false;
  export let href: string;

  const lessonId = href.split("/").pop();
  const lessonNumber =
    lessonId.split("-")[1] === "00"
      ? lessonId.split("-")[0].replace(/^0/, "")
      : `${lessonId.split("-")[0].replace(/^0/, "")}.${lessonId
          .split("-")[1]
          .replace(/^0/, "")}`;
</script>

<a
  href="{href}"
  class:bg-gray-100="{isActive}"
  class:text-gray-900="{isActive}"
  class:ml-10="{href.match(/lessons\/\d{2}-\d[1-9]-/)}"
  class:md:ml-8="{href.match(/lessons\/\d{2}-\d[1-9]-/)}"
  class="group flex items-center rounded-md py-2 px-2 text-base font-medium md:text-sm"
>
  <span
    class:group-hover:bg-gray-50="{!isActive}"
    class:group-hover:text-gray-900="{!isActive}">{lessonNumber}.</span
  >&nbsp;<slot />
</a>
