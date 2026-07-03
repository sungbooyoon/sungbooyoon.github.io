import { Badge } from '@astryxdesign/core/Badge';
import { Lightbox, type LightboxMedia } from '@astryxdesign/core/Lightbox';
import { Markdown } from '@astryxdesign/core/Markdown';
import type { MarkdownComponents, MarkdownInlinePlugin, MarkdownSource } from '@astryxdesign/core/Markdown';
import { Outline, parseOutlineFromMarkdown } from '@astryxdesign/core/Outline';
import { Section } from '@astryxdesign/core/Section';
import { HStack, VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { useEffect, useMemo, useRef, useState } from 'react';

type OutlinedMarkdownProps = {
    content: string;
    enableLightbox?: boolean;
    sectioned?: boolean;
    sources?: Record<string, MarkdownSource>;
};

type MarkdownSection = {
    content: string;
    sectionIndex?: number;
};

const markdownImagePattern = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g;

const awardBadgePlugin: MarkdownInlinePlugin = {
    pattern: /\{\{badge:(Best Paper|Editor's Choice)\}\}/g,
    render: (match, key) => (
        <Badge key={key} label={match[1]} variant={match[1] === 'Best Paper' ? 'orange' : 'purple'} />
    )
};

function splitMarkdownSections(content: string): MarkdownSection[] {
    const matches = [...content.matchAll(/^##\s+/gm)];
    if (matches.length === 0) return [{ content }];

    const sections: MarkdownSection[] = [];
    const firstHeadingIndex = matches[0].index ?? 0;
    const preamble = content.slice(0, firstHeadingIndex).trim();
    if (preamble) sections.push({ content: preamble });

    matches.forEach((match, sectionIndex) => {
        const start = match.index ?? 0;
        const end = matches[sectionIndex + 1]?.index ?? content.length;
        sections.push({ content: content.slice(start, end).trim(), sectionIndex });
    });

    return sections;
}

export default function OutlinedMarkdown({ content, enableLightbox = false, sectioned = false, sources }: OutlinedMarkdownProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const items = useMemo(() => parseOutlineFromMarkdown(content), [content]);
    const sections = useMemo(() => (sectioned ? splitMarkdownSections(content) : [{ content }]), [content, sectioned]);
    const lightboxMedia = useMemo<LightboxMedia[]>(
        () =>
            [...content.matchAll(markdownImagePattern)].map((match) => ({
                alt: match[1] || 'Project image',
                caption: match[1] || undefined,
                src: match[2]
            })),
        [content]
    );
    const [isOutlineReady, setIsOutlineReady] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const lightboxImage = useMemo<NonNullable<MarkdownComponents['image']>>(
        () =>
            function MarkdownLightboxImage({ src, alt }) {
                const mediaIndex = lightboxMedia.findIndex((item) => item.src === src && item.alt === alt);

                return (
                    <button
                        type="button"
                        className="markdown-lightbox-trigger"
                        aria-label={`Open image: ${alt || 'Project image'}`}
                        onClick={() => {
                            setLightboxIndex(Math.max(0, mediaIndex));
                            setIsLightboxOpen(true);
                        }}
                    >
                        <img src={src} alt={alt} loading="lazy" />
                    </button>
                );
            },
        [lightboxMedia]
    );

    const markdownComponents = useMemo<Partial<MarkdownComponents> | undefined>(
        () => (enableLightbox ? { image: lightboxImage } : undefined),
        [enableLightbox, lightboxImage]
    );

    useEffect(() => {
        const headings = contentRef.current?.querySelectorAll('h1,h2,h3,h4,h5,h6');
        headings?.forEach((heading, index) => {
            const item = items[index];
            if (item) heading.id = item.id;
        });
        setIsOutlineReady(true);
    }, [items]);

    return (
        <>
            <HStack width="100%" gap={8} className="outlined-document">
                <div ref={contentRef} className="document-markdown">
                    {sections.map((section, index) => {
                        const markdown = (
                            <Markdown
                                contentWidth={680}
                                contentAlign="start"
                                density="default"
                                headingLevelStart={1}
                                autolink="gfm"
                                components={markdownComponents}
                                inlinePlugins={[awardBadgePlugin]}
                                sources={sources}
                            >
                                {section.content}
                            </Markdown>
                        );

                        return section.sectionIndex == null ? (
                            <div key={`preamble-${index}`}>{markdown}</div>
                        ) : (
                            <Section
                                key={`section-${section.sectionIndex}`}
                                variant="transparent"
                                padding={0}
                                paddingBlock={6}
                                dividers={section.sectionIndex > 0 ? ['top'] : undefined}
                                width="100%"
                            >
                                {markdown}
                            </Section>
                        );
                    })}
                </div>
                <VStack as="aside" gap={2} className="document-outline">
                    <Text type="label">On this page</Text>
                    {isOutlineReady && <Outline items={items} density="compact" label="On this page" />}
                </VStack>
            </HStack>
            {enableLightbox && lightboxMedia.length > 0 && (
                <Lightbox
                    isOpen={isLightboxOpen}
                    onOpenChange={setIsLightboxOpen}
                    media={lightboxMedia}
                    index={lightboxIndex}
                    onIndexChange={setLightboxIndex}
                    hasZoom
                />
            )}
        </>
    );
}
