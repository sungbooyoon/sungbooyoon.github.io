import { Button } from '@astryxdesign/core/Button';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { Icon } from '@astryxdesign/core/Icon';
import { HStack, VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';

type PublicationEntry = {
    title: string;
    venue: string;
    year: number;
    doi: string;
};

type SelectedPublicationsProps = {
    entries: PublicationEntry[];
};

export default function SelectedPublications({ entries }: SelectedPublicationsProps) {
    return (
        <VStack as="section" width="100%" gap={4}>
            <HStack width="100%" hAlign="between" vAlign="center" gap={4}>
                <Heading level={2} type="display-3">
                    Selected publications
                </Heading>
                <Button label="View all publications" href="/publications" variant="ghost" size="md" />
            </HStack>
            <VStack width="100%" gap={3}>
                {entries.map((entry) => (
                    <ClickableCard
                        key={entry.doi}
                        label={`Open publication: ${entry.title}`}
                        href={entry.doi}
                        target="_blank"
                        variant="default"
                        padding={4}
                        width="100%"
                        className="selected-publication-card"
                    >
                        <VStack width="100%" gap={3}>
                            <Heading level={3}>{entry.title}</Heading>
                            <HStack width="100%" hAlign="between" vAlign="center" gap={3} wrap="wrap">
                                <Text as="p" type="supporting" color="secondary">
                                    {entry.venue} · {entry.year}
                                </Text>
                                <HStack gap={1} vAlign="center">
                                    <Text type="label">Open DOI</Text>
                                    <Icon icon="externalLink" size="sm" color="inherit" />
                                </HStack>
                            </HStack>
                        </VStack>
                    </ClickableCard>
                ))}
            </VStack>
        </VStack>
    );
}
