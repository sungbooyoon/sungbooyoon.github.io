import { Badge } from '@astryxdesign/core/Badge';
import { Lightbox, type LightboxMedia } from '@astryxdesign/core/Lightbox';
import { Markdown } from '@astryxdesign/core/Markdown';
import type { MarkdownInlinePlugin, MarkdownSource } from '@astryxdesign/core/Markdown';
import { Outline, parseOutlineFromMarkdown } from '@astryxdesign/core/Outline';
import { Selector } from '@astryxdesign/core/Selector';
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
    pattern: /\{\{badge:(Best Paper|Editor's Choice|Invited)\}\}/g,
    render: (match, key) => (
        <Badge
            key={key}
            label={match[1]}
            variant={match[1] === 'Best Paper' ? 'orange' : match[1] === "Editor's Choice" ? 'purple' : 'blue'}
        />
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
    const [mobileOutlineId, setMobileOutlineId] = useState(items[0]?.id ?? '');
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    useEffect(() => {
        const headings = contentRef.current?.querySelectorAll('h1,h2,h3,h4,h5,h6');
        headings?.forEach((heading, index) => {
            const item = items[index];
            if (item) heading.id = item.id;
        });
        setIsOutlineReady(true);
    }, [items]);

    const navigateToOutline = (id: string) => {
        setMobileOutlineId(id);
        const target = document.getElementById(id);
        if (!target) return;
        window.history.replaceState(null, '', `#${id}`);
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    useEffect(() => {
        if (!enableLightbox || !contentRef.current) return;

        const root = contentRef.current;
        const images = [...root.querySelectorAll<HTMLImageElement>('img')];
        const openImage = (image: HTMLImageElement) => {
            const imageIndex = images.indexOf(image);
            if (imageIndex < 0) return;
            setLightboxIndex(imageIndex);
            setIsLightboxOpen(true);
        };
        const handleClick = (event: MouseEvent) => {
            if (event.target instanceof HTMLImageElement && event.target.classList.contains('markdown-lightbox-image')) {
                openImage(event.target);
            }
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                event.target instanceof HTMLImageElement &&
                event.target.classList.contains('markdown-lightbox-image') &&
                (event.key === 'Enter' || event.key === ' ')
            ) {
                event.preventDefault();
                openImage(event.target);
            }
        };

        images.forEach((image) => {
            image.classList.add('markdown-lightbox-image');
            image.tabIndex = 0;
            image.setAttribute('role', 'button');
            image.setAttribute('aria-label', `Open image: ${image.alt || 'Project image'}`);
        });
        root.addEventListener('click', handleClick);
        root.addEventListener('keydown', handleKeyDown);

        return () => {
            root.removeEventListener('click', handleClick);
            root.removeEventListener('keydown', handleKeyDown);
        };
    }, [content, enableLightbox]);

    return (
        <>
            {isOutlineReady && items.length > 0 && (
                <div className="document-outline-mobile">
                    <Selector
                        label="On this page"
                        isLabelHidden
                        options={items.map((item) => ({ value: item.id, label: item.label }))}
                        value={mobileOutlineId || items[0]?.id}
                        onChange={navigateToOutline}
                        size="sm"
                        width="100%"
                    />
                </div>
            )}
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
                                inlinePlugins={[awardBadgePlugin]}
                                sources={sources}
                            >
                                {section.content}
                            </Markdown>
                        );

                        return section.sectionIndex == null ? (
                            <div key={`preamble-${index}`}>{markdown}</div>
                        ) : (
                            <div
                                key={`section-${section.sectionIndex}`}
                                className={`document-section${section.sectionIndex > 0 ? ' document-section-divided' : ''}`}
                            >
                                {markdown}
                            </div>
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
