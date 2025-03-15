// PaginationLinks.jsx - Reusable pagination component
import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const PaginationLinks = ({ links, className = "" }) => {
    if (!links || links.length <= 3) {
        return null;
    }

    return (
        <Pagination className={cn("mt-6", className)}>
            <PaginationContent>
                {links.map((link, index) => {
                    if (link.label.includes("Previous")) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationPrevious
                                    href={link.url || "#"}
                                    className={
                                        link.url
                                            ? ""
                                            : "pointer-events-none opacity-50"
                                    }
                                />
                            </PaginationItem>
                        );
                    }

                    if (link.label.includes("Next")) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationNext
                                    href={link.url || "#"}
                                    className={
                                        link.url
                                            ? ""
                                            : "pointer-events-none opacity-50"
                                    }
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
                            >
                                {link.label}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationLinks;
