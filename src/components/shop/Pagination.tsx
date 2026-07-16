interface PaginationProps {
    totalPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

function Pagination({ totalPages, currentPage, setCurrentPage }: PaginationProps) {

    function getVisiblePages(): (number | "...")[] {
        const maxVisible = 5;

        if (totalPages <= maxVisible + 1) {
            return Array.from({ length: totalPages }, (_, index) => index + 1);
        }

        const pages: (number | "...")[] = [1];

        let start = Math.max(2, currentPage - 2);
        let end = Math.min(totalPages - 1, currentPage + 2);

        if (currentPage <= 3) {
            start = 2;
            end = 5;
        } else if (currentPage >= totalPages - 2) {
            start = totalPages - 4;
            end = totalPages - 1;
        }

        if (start > 2) {
            pages.push("...");
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < totalPages - 1) {
            pages.push("...");
        }

        pages.push(totalPages);

        return pages;
    }

    const visiblePages = getVisiblePages();

    return (
        <div className="flex items-center justify-center gap-2 py-[24px]">
            {visiblePages.map((page, index) =>
                page === "..." ? (
                    <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-gray-400">
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 flex items-center justify-center rounded border font-medium
                            ${currentPage === page
                                ? "bg-[#23A6F0] text-white border-[#23A6F0]"
                                : "bg-white text-[#23A6F0] border-gray-300"}`}
                    >
                        {page}
                    </button>
                )
            )}
        </div>
    );
}

export default Pagination;