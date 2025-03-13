import React from "react";
import { useForm, router } from "@inertiajs/react";
import { Table } from "@/components/ui/table";
import DataTableHeader from "./DataTableHeader";
import DataTableFilters from "./DataTableFilters";
import DataTableActiveFilters from "./DataTableActiveFilters";
import DataTablePagination from "./DataTablePagination";
import DataTableEmpty from "./DataTableEmpty";

const DataTable = ({
    data,
    columns,
    filters,
    routeName,
    title,
    addRoute = null,
    addLabel = "Add New",
    sortOptions = [],
    searchPlaceholder = "Search...",
    extraFilters = null,
    emptyMessage = "No items found",
}) => {
    // Extract basic data from the paginated response
    const items = data.data;
    const total = data.total;
    const links = data.links;

    // Create form for filters
    const form = useForm({
        search: filters.search || "",
        sort_by: filters.sort_by || "name",
        sort_order: filters.sort_order || "asc",
        ...filters,
    });

    // Handle submitting the search form
    const handleSearch = () => {
        form.get(route(routeName), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    // Handle resetting filters
    const handleResetFilters = () => {
        form.setData({
            search: "",
            sort_by: "name",
            sort_order: "asc",
        });
        form.get(route(routeName), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    // Handle column sorting
    const handleSort = (column, order) => {
        form.setData({
            ...form.data,
            sort_by: column,
            sort_order: order,
        });
        form.get(route(routeName), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <div>
            <DataTableHeader
                title={title}
                addRoute={addRoute}
                addLabel={addLabel}
            />

            <DataTableFilters
                form={form}
                onSearch={handleSearch}
                onResetFilters={handleResetFilters}
                sortOptions={sortOptions}
                searchPlaceholder={searchPlaceholder}
                extraFilters={extraFilters}
            />

            <DataTableActiveFilters
                filters={form.data}
                sortOptions={sortOptions}
            />

            {/* Results Counter */}
            <div className="text-sm text-gray-500 mb-4">
                Showing {items.length} of {total} items
            </div>

            {/* Table or Empty State */}
            {items.length > 0 ? (
                <div className="bg-white dark:bg-transparent rounded-lg shadow overflow-hidden">
                    <Table
                        columns={columns.map((col) => {
                            // Add sorting functionality to columns if they're sortable
                            if (col.sortable && col.accessorKey !== "actions") {
                                return {
                                    ...col,
                                    header: () => (
                                        <SortableTableHeader
                                            column={col.accessorKey}
                                            currentSortBy={form.data.sort_by}
                                            currentSortOrder={
                                                form.data.sort_order
                                            }
                                            onSort={handleSort}
                                        />
                                    ),
                                };
                            }
                            return col;
                        })}
                        data={items}
                    />
                </div>
            ) : (
                <DataTableEmpty
                    onResetFilters={handleResetFilters}
                    message={emptyMessage}
                />
            )}

            <DataTablePagination links={links} />
        </div>
    );
};

export default DataTable;