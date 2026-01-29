// 1. Import utilities from `astro:content`
import { defineCollection } from "astro:content";

// 2. Import loader
import { file } from "astro/loaders";

// 3. Import Zod
import { z } from "astro/zod";

// 4. Define schemas for each collection

// Portfolio schema - individual portfolio object
const portfolioSchema = z.object({
  id: z.string(),
  categories: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      items: z.array(
        z.object({
          type: z.enum(["video", "photo", "design", "motion"]),
          src: z.string(),
          category: z.string(),
          title: z.string(),
          description: z.string(),
          tech: z.array(z.string()),
          isImagePreview: z.boolean().optional(),
        }),
      ),
    }),
  ),
});

// Services schema - individual service object (file loader parses array automatically)
const servicesSchema = z.object({
  id: z.string(),
  number: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  reverse: z.boolean(),
  features: z.array(z.string()),
  caseStudy: z.object({
    problem: z.string(),
    process: z.string(),
    result: z.string(),
  }),
  cta: z.object({
    text: z.string(),
    link: z.string(),
  }),
  visual: z.array(
    z.object({
      src: z.string(),
      alt: z.string(),
      style: z.string().optional(),
    }),
  ),
});

// Testimonials schema - individual testimonial object
const testimonialsSchema = z.object({
  id: z.string(),
  testimonials: z.array(
    z.object({
      name: z.string(),
      designation: z.string(),
      content: z.string(),
      rating: z.number().min(1).max(5),
    }),
  ),
});

// 5. Define collections
const portfolio = defineCollection({
  loader: file("src/data/portfolio.json"),
  schema: portfolioSchema,
});

const services = defineCollection({
  loader: file("src/data/services.json"),
  schema: servicesSchema,
});

const testimonials = defineCollection({
  loader: file("src/data/testimonials.json"),
  schema: testimonialsSchema,
});

// 6. Export collections
export const collections = { portfolio, services, testimonials };
