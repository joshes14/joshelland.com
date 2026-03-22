import { defineCollection } from "astro:content";
import { z } from "astro:schema";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const gallery = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/gallery" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z.enum(["photography", "design", "life", "projects"]),
    cover: z.string(),
    images: z.array(z.string()).optional(),
    description: z.string().optional(),
  }),
});

export const collections = { blog, gallery };
