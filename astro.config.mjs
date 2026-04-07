// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'http://172.188.219.55:30080',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx(), react()]
});