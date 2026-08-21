// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel"; 
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
 output: 'server',
  adapter: vercel(),
  site: "https://keishmerstudio.com",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
   sitemap({
      filter: (page) => !/[\/]((es)[/])?visual-artist[/]?$/.test(new URL(page).pathname),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          es: 'es',
        },
      },
    }),
  ],
});

