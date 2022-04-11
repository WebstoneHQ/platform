<script lang="ts" context="module">
  import type { Module } from "$lib/byoc-layers";

  export type CurriculumConfigurationWebOptions =
    | "angular"
    | "nextjs"
    | "nuxtjs"
    | "react"
    | "svelte"
    | "sveltekit"
    | "vue";
  export type CurriculumConfigurationStylesOptions =
    | "bootstrap"
    | "chakraui"
    | "css"
    | "styledcomponents"
    | "tailwind"
    | "unocss"
    | "windicss";
  export type CurriculumConfigurationApiTypeOptions = "graphql" | "rest";
  export type CurriculumConfigurationApiOptions =
    | "go"
    | "java"
    | "nextjs"
    | "nodejs"
    | "nuxtjs"
    | "rust"
    | "sveltekit";
  export type CurriculumConfigurationDatabaseOptions =
    | "mongodb"
    | "mysql"
    | "planetscale"
    | "postgresql";

  export type CurriculumSelections = {
    web: Module;
    styles: Module;
    apitype: Module;
    api: Module;
    database: Module;
  };
</script>

<script lang="ts">
  import { setContext } from "svelte";
  import { writable, Writable } from "svelte/store";
  import {
    contextKeyCurriculum,
    contextKeyCurriculumChangeModuleModal,
  } from "$lib/context-keys";
  import { enhance } from "$lib/actions/form";
  import { layers } from "$lib/byoc-layers";
  // import PreorderBenefits from "$lib/components/preorder-benefits.svelte";
  import Stack from "./stack.svelte";
  import ChangeModuleModal from "./change-module-modal.svelte";

  const signUpSuccessful = async (_: Response, form: HTMLFormElement) => {
    form.reset();
    form.style.setProperty("--success", "visible");
  };

  const curriculumSelection: Writable<CurriculumSelections> = writable({
    web: layers.web.modules.find(
      (module) => module.id === "sveltekit"
    ) as Module,
    styles: layers.styles.modules.find(
      (module) => module.id === "tailwind"
    ) as Module,
    apitype: layers.apitype.modules.find(
      (module) => module.id === "rest"
    ) as Module,
    api: layers.api.modules.find(
      (module) => module.id === "sveltekit"
    ) as Module,
    database: layers.database.modules.find(
      (module) => module.id === "postgresql"
    ) as Module,
  });
  setContext(contextKeyCurriculum, curriculumSelection);
  setContext(contextKeyCurriculumChangeModuleModal, writable());

  $: isCurriculumSelectionComplete = Object.values($curriculumSelection).every(
    (module) => module
  );
  $: isCurriculumAvailable = Object.values($curriculumSelection).every(
    (module) => module && !module.status
  );

  // $: layerEntries = Object.entries(layers) as [keyof Layers, Layer][];
</script>

<style>
  form {
    --success: hidden;
  }
</style>

<Stack {layers} />

{#if isCurriculumAvailable}
  <div class="sticky bottom-12 mt-8 flex justify-center text-center">
    <a
      href="/courses/sveltekit-css-rest-postgresql"
      class="rounded-full bg-[#503CFF] py-4 md:px-14 text-white w-full md:w-auto"
      >
      <span class="block text-base font-semibold">Learn Now</span>
    </a>
  </div>
  <!-- <PreorderBenefits /> -->
{:else if isCurriculumSelectionComplete}
  <div class="mt-6 flex flex-col items-center">
    <p class="text-center text-2xl font-semibold">
      We'll let you know when this curriculum is available
    </p>
    <form
      action="/api/sign-up.json-TODO-does-not-work-yet"
      method="post"
      use:enhance="{{
        result: signUpSuccessful,
      }}"
      class="mt-5"
    >
      <div class="flex justify-center">
        <div class="relative">
          <input
            type="email"
            required
            name="email"
            class="md:text-lg w-80 md:w-[32rem] bg-transparent rounded-3xl focus:shadow focus:outline-none py-6"
            placeholder="Enter your email"
          />
          <div class="absolute top-2 right-2">
            <button
              type="submit"
              class="text-white rounded-3xl md:text-lg font-semibold bg-[#503CFF] py-4 px-10"
              >Notify me</button
            >
          </div>
        </div>
      </div>
      <div class="mt-4 text-center" style="visibility: var(--success);">
        <p>Thank you, we will send you updates.</p>
      </div>
    </form>
  </div>
{/if}
<div class="mx-auto mt-7 text-center">
  <a
    href="https://forms.zohopublic.com/webstonetechnologies/form/WebstoneEducationCustomCurriculum/formperma/g1Eig2cKU-DbEDaC6IHrE_CgBnGUgNtt3x-KLlAqC9Q"
    target="_blank"
    class="font-bold text-[#1d1d1f] dark:text-white"
    >Request a custom curriculum ></a
  >
</div>

<ChangeModuleModal />
