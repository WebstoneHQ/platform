<script lang="ts">
  export let gitHubLogin: string;
</script>

<div class="rounded-3xl bg-[#FBFBFB] p-4 drop-shadow-md dark:bg-[#333333]">
  <h2 class=" text-xl font-semibold md:text-3xl">New to Webstone Education?</h2>
  <p class="mt-4">
    We created a private <code>webstone-education</code> learning repository in your
    GitHub account.
  </p>
  <p class="mt-4">
    Click the button below to navigate to your repo and follow the instructions
    to start learning.
  </p>
  <div class="sticky bottom-12 mt-8 flex justify-center text-center">
    <a
      href="https://www.github.com/{gitHubLogin}/webstone-education"
      target="_blank"
      rel="noreferrer"
      class="w-full rounded-full bg-[#503CFF] py-4 text-white md:w-auto md:px-14"
    >
      <span class="block text-base font-semibold">Start learning</span>
    </a>
  </div>
</div>
