import { HStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { Timestamp } from '@astryxdesign/core/Timestamp';

type LastUpdatedProps = {
    value: string;
};

export default function LastUpdated({ value }: LastUpdatedProps) {
    return (
        <HStack gap={1} vAlign="center" aria-label="Last updated">
            <Text type="supporting" color="secondary">
                Last updated
            </Text>
            <Timestamp value={value} format="auto" isLive hasTooltip={false} />
        </HStack>
    );
}
