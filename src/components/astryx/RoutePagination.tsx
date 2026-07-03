import { Pagination } from '@astryxdesign/core/Pagination';

type RoutePaginationProps = {
    currentPage: number;
    totalPages: number;
    previousUrl?: string;
    nextUrl?: string;
};

export default function RoutePagination({ currentPage, totalPages, previousUrl, nextUrl }: RoutePaginationProps) {
    const handleChange = (page: number) => {
        const destination = page < currentPage ? previousUrl : nextUrl;
        if (destination) window.location.assign(destination);
    };

    return <Pagination page={currentPage} totalPages={totalPages} onChange={handleChange} variant="compact" size="md" label="Content pages" />;
}
