import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const site = process.env.PUBLIC_SITE_URL ?? 'https://sibasurya.com';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // /news/ and /careers/ currently contain editorial/HR drafts marked
      // noindex. Exclude them from the sitemap until officially verified.
      filter: (page) =>
        !page.includes('/en/') &&
        !page.includes('/404') &&
        !page.includes('/news/') &&
        !page.includes('/careers/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
