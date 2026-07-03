import { getImage } from 'astro:assets';

const imageModules = import.meta.glob<{ default: ImageMetadata }>('../assets/images/*', {
    eager: true
});

const markdownImagePattern = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g;

export async function prepareAstryxMarkdown(markdown = '') {
    const localSources = [...markdown.matchAll(markdownImagePattern)].map((match) => match[2]).filter((source) => source.startsWith('.'));
    const sourceMap = new Map<string, string>();

    await Promise.all(
        [...new Set(localSources)].map(async (source) => {
            const fileName = source.split('/').at(-1);
            const imageModule = Object.entries(imageModules).find(([path]) => path.endsWith(`/${fileName}`));
            if (!imageModule) return;

            const optimized = await getImage({
                src: imageModule[1].default,
                width: 1200,
                format: 'webp',
                fit: 'inside'
            });
            sourceMap.set(source, optimized.src);
        })
    );

    return markdown.replace(markdownImagePattern, (match, alt: string, source: string) => {
        const resolvedSource = sourceMap.get(source);
        return resolvedSource ? `![${alt}](${resolvedSource})` : match;
    });
}
