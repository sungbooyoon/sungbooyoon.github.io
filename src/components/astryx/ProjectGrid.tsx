import { AspectRatio } from '@astryxdesign/core/AspectRatio';
import { Badge } from '@astryxdesign/core/Badge';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { Grid } from '@astryxdesign/core/Grid';
import { Icon } from '@astryxdesign/core/Icon';
import { HStack, StackItem, VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Token } from '@astryxdesign/core/Token';
import { slugify } from '../../utils/common-utils';

export type ProjectGridEntry = {
    title: string;
    description?: string;
    href: string;
    imageSrc: string;
    imageAlt: string;
    isExternal?: boolean;
    status: 'Active' | 'Completed';
    tags: string[];
};

type ProjectGridProps = {
    entries: ProjectGridEntry[];
};

export default function ProjectGrid({ entries }: ProjectGridProps) {
    return (
        <Grid columns={{ minWidth: 280, repeat: 'fit' }} gap={4} width="100%">
            {entries.map((entry) => (
                <ClickableCard
                    key={entry.href}
                    label={`Open project: ${entry.title}`}
                    href={entry.href}
                    target={entry.isExternal ? '_blank' : undefined}
                    variant="default"
                    padding={0}
                    height="100%"
                    className="media-card"
                >
                    <VStack height="100%" gap={0}>
                        <AspectRatio ratio={16 / 9}>
                            <img className="media-card-image" src={entry.imageSrc} alt={entry.imageAlt} loading="lazy" />
                        </AspectRatio>
                        <VStack gap={3} height="100%" className="media-card-body">
                            <HStack gap={2} hAlign="between" vAlign="start">
                                <Heading level={2}>{entry.title}</Heading>
                                <HStack gap={1} wrap="wrap" hAlign="end">
                                    {entry.isExternal && (
                                        <Badge label="External" variant="blue" icon={<Icon icon="externalLink" size="sm" color="inherit" />} />
                                    )}
                                    <Badge label={entry.status} variant={entry.status === 'Active' ? 'success' : 'neutral'} />
                                </HStack>
                            </HStack>
                            {entry.description && (
                                <StackItem size="fill">
                                    <Text as="p" type="body" color="secondary" maxLines={4}>
                                        {entry.description}
                                    </Text>
                                </StackItem>
                            )}
                            {entry.tags.length > 0 && (
                                <HStack gap={1} wrap="wrap">
                                    {entry.tags.map((tag) => (
                                        <Token key={tag} label={tag} href={`/tags/${slugify(tag)}`} size="sm" />
                                    ))}
                                </HStack>
                            )}
                            <HStack gap={1} vAlign="center">
                                <Text type="label">{entry.isExternal ? 'Open external project' : 'View project'}</Text>
                                <Icon icon={entry.isExternal ? 'externalLink' : 'chevronRight'} size="sm" color="inherit" />
                            </HStack>
                        </VStack>
                    </VStack>
                </ClickableCard>
            ))}
        </Grid>
    );
}
