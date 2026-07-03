import { Markdown } from '@astryxdesign/core/Markdown';
import { HStack, VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import type { ReactNode } from 'react';

type PageStackProps = {
    children: ReactNode;
};

type PageHeaderProps = {
    title: string;
    description?: string;
    meta?: string;
};

type ArticleActionsProps = {
    children: ReactNode;
    align?: 'start' | 'end' | 'between';
};

export function PageStack({ children }: PageStackProps) {
    return (
        <VStack width="100%" gap={10}>
            {children}
        </VStack>
    );
}

export function PageHeader({ title, description, meta }: PageHeaderProps) {
    return (
        <VStack as="header" width="100%" gap={3}>
            <Heading level={1} type="display-2">
                {title}
            </Heading>
            {description && (
                <Text as="p" type="large" color="secondary">
                    {description}
                </Text>
            )}
            {meta && (
                <Text as="p" type="supporting" color="secondary">
                    {meta}
                </Text>
            )}
        </VStack>
    );
}

export function ArticleSurface({ children }: PageStackProps) {
    return (
        <VStack as="article" width="100%" gap={8}>
            {children}
        </VStack>
    );
}

export function MarkdownBody({ content }: { content: string }) {
    return (
        <Markdown contentWidth={680} contentAlign="start" density="default" headingLevelStart={1} autolink="gfm">
            {content}
        </Markdown>
    );
}

export function ArticleActions({ children, align = 'between' }: ArticleActionsProps) {
    return (
        <HStack as="footer" width="100%" gap={4} wrap="wrap" hAlign={align} vAlign="center">
            {children}
        </HStack>
    );
}
