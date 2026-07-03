import { glob } from 'astro/loaders';
import { defineCollection, z, type ImageFunction } from 'astro:content';

const imageSchema = (image: ImageFunction) =>
    z.object({
        src: image(),
        alt: z.string().optional()
    });

const seoSchema = (image: ImageFunction) =>
    z.object({
        title: z.string().min(5).max(120).optional(),
        description: z.string().min(15).max(160).optional(),
        image: imageSchema(image).optional(),
        pageType: z.enum(['website', 'article']).default('website')
    });

const pages = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            seo: seoSchema(image).optional()
        })
});

const projects = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string().optional(),
            publishDate: z.coerce.date(),
            updatedDate: z.coerce.date(),
            isFeatured: z.boolean().default(false),
            status: z.enum(['Active', 'Completed']),
            period: z.string(),
            role: z.string(),
            cover: imageSchema(image),
            tags: z.array(z.string()).default([]),
            sources: z
                .array(
                    z.object({
                        title: z.string(),
                        url: z.string().url()
                    })
                )
                .default([]),
            externalUrl: z.string().optional(),
            seo: seoSchema(image).optional()
        })
});

export const collections = { pages, projects };
