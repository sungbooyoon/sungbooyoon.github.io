import { HStack } from '@astryxdesign/core/Stack';
import { Token } from '@astryxdesign/core/Token';
import { slugify } from '../../utils/common-utils';

type TagLinksProps = {
    tags: string[];
};

export default function TagLinks({ tags }: TagLinksProps) {
    return (
        <HStack gap={3} wrap="wrap">
            {tags.map((tag) => (
                <Token key={tag} label={tag} href={`/tags/${slugify(tag)}`} size="sm" />
            ))}
        </HStack>
    );
}
