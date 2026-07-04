import { Badge } from '@astryxdesign/core/Badge';
import { HStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { Token } from '@astryxdesign/core/Token';
import { slugify } from '../../utils/common-utils';

type ProjectMetadataProps = {
    status: 'Active' | 'Completed';
    tags: string[];
    period: string;
    role: string;
};

export default function ProjectMetadata({ status, tags, period, role }: ProjectMetadataProps) {
    return (
        <HStack gap={2} wrap="wrap" vAlign="center" className="project-meta-line" aria-label="Project metadata">
            <HStack gap={1.5} wrap="wrap" vAlign="center">
                <Text type="supporting" color="secondary">
                    {role}
                </Text>
                <Text aria-hidden="true" color="secondary">
                    ・
                </Text>
                <Badge label={status} variant={status === 'Active' ? 'success' : 'neutral'} />
                <Text aria-hidden="true" color="secondary">
                    ・
                </Text>
                <Text type="supporting" color="secondary">
                    {period}
                </Text>
            </HStack>
            {tags.length > 0 && (
                <HStack gap={1} wrap="wrap" vAlign="center">
                    {tags.map((tag) => (
                        <Token key={tag} label={tag} href={`/tags/${slugify(tag)}`} size="sm" />
                    ))}
                </HStack>
            )}
        </HStack>
    );
}
