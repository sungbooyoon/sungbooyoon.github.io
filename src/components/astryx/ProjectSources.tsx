import { Badge } from '@astryxdesign/core/Badge';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { Grid } from '@astryxdesign/core/Grid';
import { Icon } from '@astryxdesign/core/Icon';
import { HStack, StackItem, VStack } from '@astryxdesign/core/Stack';
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
                        variant="muted"
                        padding={3}
                        height="100%"
                    >
                        <HStack gap={3} vAlign="center" hAlign="between" height="100%">
                            <StackItem size="fill">
                                <Text type="body">{source.title}</Text>
                            </StackItem>
                            <Badge label="External" variant="blue" icon={<Icon icon="externalLink" size="sm" color="inherit" />} />
                        </HStack>
                    </ClickableCard>
                ))}
            </Grid>
        </VStack>
    );
}
