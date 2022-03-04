import { clientPlugin, defineConfig } from '@vitebook/client/node';
import { svelteMarkdownPlugin } from '@vitebook/markdown-svelte/node';
import { defaultThemePlugin, DefaultThemeConfig } from '@vitebook/theme-default/node';

export default defineConfig<DefaultThemeConfig>({
  include: ['src/**/*.md', 'src/**/*.story.svelte'],
  plugins: [
    svelteMarkdownPlugin(),
    clientPlugin({ appFile: 'App.svelte' }),
    defaultThemePlugin(),
  ],
  site: {
    description: 'Documentation for Webstone Education.',
    // locales: {
    //   "/": {
    //     lang: "en-US",
    //     langLabel: "English",
    //   },
    // },
    theme: {
      markdown: {
        lastUpdated: true,
        nextLink: true,
        prevLink: true,
        toc: true,
      },
      // navbar: {
      //   languageMenu: {
      //     selectLanguageText: "Languages",
      //     selectLanguageAriaLabel: "Pick a language"
      //   },
      // },
      remoteGitRepo: {
        label: "Webstone on GitHub",
        url: "WebstoneHQ/platform"
      },
      sidebar: {
        categories: true,
        style: "docs",
      },
      socials: {
        discord: {
          label: "Webstone on Discord",
          link: "https://discord.gg/dt583vtkeZ"
        },
        twitter: {
          label: "Webstone on Twitter",
          link: "https://twitter.com/webstonehq"
        }
      }
    },
    title: 'Webstone Education',
  },
  vite: {
    server: {
      hmr: {
        clientPort: process.env.GITPOD_WORKSPACE_URL ? 443 : 8080,
        host: process.env.GITPOD_WORKSPACE_URL
          ? process.env.GITPOD_WORKSPACE_URL.replace("https://", "8080-")
          : "localhost",
      },
    },
  },
});
