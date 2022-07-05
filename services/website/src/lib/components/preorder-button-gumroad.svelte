<script lang="ts">
  import { page } from "$app/stores";
</script>

<div class="sticky bottom-12 mt-8 flex justify-center text-center">
  <a
    class="gumroad-button w-full"
    href="https://mikenikles.gumroad.com/l/webstone-education-preorder?wanted=true"
    >Enroll on</a
  >
</div>
<p class="mt-2 text-center text-[#6e6d7a] dark:text-white">
  Preorders are handled by Gumroad.com. You will receive a license key via
  email.<br />Already enrolled?
  <a
    href="/purchase/preorder/confirmation-gumroad?courseid={$page.params
      .courseid}&stackgroup={$page.params.stackgroup}&stack={$page.params
      .stack}"
    class="underline underline-offset-1">Verify your key</a
  > .
</p>
