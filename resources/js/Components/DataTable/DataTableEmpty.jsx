import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

const DataTableEmpty = ({ onResetFilters, message = "No items found" }) => {
    return (
        <div className="bg-red dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <Icon
                icon="mdi:magnify-off"
                className="mx-auto w-16 h-16 text-gray-400 mb-4"
            />
            <h3 className="text-lg font-medium mb-1">{message}</h3>
            <p className="text-gray-500">
                Try adjusting your search or filter criteria
            </p>
            <Button variant="outline" className="mt-4" onClick={onResetFilters}>
                Reset Filters
            </Button>
        </div>
    );
};

export default DataTableEmpty;