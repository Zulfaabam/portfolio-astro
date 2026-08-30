import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob, file } from "astro/loaders";

const home = defineCollection({
  loader: glob({ base: "./src/content/home", pattern: "home.md" }),
  schema: z.object({
    intro: z.string(),

    miniJourneys: z.array(
      z.object({
        id: z.number(),
        job: z.string(),
        place: z.string(),
        year: z.string(),
      }),
    ),

    featuredProjects: z.array(
      z.object({
        id: z.number(),
        title: z.string(),
        repository: z.string(),
        demo: z.string(),
        thumbnail: z.string(),
      }),
    ),
  }),
});

const projects = defineCollection({
  // loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),

    featured: z.boolean().default(false),

    technologies: z.array(z.string()),

    github: z.url().optional(),
    demo: z.url().optional(),

    thumbnail: z.string(),

    order: z.number().default(999),
  }),
});

const journey = defineCollection({
  loader: glob({ base: "./src/content/journey", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    start: z.coerce.date(),
    end: z.coerce.date().optional().nullable(),

    location: z.string(),
    technologies: z.array(z.string()),

    summary: z.string(),
  }),
});

const blog = defineCollection({
  // loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),

    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  home,
  projects,
  journey,
  blog,
};
