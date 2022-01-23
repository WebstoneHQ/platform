<script lang="ts">
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { enhance } from "$lib/actions/form";
  import { contextKeyCurriculum } from "$lib/context-keys";

  import Module from "$lib/components/byoc/module.svelte";
  import Section from "$lib/components/byoc/section.svelte";

  const signUpSuccessful = async (_, form: HTMLFormElement) => {
    form.reset();
    form.style.setProperty("--success", "visible");
  };

  const curriculum: {
    web?: string;
    styles?: string;
    apitype?: string;
    api?: string;
    database?: string;
  } = writable({});
  setContext(contextKeyCurriculum, curriculum);

  let sectionToShow: "web" | "styles" | "apitype" | "api" | "database";
  $: sectionToShow = !$curriculum.web
    ? "web"
    : !$curriculum.styles
    ? "styles"
    : !$curriculum.apitype
    ? "apitype"
    : !$curriculum.api
    ? "api"
    : !$curriculum.database
    ? "database"
    : "completed";

  let curriculumId: string;
  let isCurriculumSubmitted = false;
  $: if (sectionToShow === "completed" && !isCurriculumSubmitted) {
    isCurriculumSubmitted = true;
    fetch("/api/curriculum", {
      body: JSON.stringify($curriculum),
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

  const curriculumConfiguration = {
    /* TODO: Generate this based on the available course modules in the private https://github.com/WebstoneHQ/courses repo */
    web: {
      angular: {
        styles: {
          css: {},
          tailwind: {},
        },
        apitype: {
          graphql: {
            api: {
              java: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
              nodejs: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
              rust: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
            },
          },
          rest: {
            api: {
              java: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
              nodejs: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
              rust: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
            },
          },
        },
      },
      nextjs: {
        styles: {
          chakraui: {},
          css: {},
          styledcomponents: {},
          tailwind: {},
        },
        apitype: {
          graphql: {
            api: {
              nextjs: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
            },
          },
          rest: {
            api: {
              nextjs: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
            },
          },
        },
      },
      react: {
        styles: {
          chakraui: {},
          css: {},
          styledcomponents: {},
          tailwind: {},
        },
        apitype: {
          graphql: {
            api: {
              java: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
              nodejs: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
              rust: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
            },
          },
          rest: {
            api: {
              java: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
              nodejs: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
              rust: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
            },
          },
        },
      },
      svelte: {
        styles: {
          css: {},
          tailwind: {},
        },
        apitype: {
          graphql: {
            api: {
              java: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
              nodejs: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
              rust: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
            },
          },
          rest: {
            api: {
              java: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
              nodejs: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
              rust: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
            },
          },
        },
      },
      sveltekit: {
        styles: {
          css: {},
          tailwind: {},
        },
        apitype: {
          graphql: {
            api: {
              sveltekit: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
            },
          },
          rest: {
            api: {
              sveltekit: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
            },
          },
        },
      },
      vue: {
        styles: {
          css: {},
          tailwind: {},
        },
        apitype: {
          graphql: {
            api: {
              java: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
              nodejs: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
              rust: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
            },
          },
          rest: {
            api: {
              java: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
              nodejs: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
              rust: {
                database: {
                  mongodb: {},
                  mysql: {},
                  postgresql: {},
                },
              },
            },
          },
        },
      },
    },
  };
</script>

<style>
  form {
    --success: hidden;
  }
</style>

<div class="min-h-[15rem]">
  {#if sectionToShow === "web"}
    <Section title="1. Select a web framework">
      {#each Object.keys(curriculumConfiguration.web) as name}
        <Module layer="web" name="{name}" />
      {/each}
    </Section>
  {/if}

  {#if sectionToShow === "styles"}
    <Section title="2. Select a type of styling">
      {#each Object.keys(curriculumConfiguration.web[$curriculum.web].styles) as name}
        <Module layer="styles" name="{name}" />
      {/each}
    </Section>
  {/if}

  {#if sectionToShow === "apitype"}
    <Section title="2. Select a type of styling">
      {#each Object.keys(curriculumConfiguration.web[$curriculum.web].apitype) as name}
        <Module layer="apitype" name="{name}" />
      {/each}
    </Section>
  {/if}

  {#if sectionToShow === "api"}
    <Section title="4. Select an API framework">
      {#each Object.keys(curriculumConfiguration.web[$curriculum.web].apitype[$curriculum.apitype].api) as name}
        <Module layer="api" name="{name}" />
      {/each}
    </Section>
  {/if}

  {#if sectionToShow === "database"}
    <Section title="5. Select a database">
      {#each Object.keys(curriculumConfiguration.web[$curriculum.web].apitype[$curriculum.apitype].api[$curriculum.api].database) as name}
        <Module layer="database" name="{name}" />
      {/each}
    </Section>
  {/if}

  {#if sectionToShow === "completed"}
    <div class="pt-2">
      <p class="max-w-3xl text-lg font-semibold leading-7 text-gray-500">
        🎉 That's it
      </p>
      <p class="mt-4 max-w-3xl text-lg leading-7 text-gray-500">
        Thank you. Please provide your email address to qualify for the <strong
          >early adopter pricing</strong
        > and to get notified when your course is available.
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

<div class="min-h-[8rem]">
  {#if $curriculum.web}
    <p class="mt-6 max-w-3xl text-lg leading-7 text-gray-500">
      Your curriculum
    </p>
    <div class="flex flex-wrap space-x-2">
      <!-- {"web":"react","styles":"nodejs","apitype":"rest"} -->
      {#each Object.entries($curriculum) as [layer, name]}
        <Module layer="{layer}" name="{name}" readOnly />
      {/each}
    </div>
  {/if}
</div>
