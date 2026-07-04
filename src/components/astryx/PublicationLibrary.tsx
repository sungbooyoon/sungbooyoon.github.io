import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import { EmptyState } from '@astryxdesign/core/EmptyState';
import { Icon } from '@astryxdesign/core/Icon';
import { List, ListItem } from '@astryxdesign/core/List';
import { Markdown } from '@astryxdesign/core/Markdown';
import { Selector } from '@astryxdesign/core/Selector';
import { HStack, StackItem, VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { TextInput } from '@astryxdesign/core/TextInput';
import { LinkIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import { useMemo, useState } from 'react';
import type { PublicationBadge, PublicationEntry } from '../../utils/publication-utils';

type PublicationLibraryProps = {
    intro: string;
    entries: PublicationEntry[];
};

type PublicationFilter = 'All' | 'Journal' | 'Conference' | 'Awarded' | 'With video';

const filters: PublicationFilter[] = ['All', 'Journal', 'Conference', 'Awarded', 'With video'];

function AwardBadge({ badge }: { badge: PublicationBadge }) {
    return <Badge label={badge} variant={badge === 'Best Paper' ? 'yellow' : badge === "Editor's Choice" ? 'red' : 'blue'} />;
}

function PublicationItem({ entry }: { entry: PublicationEntry }) {
    return (
        <ListItem
            className="publication-list-item"
            label={
                <VStack width="100%" gap={2}>
                    <VStack gap={1}>
                        <Heading level={3}>{entry.title}</Heading>
                        <Text as="p" type="supporting" color="secondary">
                            {entry.authors}
                        </Text>
                        <Text as="p" type="body" color="secondary">
                            {entry.venue}
                        </Text>
                    </VStack>
                    {entry.badges.length > 0 && (
                        <HStack gap={1} wrap="wrap">
                            {entry.badges.map((badge) => (
                                <AwardBadge key={badge} badge={badge} />
                            ))}
                        </HStack>
                    )}
                    {(entry.doi || entry.video) && (
                        <HStack gap={2} wrap="wrap">
                            {entry.doi && (
                                <Button
                                    label="DOI"
                                    href={entry.doi}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="secondary"
                                    size="sm"
                                    icon={<Icon icon={LinkIcon} size="sm" color="inherit" />}
                                />
                            )}
                            {entry.video && (
                                <Button
                                    label="Video"
                                    href={entry.video}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="secondary"
                                    size="sm"
                                    icon={<Icon icon={PlayCircleIcon} size="sm" color="inherit" />}
                                />
                            )}
                        </HStack>
                    )}
                </VStack>
            }
        />
    );
}

export default function PublicationLibrary({ intro, entries }: PublicationLibraryProps) {
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState<PublicationFilter>('All');
    const [sort, setSort] = useState('newest');
    const visibleEntries = useMemo(() => {
        const normalizedQuery = query.trim().toLocaleLowerCase();
        const filtered = entries.filter((entry) => {
            const isAwarded = entry.badges.some((badge) => badge === 'Best Paper' || badge === "Editor's Choice");
            const matchesFilter =
                filter === 'All' || entry.type === filter || (filter === 'Awarded' && isAwarded) || (filter === 'With video' && Boolean(entry.video));
            const searchableText = [entry.title, entry.authors, entry.venue, entry.year, ...entry.badges].join(' ').toLocaleLowerCase();
            return matchesFilter && (!normalizedQuery || searchableText.includes(normalizedQuery));
        });

        return [...filtered].sort((a, b) => {
            if (sort === 'oldest') return a.year - b.year;
            if (sort === 'title') return a.title.localeCompare(b.title);
            return b.year - a.year;
        });
    }, [entries, filter, query, sort]);

    const groups = useMemo(() => {
        if (sort === 'title') return [{ label: 'A–Z', entries: visibleEntries }];
        const grouped = new Map<number, PublicationEntry[]>();
        visibleEntries.forEach((entry) => grouped.set(entry.year, [...(grouped.get(entry.year) ?? []), entry]));
        return [...grouped].map(([year, groupedEntries]) => ({ label: String(year), entries: groupedEntries }));
    }, [sort, visibleEntries]);

    return (
        <VStack width="100%" gap={8} className="publication-library">
            {intro && (
                <Markdown contentWidth="100%" contentAlign="start" density="default" headingLevelStart={2} autolink="gfm">
                    {intro}
                </Markdown>
            )}

            <VStack width="100%" gap={4}>
                <HStack width="100%" gap={3} vAlign="end" wrap="wrap" className="publication-filter-toolbar">
                    <StackItem size="fill" className="publication-search-field">
                        <TextInput
                            label="Search publications"
                            isLabelHidden
                            placeholder="Search publications"
                            value={query}
                            onChange={setQuery}
                            startIcon={<Icon icon="search" size="sm" color="secondary" />}
                            hasClear
                            width="100%"
                        />
                    </StackItem>
                    <Selector
                        label="Sort publications"
                        isLabelHidden
                        value={sort}
                        onChange={setSort}
                        options={[
                            { value: 'newest', label: 'Newest' },
                            { value: 'oldest', label: 'Oldest' },
                            { value: 'title', label: 'Title A–Z' }
                        ]}
                        size="md"
                        width={160}
                    />
                </HStack>
                <HStack gap={1} wrap="wrap" aria-label="Filter publications" className="publication-type-filters">
                    {filters.map((option) => {
                        const isSelected = filter === option;
                        return (
                            <Button
                                key={option}
                                label={option}
                                variant="ghost"
                                size="md"
                                aria-pressed={isSelected}
                                className={`library-filter-button${isSelected ? ' is-selected' : ''}`}
                                onClick={() => setFilter(option)}
                            />
                        );
                    })}
                </HStack>
            </VStack>

            {groups.length > 0 ? (
                <VStack width="100%" gap={8}>
                    {groups.map((group) => (
                        <VStack as="section" width="100%" gap={3} key={group.label} className="publication-year-group">
                            <Heading level={2} type="display-3">
                                {group.label}
                            </Heading>
                            <List density="balanced" hasDividers>
                                {group.entries.map((entry) => (
                                    <PublicationItem key={entry.id} entry={entry} />
                                ))}
                            </List>
                        </VStack>
                    ))}
                </VStack>
            ) : (
                <EmptyState title="No publications found" description="Try another search or filter." headingLevel={2} />
            )}
        </VStack>
    );
}
