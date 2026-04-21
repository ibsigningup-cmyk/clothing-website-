import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const menuItemSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  order: z.number().default(0),
  tags: z.array(z.string()).optional(),
  translations: z
    .object({
      es: z.object({ title: z.string(), description: z.string().optional() }).optional(),
      it: z.object({ title: z.string(), description: z.string().optional() }).optional(),
    })
    .optional(),
});

const dolci = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/dolci' }),
  schema: menuItemSchema,
});

const salati = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/salati' }),
  schema: menuItemSchema,
});

const drinks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/drinks' }),
  schema: menuItemSchema.extend({
    category: z.enum(['coffee', 'tea', 'juice', 'cocktail', 'other']).default('other'),
  }),
});

const pasta = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pasta' }),
  schema: menuItemSchema.extend({
    day: z
      .enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'])
      .optional(),
  }),
});

const pinsa = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pinsa' }),
  schema: menuItemSchema,
});

const piadina = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/piadina' }),
  schema: menuItemSchema,
});

export const collections = { dolci, salati, drinks, pasta, pinsa, piadina };
