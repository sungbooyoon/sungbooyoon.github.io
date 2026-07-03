import { Button } from '@astryxdesign/core/Button';
import { Carousel } from '@astryxdesign/core/Carousel';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { Icon } from '@astryxdesign/core/Icon';
import { HStack, StackItem, VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Token } from '@astryxdesign/core/Token';

type ProjectEntry = {
    title: string;
    description?: string;
    href: string;
    isExternal?: boolean;
    tags?: string[];
};

type ProjectCarouselProps = {
    entries: ProjectEntry[];
};

export default function ProjectCarousel({ entries }: ProjectCarouselProps) {
    return (
        <VStack as="section" width="100%" gap={4}>
            <HStack width="100%" hAlign="between" vAlign="center" gap={4}>
                <Heading level={2} type="display-3">
                    Projects
                </Heading>
                <Button label="View all projects" href="/projects" variant="secondary" size="md" />
            </HStack>
            <Carousel aria-label="Featured projects" gap={3} hasSnap>
                {entries.map((entry) => (
                    <ClickableCard
                        key={entry.href}
                        label={`Open project: ${entry.title}`}
                        href={entry.href}
                        target={entry.isExternal ? '_blank' : undefined}
                        variant="muted"
                        padding={4}
                        width={320}
                        className="project-carousel-card"
                    >
                        <VStack height="100%" gap={3}>
                            <Heading level={3}>{entry.title}</Heading>
                            {entry.description && (
                                <StackItem size="fill">
                                    <Text as="p" type="body" color="secondary">
                                        {entry.description}
                                    </Text>
                                </StackItem>
                            )}
                            {entry.tags && entry.tags.length > 0 && (
                                <HStack gap={1} wrap="wrap">
                                    {entry.tags.slice(0, 3).map((tag) => (
                                        <Token key={tag} label={tag} size="sm" />
                                    ))}
                                </HStack>
                            )}
                            <HStack gap={1} vAlign="center">
                                <Text type="supporting" weight="medium">
                                    {entry.isExternal ? 'Open external project' : 'View project'}
                                </Text>
                                <Icon icon={entry.isExternal ? 'externalLink' : 'chevronRight'} size="sm" color="inherit" />
                            </HStack>
                        </VStack>
                    </ClickableCard>
                ))}
            </Carousel>
        </VStack>
    );
}
