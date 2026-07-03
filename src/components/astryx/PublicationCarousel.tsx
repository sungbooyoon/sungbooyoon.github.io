import { Button } from '@astryxdesign/core/Button';
import { Carousel } from '@astryxdesign/core/Carousel';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { Icon } from '@astryxdesign/core/Icon';
import { HStack, StackItem, VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';

type PublicationEntry = {
    title: string;
    venue: string;
    year: number;
    doi: string;
};

type PublicationCarouselProps = {
    entries: PublicationEntry[];
};

export default function PublicationCarousel({ entries }: PublicationCarouselProps) {
    return (
        <VStack as="section" width="100%" gap={4}>
            <HStack width="100%" hAlign="between" vAlign="center" gap={4}>
                <Heading level={2} type="display-3">
                    Selected publications
                </Heading>
                <Button label="View all publications" href="/publications" variant="secondary" size="md" />
            </HStack>
            <Carousel aria-label="Selected publications" gap={3} hasSnap>
                {entries.map((entry) => (
                    <ClickableCard
                        key={entry.doi}
                        label={`Open publication: ${entry.title}`}
                        href={entry.doi}
                        target="_blank"
                        variant="muted"
                        padding={4}
                        width={320}
                        height={240}
                    >
                        <VStack height="100%" gap={3}>
                            <Heading level={3} maxLines={4}>
                                {entry.title}
                            </Heading>
                            <StackItem size="fill">
                                <Text as="p" type="body" color="secondary">
                                    {entry.venue} · {entry.year}
                                </Text>
                            </StackItem>
                            <HStack gap={1} vAlign="center">
                                <Text type="supporting" weight="medium">
                                    Open DOI
                                </Text>
                                <Icon icon="externalLink" size="sm" color="inherit" />
                            </HStack>
                        </VStack>
                    </ClickableCard>
                ))}
            </Carousel>
        </VStack>
    );
}
