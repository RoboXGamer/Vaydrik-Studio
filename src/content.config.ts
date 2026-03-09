// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";

// 2. Import loader
import { file } from "astro/loaders";

// 4. Define schemas for each collection

// Portfolio schema
const portfolioSchema = ({ image }: { image: any }) =>
	z.object({
		id: z.string(),
		categories: z.array(
			z.object({
				id: z.string(),
				label: z.string(),
				items: z.array(
					z.object({
						type: z.enum(["video", "photo", "design", "motion"]),
						image: z.union([image(), z.string()]).optional(),
						video: z.string().optional(),
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

// Services schema
const servicesSchema = ({ image }: { image: any }) =>
	z.object({
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
				image: z.union([image(), z.string()]).optional(),
				video: z.string().optional(),
				alt: z.string(),
				style: z.string().optional(),
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

// 6. Export collections
export const collections = { portfolio, services };
