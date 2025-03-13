import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";

const DataTableHeader = ({
    title,
    addRoute = null,
    addLabel = "Add New",
    addIcon = "mdi:plus",
}) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold">{title}</h1>
            {addRoute && (
                <Link href={addRoute}>
                    <Button>
                        <Icon icon={addIcon} className="mr-2 w-5 h-5" />
                        {addLabel}
                    </Button>
                </Link>
            )}
        </div>
    );
};

export default DataTableHeader;