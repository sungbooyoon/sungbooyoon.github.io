import { Icon } from '@astryxdesign/core/Icon';
import { IconButton } from '@astryxdesign/core/IconButton';
import { HStack, StackItem } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';

type RoutePaginationProps = {
    currentPage: number;
    totalPages: number;
    previousUrl?: string;
    nextUrl?: string;
};

export default function RoutePagination({ currentPage, totalPages, previousUrl, nextUrl }: RoutePaginationProps) {
    return (
        <HStack width="100%" vAlign="center">
            <StackItem size="fill">
                {previousUrl && (
                    <IconButton
                        label={`Go to page ${currentPage - 1} of ${totalPages}`}
                        href={previousUrl}
                        variant="secondary"
                        icon={<Icon icon="chevronLeft" />}
                    />
                )}
            </StackItem>
            <Text type="supporting" color="secondary" hasTabularNumbers>
                Page {currentPage} of {totalPages}
            </Text>
            <StackItem size="fill" crossAlignSelf="end">
                {nextUrl && (
                    <IconButton
                        label={`Go to page ${currentPage + 1} of ${totalPages}`}
                        href={nextUrl}
                        variant="secondary"
                        icon={<Icon icon="chevronRight" />}
                    />
                )}
            </StackItem>
        </HStack>
    );
}
