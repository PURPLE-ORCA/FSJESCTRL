import React from "react";

const DataTableActiveFilters = ({ filters, sortOptions = [] }) => {
    // Skip rendering if no active filters
    if (
        !filters.search &&
        filters.sort_by === "name" &&
        filters.sort_order === "asc"
    ) {
        return null;
    }

    // Find the label for the current sort field
    const getSortLabel = (value) => {
        const option = sortOptions.find((opt) => opt.value === value);
        return option
            ? option.label
            : value.charAt(0).toUpperCase() + value.slice(1);
    };

    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {filters.search && (
                <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                    <span className="mr-1">Search:</span>
                    <span className="font-medium">{filters.search}</span>
                </div>
            )}
            {(filters.sort_by !== "name" || filters.sort_order !== "asc") && (
                <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                    <span className="mr-1">Sort:</span>
                    <span className="font-medium">
                        {getSortLabel(filters.sort_by)}(
                        {filters.sort_order === "asc"
                            ? "Ascending"
                            : "Descending"}
                        )
                    </span>
                </div>
            )}
        </div>
    );
};

export default DataTableActiveFilters;