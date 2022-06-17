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
        name: "CSS",
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
        status: "Coming soon",
      },
      {
        description:
          "TODO: Description text for this framework or technology to help provide context.",
        id: "unocss",
        name: "UnoCSS",
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
