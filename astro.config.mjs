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
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});

