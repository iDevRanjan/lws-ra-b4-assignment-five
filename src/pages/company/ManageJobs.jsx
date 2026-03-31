import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { getCompanyOpenPositionsForOwnQueryOption } from "../../services/queryOptions";
import { useState } from "react";
import { getPaginationRange } from "../../utils/getPaginationRange";
import ManageJobsTable from "../../components/jobs/ManageJobsTable";
import Pagination from "../../components/common/Pagination";
import BulkJobActions from "../../components/jobs/BulkJobActions";

export default function ManageJobs() {
    const [page, setPage] = useState(1);
    const [selectedItems, setSelectedItems] = useState([]);

    const {
        isPending,
        isError,
        error,
        isPlaceholderData,
        data: openPositionsForOwn,
    } = useQuery({
        ...getCompanyOpenPositionsForOwnQueryOption(page, ""),
        placeholderData: keepPreviousData,
    });

    const LIMIT = 5;

    const total = openPositionsForOwn?.count ?? 0;
    const currentCount = openPositionsForOwn?.data.length ?? 0;
    const start = total === 0 ? 0 : (page - 1) * LIMIT + 1;
    const end = total === 0 ? 0 : start + currentCount - 1;
    const totalPages = openPositionsForOwn?.totalPages ?? 0;

    const paginationArray = getPaginationRange(page, totalPages);
    const selectedDetails =
        openPositionsForOwn?.data.flatMap((item) =>
            selectedItems.includes(item.id)
                ? [{ id: item.id, status: item.status }]
                : [],
        ) ?? [];

    function onSelectedItems(selectedId) {
        if (Array.isArray(selectedId)) {
            setSelectedItems(selectedId);
            return;
        }

        const hasItem = selectedItems.includes(selectedId);

        setSelectedItems((prev) =>
            hasItem
                ? prev.filter((selectedItem) => selectedItem !== selectedId)
                : [...prev, selectedId],
        );
    }

    function resetSelectedItems() {
        setSelectedItems([]);
    }

    function handlePageChange(value) {
        setPage((prev) => {
            return typeof value === "function" ? value(prev) : value;
        });
        resetSelectedItems();
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="mb-2 text-3xl font-bold">Manage Jobs</h1>
                        <p className="text-muted-foreground">
                            View and manage all your job postings
                        </p>
                    </div>
                    <a href="create-job.html" className="btn btn-primary">
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Job
                    </a>
                </div>
            </div>
            {/* Filters and Search */}
            <div className="card mb-6 p-4">
                <div className="flex flex-col gap-4 md:flex-row">
                    <div className="flex-1">
                        <div className="relative">
                            <i
                                data-lucide="search"
                                className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
                            />
                            <input
                                type="search"
                                placeholder="Search jobs by title, location..."
                                className="input pl-10"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative">
                            <button className="btn btn-outline">
                                <i
                                    data-lucide="filter"
                                    className="mr-2 h-4 w-4"
                                />
                                Status
                                <i
                                    data-lucide="chevron-down"
                                    className="ml-2 h-4 w-4"
                                />
                            </button>
                            <div
                                id="statusFilter"
                                className="card absolute top-full right-0 z-10 mt-2 hidden w-48 p-2 shadow-lg"
                            >
                                <button className="hover:bg-accent w-full rounded px-3 py-2 text-left text-sm">
                                    All Status
                                </button>
                                <button className="hover:bg-accent w-full rounded px-3 py-2 text-left text-sm">
                                    New
                                </button>
                                <button className="hover:bg-accent w-full rounded px-3 py-2 text-left text-sm">
                                    Hired
                                </button>
                                <button className="hover:bg-accent w-full rounded px-3 py-2 text-left text-sm">
                                    Shortlisted
                                </button>
                                <button className="hover:bg-accent w-full rounded px-3 py-2 text-left text-sm">
                                    Rejected
                                </button>
                            </div>
                        </div>
                        <div className="relative">
                            <button className="btn btn-outline">
                                <i
                                    data-lucide="arrow-up-down"
                                    className="mr-2 h-4 w-4"
                                />
                                Sort
                                <i
                                    data-lucide="chevron-down"
                                    className="ml-2 h-4 w-4"
                                />
                            </button>
                            <div
                                id="sortFilter"
                                className="card absolute top-full right-0 z-10 mt-2 hidden w-48 p-2 shadow-lg"
                            >
                                <button className="hover:bg-accent w-full rounded px-3 py-2 text-left text-sm">
                                    Newest First
                                </button>
                                <button className="hover:bg-accent w-full rounded px-3 py-2 text-left text-sm">
                                    Oldest First
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card overflow-hidden">
                <ManageJobsTable
                    isPending={isPending}
                    isError={isError}
                    error={error}
                    openPositionsForOwn={openPositionsForOwn}
                    isPlaceholderData={isPlaceholderData}
                    selectedItems={selectedItems}
                    onSelectedItems={onSelectedItems}
                    page={page}
                />
                {selectedItems.length > 0 && (
                    <BulkJobActions
                        selectedItems={selectedItems}
                        selectedDetails={selectedDetails}
                        resetSelectedItems={resetSelectedItems}
                    />
                )}
                <div className="border-border border-t p-4">
                    <div className="flex items-center justify-between">
                        <div className="text-muted-foreground text-sm">
                            Showing{" "}
                            <span className="font-medium">{start} </span> to{" "}
                            <span className="font-medium">{end} </span> of{" "}
                            <span className="font-medium">{total} </span> jobs
                        </div>
                        <Pagination
                            page={page}
                            onPageChange={handlePageChange}
                            paginationArray={paginationArray}
                            isPlaceholderData={isPlaceholderData}
                            totalPages={totalPages}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
