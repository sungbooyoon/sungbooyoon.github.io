import { Markdown } from '@astryxdesign/core/Markdown';
import { Outline, parseOutlineFromMarkdown } from '@astryxdesign/core/Outline';
import { HStack, VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { useEffect, useMemo, useRef, useState } from 'react';

type OutlinedMarkdownProps = {
    content: string;
};

export default function OutlinedMarkdown({ content }: OutlinedMarkdownProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const items = useMemo(() => parseOutlineFromMarkdown(content), [content]);
    const [isOutlineReady, setIsOutlineReady] = useState(false);

    useEffect(() => {
        const headings = contentRef.current?.querySelectorAll('h1,h2,h3,h4,h5,h6');
        headings?.forEach((heading, index) => {
            const item = items[index];
            if (item) heading.id = item.id;
        });
        setIsOutlineReady(true);
    }, [items]);

    return (
        <HStack width="100%" gap={8} className="outlined-document">
            <VStack as="aside" gap={2} className="document-outline">
                <Text type="supporting" weight="semibold">
                    On this page
                </Text>
                {isOutlineReady && <Outline items={items} density="compact" label="On this page" />}
            </VStack>
            <div ref={contentRef} className="document-markdown">
                <Markdown contentWidth={680} contentAlign="start" density="default" headingLevelStart={1} autolink="gfm">
                    {content}
                </Markdown>
            </div>
        </HStack>
    );
}
