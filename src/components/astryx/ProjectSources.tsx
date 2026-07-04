import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { Grid } from '@astryxdesign/core/Grid';
import { Link } from '@astryxdesign/core/Link';
import { StackItem, VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';

type ProjectSource = {
    title: string;
    url: string;
};

type ProjectSourcesProps = {
    sources: ProjectSource[];
};

export default function ProjectSources({ sources }: ProjectSourcesProps) {
    if (sources.length === 0) return null;

    return (
        <VStack as="section" width="100%" gap={3} className="project-sources">
            <Heading level={2}>Sources</Heading>
            <Grid columns={{ minWidth: 260, repeat: 'fit' }} gap={2} width="100%">
                {sources.map((source) => (
                    <ClickableCard
                        key={source.url}
                        label={`Open external source: ${source.title}`}
                        href={source.url}
                        target="_blank"
                        variant="default"
                        padding={3}
                        height="100%"
                    >
                        <VStack gap={3} height="100%">
                            <StackItem size="fill">
                                <Text type="body">{source.title}</Text>
                            </StackItem>
                            <Link href={source.url} target="_blank" rel="noopener noreferrer" isExternalLink isStandalone>
                                Open external
                            </Link>
                        </VStack>
                    </ClickableCard>
                ))}
            </Grid>
        </VStack>
    );
}
