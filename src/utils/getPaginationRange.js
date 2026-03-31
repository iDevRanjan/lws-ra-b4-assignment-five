export function getPaginationRange(currentPage = 1, totalPages = 10) {
    const siblings = 1;

    const totalPageNumbersToShow = siblings * 2 + 5;

    if (totalPageNumbersToShow >= totalPages) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    const leftSiblingIndex = Math.max(currentPage - siblings, firstPageIndex);
    const rightSiblingIndex = Math.min(currentPage + siblings, lastPageIndex);

    const showLeftDots = leftSiblingIndex - firstPageIndex > 2;
    const showRightDots = lastPageIndex - rightSiblingIndex > 2;

    if (!showLeftDots && showRightDots) {
        const leftItemCount = 3 + 2 * siblings;
        const leftRange = Array.from(
            { length: leftItemCount },
            (_, i) => i + 1,
        );
        return [...leftRange, "...", lastPageIndex];
    }

    if (showLeftDots && !showRightDots) {
        const rightItemCount = 3 + 2 * siblings;
        const rightRange = Array.from(
            { length: rightItemCount },
            (_, i) => lastPageIndex - rightItemCount + i + 1,
        );
        return [firstPageIndex, "...", ...rightRange];
    }

    if (showLeftDots && showRightDots) {
        const middleRange = Array.from(
            { length: rightSiblingIndex - leftSiblingIndex + 1 },
            (_, i) => leftSiblingIndex + i,
        );
        return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }
}
