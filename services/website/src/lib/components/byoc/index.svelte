<script lang="ts">
  import { enhance } from "$lib/actions/form";

  import React from "../../../../static/svg/byoc/web/react.svg";
  import Svelte from "../../../../static/svg/byoc/web/svelte.svg";
  import Vue from "../../../../static/svg/byoc/web/vue.svg";
  import Angular from "../../../../static/svg/byoc/web/angular.svg";

  import Chakraui from "../../../../static/svg/byoc/styles/chakraui.svg";
  import Css from "../../../../static/svg/byoc/styles/css.svg";
  import Styledcomponents from "../../../../static/svg/byoc/styles/styledcomponents.svg";
  import Tailwind from "../../../../static/svg/byoc/styles/tailwind.svg";

  import Rest from "../../../../static/svg/byoc/apitype/rest.svg";
  import Graphql from "../../../../static/svg/byoc/apitype/graphql.svg";

  import Nodejs from "../../../../static/svg/byoc/api/nodejs.svg";
  import Rust from "../../../../static/svg/byoc/api/rust.svg";
  import Java from "../../../../static/svg/byoc/api/java.svg";

  import Postgresql from "../../../../static/svg/byoc/database/postgresql.svg";
  import Mysql from "../../../../static/svg/byoc/database/mysql.svg";
  import Mongodb from "../../../../static/svg/byoc/database/mongodb.svg";

  const signUpSuccessful = async (_, form: HTMLFormElement) => {
    form.reset();
    form.style.setProperty("--success", "visible");
  };

  const curriculumToComponents = {
    react: React,
    svelte: Svelte,
    vue: Vue,
    angular: Angular,
    chakraui: Chakraui,
    css: Css,
    styledcomponents: Styledcomponents,
    tailwind: Tailwind,
    rest: Rest,
    graphql: Graphql,
    nodejs: Nodejs,
    rust: Rust,
    java: Java,
    postgresql: Postgresql,
    mysql: Mysql,
    mongodb: Mongodb,
  };

  const curriculum: {
    web?: string;
    styles?: string;
    apitype?: string;
    api?: string;
    database?: string;
  } = {};

  let sectionToShow: "web" | "styles" | "apitype" | "api" | "database";
  $: sectionToShow = !curriculum.web
    ? "web"
    : !curriculum.styles
    ? "styles"
    : !curriculum.apitype
    ? "apitype"
    : !curriculum.api
    ? "api"
    : !curriculum.database
    ? "database"
    : "completed";

  let curriculumId: string;
  let isCurriculumSubmitted = false;
  $: if (sectionToShow === "completed" && !isCurriculumSubmitted) {
    isCurriculumSubmitted = true;
    fetch("/api/curriculum", {
      body: JSON.stringify(curriculum),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((res) => res.json())
      .then((body) => {
        curriculumId = body.curriculumId;
      });
  }
</script>

<style>
  form {
    --success: hidden;
  }
</style>

<div class="min-h-[15rem]">
  {#if sectionToShow === "web"}
    <div class="pt-2">
      <p class="max-w-3xl text-lg font-semibold leading-7 text-gray-500">
        1. Select a web framework
      </p>
      <div class="flex justify-start space-x-2">
        <img
          src="{React}"
          alt="React logo"
          class="w-20 h-20 cursor-pointer"
          on:click="{() => (curriculum.web = 'react')}"
        />
        <img
          src="{Svelte}"
          alt="Svelte logo"
          class="w-20 h-20 cursor-pointer"
          on:click="{() => (curriculum.web = 'svelte')}"
        />
        <img
          src="{Vue}"
          alt="Vue logo"
          class="w-20 h-20 cursor-pointer"
          on:click="{() => (curriculum.web = 'vue')}"
        />
        <img
          src="{Angular}"
          alt="Angular logo"
          class="w-20 h-20 cursor-pointer"
          on:click="{() => (curriculum.web = 'angular')}"
        />
      </div>
    </div>
  {/if}

  {#if sectionToShow === "styles"}
    <div class="pt-2">
      <p class="max-w-3xl text-lg font-semibold leading-7 text-gray-500">
        2. Select a type of styling
      </p>
      <div class="flex justify-start space-x-2">
        <img
          src="{Css}"
          alt="CSS logo"
          class="w-20 h-20 cursor-pointer"
          on:click="{() => (curriculum.styles = 'css')}"
        />
        <img
          src="{Tailwind}"
          alt="Tailwind CSS logo"
          class="w-20 h-20 cursor-pointer"
          on:click="{() => (curriculum.styles = 'tailwind')}"
        />
        <img
          src="{Styledcomponents}"
          alt="styled-components logo"
          class="w-20 h-20 cursor-pointer"
          on:click="{() => (curriculum.styles = 'styledcomponents')}"
        />
        <img
          src="{Chakraui}"
          alt="Chakra UI logo"
          class="w-20 h-20 cursor-pointer"
          on:click="{() => (curriculum.styles = 'chakraui')}"
        />
      </div>
    </div>
  {/if}

  {#if sectionToShow === "apitype"}
    <div class="pt-2">
      <p class="max-w-3xl text-lg font-semibold leading-7 text-gray-500">
        3. Select an API type
      </p>
      <div class="flex justify-start space-x-2">
        <img
          src="{Rest}"
          alt="REST text"
          class="w-20 h-20 cursor-pointer"
          on:click="{() => (curriculum.apitype = 'rest')}"
        />
        <img
          src="{Graphql}"
          alt="GraphQL logo"
          class="w-20 h-20 cursor-pointer"
          on:click="{() => (curriculum.apitype = 'graphql')}"
        />
      </div>
    </div>
  {/if}

  {#if sectionToShow === "api"}
    <div class="pt-2">
      <p class="max-w-3xl text-lg font-semibold leading-7 text-gray-500">
        4. Select an API framework
      </p>
      <div class="flex justify-start space-x-2">
        <img
          src="{Nodejs}"
          alt="Node.js logo"
          class="w-20 h-20 cursor-pointer"
          on:click="{() => (curriculum.api = 'nodejs')}"
        />
        <img
          src="{Rust}"
          alt="Rust logo"
          class="w-20 h-20 cursor-pointer"
          on:click="{() => (curriculum.api = 'rust')}"
        />
        <img
          src="{Java}"
          alt="Java logo"
          class="w-20 h-20 cursor-pointer"
          on:click="{() => (curriculum.api = 'java')}"
        />
      </div>
    </div>
  {/if}

  {#if sectionToShow === "database"}
    <div class="pt-2">
      <p class="max-w-3xl text-lg font-semibold leading-7 text-gray-500">
        5. Select a database
      </p>
      <div class="flex justify-start space-x-2">
        <img
          src="{Postgresql}"
          alt="PostgreSQL logo"
          class="w-20 h-20 cursor-pointer"
          on:click="{() => (curriculum.database = 'postgresql')}"
        />
        <img
          src="{Mysql}"
          alt="MySQL logo"
          class="w-20 h-20 cursor-pointer"
          on:click="{() => (curriculum.database = 'mysql')}"
        />
        <img
          src="{Mongodb}"
          alt="MongoDB logo"
          class="w-20 h-20 cursor-pointer"
          on:click="{() => (curriculum.database = 'mongodb')}"
        />
      </div>
    </div>
  {/if}

  {#if sectionToShow === "completed"}
    <div class="pt-2">
      <p class="max-w-3xl text-lg font-semibold leading-7 text-gray-500">
        🎉 That's it
      </p>
      <p class="mt-4">
        Thank you. Please provide your email address if you would like to get
        notified when your course is available.
      </p>
      <form
        action="/api/sign-up.json"
        method="post"
        use:enhance="{{
          result: signUpSuccessful,
        }}"
        class="mt-12"
      >
        <div class="sm:max-w-lg sm:w-full sm:flex">
          <div class="min-w-0 flex-1">
            <input type="hidden" name="curriculumId" value="{curriculumId}" />
            <label for="hero-email" class="sr-only">Email address</label>
            <input
              id="hero-email"
              type="email"
              name="email"
              class="block w-full border border-gray-300 rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-rose-500 focus:ring-rose-500"
              placeholder="Enter your email"
            />
          </div>
          <div class="mt-4 sm:mt-0 sm:ml-3">
            <button
              type="submit"
              class="block w-full rounded-md border border-transparent px-5 py-3 bg-rose-500 text-base font-medium text-black shadow hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:px-10"
              >Notify me</button
            >
          </div>
        </div>
        <div class="mt-4 text-gray-900" style="visibility: var(--success);">
          <p>Thank you, we will send you updates.</p>
        </div>
      </form>
    </div>
  {/if}
</div>

<div>
  <p class="mt-6 max-w-3xl text-lg leading-7 text-gray-500">Your curriculum</p>
  <div class="flex flex-wrap space-x-2 min-h-[6rem]">
    <!-- {"web":"react","styles":"nodejs","apitype":"rest"} -->
    {#each Object.values(curriculum) as selection}
      <img
        src="{curriculumToComponents[selection]}"
        alt="{selection} logo"
        class="w-20 h-20"
      />
    {/each}
  </div>
</div>
