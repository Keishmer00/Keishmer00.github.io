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
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          es: 'es',
        },
      },
      changefreq: 'weekly',
      lastmod: new Date(),
      priority: 0.7,
      serialize: (item) => {
        if (item.url === 'https://keishmerstudio.com/' || item.url === 'https://keishmerstudio.com/es/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/projects/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/contact/')) {
          item.priority = 0.9;
          item.changefreq = 'monthly';
        } else {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
});

