import { Badge } from '@astryxdesign/core/Badge';
import { MetadataList, MetadataListItem } from '@astryxdesign/core/MetadataList';
import { HStack } from '@astryxdesign/core/Stack';
import { Token } from '@astryxdesign/core/Token';
import { slugify } from '../../utils/common-utils';

type ProjectMetadataProps = {
    status: 'Ongoing' | 'Completed';
    tags: string[];
    period: string;
    role: string;
};

export default function ProjectMetadata({ status, tags, period, role }: ProjectMetadataProps) {
    return (
        <MetadataList columns="multi" className="project-metadata">
            <MetadataListItem label="Status">
                <Badge label={status} variant={status === 'Ongoing' ? 'success' : 'neutral'} />
            </MetadataListItem>
            <MetadataListItem label="Tags">
                <HStack gap={1} wrap="wrap">
                    {tags.map((tag) => (
                        <Token key={tag} label={tag} href={`/tags/${slugify(tag)}`} size="sm" />
                    ))}
                </HStack>
            </MetadataListItem>
            <MetadataListItem label="Period">{period}</MetadataListItem>
            <MetadataListItem label="Role">{role}</MetadataListItem>
        </MetadataList>
    );
}
