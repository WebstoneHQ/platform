<script lang="ts" context="module">
  import type { Module } from "./layer.svelte";

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
  import LayerComponent, { Layer } from "./layer.svelte";
  import ChangeModuleModal from "./change-module-modal.svelte";

  type Layers = {
    web: Layer;
    styles: Layer;
    apitype: Layer;
    api: Layer;
    database: Layer;
  };

  const layers: Layers = {
    web: {
      id: "web",
      title: "Web framework",
      modules: [
        {
          description:
            "TODO: Description text for this framework or technology to help provide context",
          id: "angular",
          name: "Angular",
          status: "Coming soon",
        },
        {
          description:
            "TODO: Description text for this framework or technology to help provide context",
          id: "nextjs",
          name: "NextJS",
          status: "Coming soon",
        },
        {
          description:
            "TODO: Description text for this framework or technology to help provide context",
          id: "nuxtjs",
          name: "NuxtJS",
          status: "Coming soon",
        },
        {
          description:
            "TODO: Description text for this framework or technology to help provide context.",
          id: "react",
          name: "React",
          status: "Coming soon",
        },
        {
          description:
            "TODO: Description text for this framework or technology to help provide context.",
          id: "svelte",
          name: "Svelte",
          status: "Coming soon",
        },
        {
          description:
            "TODO: Description text for this framework or technology to help provide context.",
          id: "sveltekit",
          name: "SvelteKit",
        },
        {
          description:
            "TODO: Description text for this framework or technology to help provide context.",
          id: "vue",
          name: "Vue.js",
          status: "Coming soon",
        },
      ],
    },
    styles: {
      id: "styles",
      title: "Styling",
      modules: [
        {
          description:
            "TODO: Description text for this framework or technology to help provide context.",
          id: "bootstrap",
          name: "Bootstrap",
          status: "Coming soon",
        },
        {
          description:
            "TODO: Description text for this framework or technology to help provide context.",
          id: "chakraui",
          name: "Chakra UI",
          status: "Coming soon",
        },
        {
          description:
            "TODO: Description text for this framework or technology to help provide context.",
          id: "css",
          name: "Css",
          status: "Coming soon",
        },
        {
          description:
            "TODO: Description text for this framework or technology to help provide context.",
          id: "styledcomponents",
          name: "styled components",
          status: "Coming soon",
        },
        {
          description:
            "TODO: Description text for this framework or technology to help provide context.",
          id: "tailwind",
          name: "Tailwind CSS",
        },
        {
          description:
            "TODO: Description text for this framework or technology to help provide context.",
          id: "unocss",
          name: "UnocSS",
          status: "Coming soon",
        },
        {
          description:
            "TODO: Description text for this framework or technology to help provide context.",
          id: "windicss",
          name: "Windi CSS",
          status: "Coming soon",
        },
      ],
    },
    apitype: {
      id: "apitype",
      title: "API type",
      modules: [
        {
          description:
            "TODO: Description text for this framework or technology to help provide context",
          id: "graphql",
          name: "GraphQL",
          status: "Coming soon",
        },
        {
          description:
            "TODO: Description text for this framework or technology to help provide context",
          id: "rest",
          name: "REST",
        },
      ],
    },
    api: {
      id: "api",
      title: "API framework",
      modules: [
        {
          description:
            "TODO: Description text for this framework or technology to help provide context",
          id: "go",
          name: "Go",
          status: "Coming soon",
        },
        {
          description:
            "TODO: Description text for this framework or technology to help provide context",
          id: "java",
          name: "Java",
          status: "Coming soon",
        },
        {
          description:
            "TODO: Description text for this framework or technology to help provide context",
          id: "nextjs",
          name: "NextJS",
          status: "Coming soon",
        },
        {
          description:
            "TODO: Description text for this framework or technology to help provide context",
          id: "nodejs",
          name: "Node.js",
          status: "Coming soon",
        },
        {
          description:
            "TODO: Description text for this framework or technology to help provide context",
          id: "nuxtjs",
          name: "NuxtJS",
          status: "Coming soon",
        },
        {
          description:
            "TODO: Description text for this framework or technology to help provide context",
          id: "rust",
          name: "Rust",
          status: "Coming soon",
        },
        {
          description:
            "TODO: Description text for this framework or technology to help provide context",
          id: "sveltekit",
          name: "SvelteKit",
        },
      ],
    },
    database: {
      id: "database",
      title: "Database",
      modules: [
        {
          description:
            "TODO: Description text for this framework or technology to help provide context",
          id: "mongodb",
          name: "Mongo DB",
          status: "Coming soon",
        },
        {
          description:
            "TODO: Description text for this framework or technology to help provide context",
          id: "mysql",
          name: "MySQL",
          status: "Coming soon",
        },
        {
          description:
            "TODO: Description text for this framework or technology to help provide context",
          id: "planetscale",
          name: "PlanetScale",
          status: "Coming soon",
        },
        {
          description:
            "TODO: Description text for this framework or technology to help provide context",
          id: "postgresql",
          name: "PostgreSQL",
        },
      ],
    },
  };

  const signUpSuccessful = async (_: Response, form: HTMLFormElement) => {
    form.reset();
    form.style.setProperty("--success", "visible");
  };

  const curriculumSelection: Writable<CurriculumSelections> = writable({
    web: layers.web.modules.find((module) => module.id === "sveltekit"),
    styles: layers.styles.modules.find((module) => module.id === "tailwind"),
    apitype: layers.apitype.modules.find((module) => module.id === "rest"),
    api: layers.api.modules.find((module) => module.id === "sveltekit"),
    database: layers.database.modules.find(
      (module) => module.id === "postgresql"
    ),
  });
  setContext(contextKeyCurriculum, curriculumSelection);
  setContext(contextKeyCurriculumChangeModuleModal, writable());

  $: isCurriculumSelectionComplete = Object.values($curriculumSelection).every(
    (module) => module
  );
  $: isCurriculumAvailable = Object.values($curriculumSelection).every(
    (module) => module && !module.status
  );
</script>

<style>
  form {
    --success: hidden;
  }
</style>

<div class="space-y-5 px-4 md:flex md:justify-between md:space-y-0">
  {#each Object.entries(layers) as [layerName, layer]}
    <LayerComponent
      layer="{layer}"
      layerName="{layerName}"
      selectedModule="{layers[layerName].modules.find(
        (module) => module.id === $curriculumSelection[layerName]?.id
      )}"
    />
  {/each}
</div>
{#if isCurriculumAvailable}
  <div class="sticky bottom-12 mt-8 flex justify-center">
    <button
      on:click="{() =>
        alert('This is not quite ready, but thank you for your interest!')}"
      class="rounded-full bg-[#503CFF] py-4 px-14 text-white"
    >
      <span class="block text-base font-semibold">Preorder today</span>
      <span class="block text-gray-300">$249 for a limited time</span>
    </button>
  </div>
  <div class="mt-6">
    <p class="text-center text-2xl font-semibold">
      Preorder now and access all future modules
    </p>
    <ul class="mx-auto table">
      <li class="mt-4 flex items-center space-x-2">
        <svg
          width="18"
          height="14"
          viewBox="0 0 18 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.99997 11.1711L1.82997 7.00106L0.409973 8.41106L5.99997 14.0011L18 2.00106L16.59 0.591064L5.99997 11.1711Z"
            fill="#6E6D7A"></path>
        </svg>
        <span>Lifetime access to all modules</span>
      </li>
      <li class="flex items-center space-x-2">
        <svg
          width="18"
          height="14"
          viewBox="0 0 18 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.99997 11.1711L1.82997 7.00106L0.409973 8.41106L5.99997 14.0011L18 2.00106L16.59 0.591064L5.99997 11.1711Z"
            fill="#6E6D7A"></path>
        </svg>
        <span>Access to our exclusive Discord community</span>
      </li>
      <li class="flex items-center space-x-2">
        <svg
          width="18"
          height="14"
          viewBox="0 0 18 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.99997 11.1711L1.82997 7.00106L0.409973 8.41106L5.99997 14.0011L18 2.00106L16.59 0.591064L5.99997 11.1711Z"
            fill="#6E6D7A"></path>
        </svg>
        <span>Influence the content of the course</span>
      </li>
    </ul>
  </div>
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

<ChangeModuleModal />
