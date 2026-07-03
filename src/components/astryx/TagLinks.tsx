import { Link } from '@astryxdesign/core/Link';
import { HStack } from '@astryxdesign/core/Stack';
import { slugify } from '../../utils/common-utils';

type TagLinksProps = {
    tags: string[];
};

export default function TagLinks({ tags }: TagLinksProps) {
    return (
        <HStack gap={3} wrap="wrap">
            {tags.map((tag) => (
                <Link key={tag} href={`/tags/${slugify(tag)}`} isStandalone color="secondary">
                    #{tag}
                </Link>
            ))}
        </HStack>
    );
}
