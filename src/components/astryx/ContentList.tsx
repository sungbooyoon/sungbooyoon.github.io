import { Icon } from '@astryxdesign/core/Icon';
import { List, ListItem } from '@astryxdesign/core/List';
import { VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';

export type ContentListEntry = {
    title: string;
    href: string;
    description?: string;
    meta?: string;
    isExternal?: boolean;
};

type ContentListProps = {
    entries: ContentListEntry[];
    heading?: string;
    headingLevel?: 1 | 2;
    itemHeadingLevel?: 2 | 3;
};

export default function ContentList({ entries, heading, headingLevel = 2, itemHeadingLevel = 3 }: ContentListProps) {
    return (
        <List density="spacious" hasDividers header={heading ? <Heading level={headingLevel}>{heading}</Heading> : undefined}>
            {entries.map((entry) => (
                <ListItem
                    key={`${entry.href}-${entry.title}`}
                    href={entry.href}
                    target={entry.isExternal ? '_blank' : undefined}
                    rel={entry.isExternal ? 'noopener noreferrer' : undefined}
                    label={<Heading level={itemHeadingLevel}>{entry.title}</Heading>}
                    description={
                        entry.meta || entry.description ? (
                            <VStack gap={1}>
                                {entry.meta && (
                                    <Text type="supporting" color="secondary">
                                        {entry.meta}
                                    </Text>
                                )}
                                {entry.description && (
                                    <Text as="p" type="body" color="secondary">
                                        {entry.description}
                                    </Text>
                                )}
                            </VStack>
                        ) : undefined
                    }
                    endContent={<Icon icon={entry.isExternal ? 'externalLink' : 'chevronRight'} color="secondary" size="sm" />}
                />
            ))}
        </List>
    );
}
