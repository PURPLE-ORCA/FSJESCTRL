import React from "react";
import { router } from "@inertiajs/react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const DataTablePagination = ({ links }) => {
    if (!links || links.length <= 3) {
        return null;
    }

    const handleClick = (e, url) => {
        if (url) {
            e.preventDefault();
            router.get(
                url,
                {},
                {
                    preserveScroll: true,
                    preserveState: true,
                }
            );
        }
    };

    return (
        <Pagination className="mt-6">
            <PaginationContent>
                {links.map((link, index) => {
                    if (link.label.includes("Previous")) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationPrevious
                                    href={link.url || "#"}
                                    className={cn(
                                        link.url
                                            ? ""
                                            : "pointer-events-none opacity-50"
                                    )}
                                    onClick={(e) => handleClick(e, link.url)}
                                />
                            </PaginationItem>
                        );
                    }

                    if (link.label.includes("Next")) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationNext
                                    href={link.url || "#"}
                                    className={cn(
                                        link.url
                                            ? ""
                                            : "pointer-events-none opacity-50"
                                    )}
                                    onClick={(e) => handleClick(e, link.url)}
                                />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href={link.url || "#"}
                                isActive={link.active}
                                className={cn(
                                    link.active
                                        ? "bg-main text-white"
                                        : "hover:bg-gray-100",
                                    "dark:hover:bg-gray-800"
                                )}
                                onClick={(e) => handleClick(e, link.url)}
                            >
                                {link.label.replace(/&laquo;|&raquo;/g, "")}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
};

export default DataTablePagination;