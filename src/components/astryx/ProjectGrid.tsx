import { AspectRatio } from '@astryxdesign/core/AspectRatio';
import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { Grid } from '@astryxdesign/core/Grid';
import { Icon } from '@astryxdesign/core/Icon';
import { Selector } from '@astryxdesign/core/Selector';
import { HStack, StackItem, VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { TextInput } from '@astryxdesign/core/TextInput';
import { Token } from '@astryxdesign/core/Token';
import { useMemo, useState } from 'react';
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
    endDate: string;
};

type ProjectGridProps = {
    entries: ProjectGridEntry[];
};

export default function ProjectGrid({ entries }: ProjectGridProps) {
    const [query, setQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('All');
    const [sort, setSort] = useState('newest');
    const tags = useMemo(() => [...new Set(entries.flatMap((entry) => entry.tags))].sort((a, b) => a.localeCompare(b)), [entries]);
    const filteredEntries = useMemo(() => {
        const normalizedQuery = query.trim().toLocaleLowerCase();
        const matches = entries.filter((entry) => {
            const matchesTag = selectedTag === 'All' || entry.tags.includes(selectedTag);
            const searchableText = [entry.title, entry.description ?? '', ...entry.tags].join(' ').toLocaleLowerCase();
            return matchesTag && (!normalizedQuery || searchableText.includes(normalizedQuery));
        });

        return [...matches].sort((a, b) => {
            if (sort === 'newest') return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
            if (sort === 'title-asc') return a.title.localeCompare(b.title);
            if (sort === 'title-desc') return b.title.localeCompare(a.title);
            return 0;
        });
    }, [entries, query, selectedTag, sort]);

    return (
        <VStack width="100%" gap={5}>
            <HStack width="100%" gap={3} vAlign="end" wrap="wrap" className="project-filter-toolbar">
                <StackItem size="fill" className="project-search-field">
                    <TextInput
                        label="Search projects"
                        isLabelHidden
                        placeholder="Search projects"
                        value={query}
                        onChange={setQuery}
                        startIcon={<Icon icon="search" size="sm" color="secondary" />}
                        hasClear
                        width="100%"
                    />
                </StackItem>
                <Selector
                    label="Sort projects"
                    isLabelHidden
                    value={sort}
                    onChange={setSort}
                    options={[
                        { value: 'newest', label: 'Newest' },
                        { value: 'title-asc', label: 'A–Z' },
                        { value: 'title-desc', label: 'Z–A' }
                    ]}
                    size="md"
                    width={160}
                />
            </HStack>

            <HStack gap={1} wrap="wrap" aria-label="Filter projects by tag" className="project-tag-filters">
                {['All', ...tags].map((tag) => {
                    const isSelected = selectedTag === tag;
                    return (
                        <Button
                            key={tag}
                            label={tag}
                            variant="ghost"
                            size="md"
                            aria-pressed={isSelected}
                            className={`project-filter-button${isSelected ? ' is-selected' : ''}`}
                            onClick={() => setSelectedTag(tag)}
                        />
                    );
                })}
            </HStack>

            <Text type="supporting" color="secondary">
                {filteredEntries.length} {filteredEntries.length === 1 ? 'project' : 'projects'}
            </Text>

            {filteredEntries.length > 0 ? (
                <Grid columns={{ minWidth: 280, max: 3, repeat: 'fill' }} gap={4} width="100%">
                    {filteredEntries.map((entry) => (
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
            ) : (
                <VStack className="project-empty-state" width="100%" gap={1}>
                    <Heading level={2}>No projects found</Heading>
                    <Text color="secondary">Try another search or tag.</Text>
                </VStack>
            )}
        </VStack>
    );
}
