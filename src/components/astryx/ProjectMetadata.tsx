import { Link } from '@astryxdesign/core/Link';
import { HStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { slugify } from '../../utils/common-utils';

type ProjectMetadataProps = {
    status: 'Active' | 'Completed';
    tags: string[];
    period: string;
    role: string;
};

export default function ProjectMetadata({ status, tags, period, role }: ProjectMetadataProps) {
    const primaryItems = [role, status, period];

    return (
        <HStack gap={1.5} wrap="wrap" className="project-meta-line" aria-label="Project metadata">
            {primaryItems.map((item, index) => (
                <HStack key={item} gap={1.5} vAlign="center">
                    {index > 0 && <Text aria-hidden="true">・</Text>}
                    <Text type="supporting" color="secondary">
                        {item}
                    </Text>
                </HStack>
            ))}
            {tags.map((tag) => (
                <HStack key={tag} gap={1.5} vAlign="center">
                    <Text aria-hidden="true">・</Text>
                    <Link href={`/tags/${slugify(tag)}`} isStandalone>
                        {tag}
                    </Link>
                </HStack>
            ))}
        </HStack>
    );
}
