import { AspectRatio } from '@astryxdesign/core/AspectRatio';
import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { Grid } from '@astryxdesign/core/Grid';
import { Icon } from '@astryxdesign/core/Icon';
import { HStack, StackItem, VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';

type PublicationEntry = {
    title: string;
    venue: string;
    year: number;
    doi: string;
    imageSrc: string;
    imageAlt: string;
    badges?: readonly ('Best Paper' | "Editor's Choice" | 'Invited')[];
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
                <Button
                    label="View all publications"
                    href="/publications"
                    variant="ghost"
                    size="md"
                    endContent={<Icon icon="chevronRight" size="sm" color="inherit" />}
                />
            </HStack>
            <Grid columns={{ minWidth: 280, repeat: 'fit' }} gap={4} width="100%">
                {entries.map((entry) => (
                    <ClickableCard
                        key={entry.doi}
                        label={`Open publication: ${entry.title}`}
                        href={entry.doi}
                        target="_blank"
                        variant="default"
                        padding={0}
                        height="100%"
                        className="media-card selected-publication-card"
                    >
                        <VStack height="100%" gap={0}>
                            <AspectRatio ratio={16 / 9}>
                                <img className="media-card-image" src={entry.imageSrc} alt={entry.imageAlt} loading="lazy" />
                            </AspectRatio>
                            <VStack gap={3} height="100%" className="media-card-body">
                                {entry.badges && entry.badges.length > 0 && (
                                    <HStack gap={1} wrap="wrap">
                                        {entry.badges.map((badge) => (
                                            <Badge
                                                key={badge}
                                                label={badge}
                                                variant={badge === 'Best Paper' ? 'orange' : badge === "Editor's Choice" ? 'purple' : 'blue'}
                                            />
                                        ))}
                                    </HStack>
                                )}
                                <StackItem size="fill">
                                    <Heading level={3}>{entry.title}</Heading>
                                </StackItem>
                                <Text as="p" type="supporting" color="secondary">
                                    {entry.venue} · {entry.year}
                                </Text>
                                <HStack gap={1} vAlign="center">
                                    <Text type="label">Open DOI</Text>
                                    <Icon icon="externalLink" size="sm" color="inherit" />
                                </HStack>
                            </VStack>
                        </VStack>
                    </ClickableCard>
                ))}
            </Grid>
        </VStack>
    );
}
