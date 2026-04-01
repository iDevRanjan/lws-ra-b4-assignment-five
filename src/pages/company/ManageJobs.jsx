import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { getCompanyOpenPositionsForOwnQueryOption } from "../../services/queryOptions";
import { useState } from "react";
import { getPaginationRange } from "../../utils/getPaginationRange";
import ManageJobsTable from "../../components/jobs/ManageJobsTable";
import Pagination from "../../components/common/Pagination";
import BulkJobActions from "../../components/jobs/BulkJobActions";
import ManageJobsSearchAndFilter from "../../components/jobs/ManageJobsSearchAndFilter";

export default function ManageJobs() {
    const [params, setParams] = useState("");
    const [page, setPage] = useState(1);
    const [selectedItems, setSelectedItems] = useState([]);

    const {
        isPending,
        isError,
        error,
        isPlaceholderData,
        data: openPositionsForOwn,
    } = useQuery({
        ...getCompanyOpenPositionsForOwnQueryOption(page, params),
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

    function handleQueryParams(queryParams) {
        setParams(queryParams);
    }

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

    function handlePageChange(value) {
        setPage((prev) => {
            return typeof value === "function" ? value(prev) : value;
        });
        setSelectedItems([]);
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
            <ManageJobsSearchAndFilter
                queryParamsProps={params}
                handleQueryParams={handleQueryParams}
                resetPage={() => setPage(1)}
                resetSelectedItems={() => setSelectedItems([])}
            />
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
                        resetSelectedItems={() => setSelectedItems([])}
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
