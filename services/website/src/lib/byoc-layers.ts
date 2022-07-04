export type Module = {
  description: string;
  id: string;
  name: string;
  status?: string;
};

export type Layer = {
  id: "web" | "styles" | "apitype" | "api" | "database";
  modules: Module[];
  title: string;
};

export type Layers = {
  web: Layer;
  styles: Layer;
  apitype: Layer;
  api: Layer;
  database: Layer;
};

export const layers: Layers = {
  web: {
    id: "web",
    title: "Web & API framework",
    modules: [
      {
        description: "Use Angular to develop the course's web frontend.",
        id: "angular",
        name: "Angular",
        status: "Coming soon",
      },
      {
        description: "Use NextJS to develop the course's web frontend.",
        id: "nextjs",
        name: "NextJS",
        status: "Coming soon",
      },
      {
        description: "Use NuxtJS to develop the course's web frontend.",
        id: "nuxtjs",
        name: "NuxtJS",
        status: "Coming soon",
      },
      {
        description: "Use React to develop the course's web frontend.",
        id: "react",
        name: "React",
        status: "Coming soon",
      },
      {
        description: "Use Svelte to develop the course's web frontend.",
        id: "svelte",
        name: "Svelte",
        status: "Coming soon",
      },
      {
        description: "Use SvelteKit to develop the course's web frontend.",
        id: "sveltekit",
        name: "SvelteKit",
      },
      {
        description: "Use Vue.js to develop the course's web frontend.",
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
        description: "Use Bootstrap to style the web application.",
        id: "bootstrap",
        name: "Bootstrap",
        status: "Coming soon",
      },
      {
        description: "Use Chakra UI to style the web application.",
        id: "chakraui",
        name: "Chakra UI",
        status: "Coming soon",
      },
      {
        description: "Use CSS to style the web application.",
        id: "css",
        name: "CSS",
      },
      {
        description: "Use styled components to style the web application.",
        id: "styledcomponents",
        name: "styled components",
        status: "Coming soon",
      },
      {
        description: "Use Tailwind CSS to style the web application.",
        id: "tailwind",
        name: "Tailwind CSS",
        status: "Coming soon",
      },
      {
        description: "Use UnoCSS to style the web application.",
        id: "unocss",
        name: "UnoCSS",
        status: "Coming soon",
      },
      {
        description: "Use Windi CSS to style the web application.",
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
          "Use GraphQL to communicate between the frontend and the API.",
        id: "graphql",
        name: "GraphQL",
        status: "Coming soon",
      },
      {
        description:
          "Use REST to communicate between the frontend and the API.",
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
        description: "Use Go to develop the API.",
        id: "go",
        name: "Go",
        status: "Coming soon",
      },
      {
        description: "Use Java to develop the API.",
        id: "java",
        name: "Java",
        status: "Coming soon",
      },
      {
        description: "Use NextJS to develop the API.",
        id: "nextjs",
        name: "NextJS",
        status: "Coming soon",
      },
      {
        description: "Use Node.js to develop the API.",
        id: "nodejs",
        name: "Node.js",
        status: "Coming soon",
      },
      {
        description: "Use NuxtJS to develop the API.",
        id: "nuxtjs",
        name: "NuxtJS",
        status: "Coming soon",
      },
      {
        description: "Use Rust to develop the API.",
        id: "rust",
        name: "Rust",
        status: "Coming soon",
      },
      {
        description: "Use SvelteKit to develop the API.",
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
        description: "Use Mongo DB to persist data.",
        id: "mongodb",
        name: "Mongo DB",
        status: "Coming soon",
      },
      {
        description: "Use MySQL to persist data.",
        id: "mysql",
        name: "MySQL",
        status: "Coming soon",
      },
      {
        description: "Use PlanetScale to persist data.",
        id: "planetscale",
        name: "PlanetScale",
        status: "Coming soon",
      },
      {
        description: "Use PostgreSQL to persist data.",
        id: "postgresql",
        name: "PostgreSQL",
      },
    ],
  },
};
