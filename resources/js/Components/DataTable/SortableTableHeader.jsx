import React from "react";
import { Icon } from "@iconify/react";

const SortableTableHeader = ({
    column,
    currentSortBy,
    currentSortOrder,
    onSort,
}) => {
    const isSorted = currentSortBy === column;
    const nextSortOrder =
        isSorted && currentSortOrder === "asc" ? "desc" : "asc";

    return (
        <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => onSort(column, nextSortOrder)}
        >
            <span>{column.charAt(0).toUpperCase() + column.slice(1)}</span>
            {isSorted ? (
                <Icon
                    icon={
                        currentSortOrder === "asc"
                            ? "mdi:arrow-up"
                            : "mdi:arrow-down"
                    }
                    className="w-4 h-4"
                />
            ) : (
                <Icon
                    icon="mdi:unfold-more-horizontal"
                    className="w-4 h-4 opacity-50"
                />
            )}
        </div>
    );
};

export default SortableTableHeader;