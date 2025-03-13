import React from "react";
import { usePage, useForm } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/Layouts/Layout";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import DataExport from "@/Components/DataExport";
import MovementCard from "./MovementCard";
import StayOut from "@/Components/StayOut";

const MovementList = () => {
    const { auth, movements, filters } = usePage().props;
    const canViewMovements = auth?.abilities?.can_view_movements;

    if (!canViewMovements) {
        return (
            <StayOut/>
        );
    }

    // Form for search
    const form = useForm({
        search: filters.search || "",
    });

    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-4xl font-bold mb-4">Stock Movements</h1>

                {/* Search and Filters */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.get(route("movements.index"), {
                            preserveScroll: true,
                            preserveState: true,
                        });
                    }}
                    className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4"
                >
                    <Input
                        type="text"
                        placeholder="Search by product name..."
                        value={form.data.search}
                        onChange={(e) => form.setData("search", e.target.value)}
                        className="max-w-sm"
                    />

                    <div className="flex gap-2">
                        <Button
                            onClick={() => {
                                form.setData({
                                    sort_by: "movement_date",
                                    sort_order: "desc",
                                });
                                form.submit();
                            }}
                        >
                            Sort by Date (Desc)
                        </Button>

                        <DataExport data={movements.data} />
                    </div>
                </form>

                <div className="flex flex-wrap justify-center flex-col gap-4">
                    {movements.data.map((movement, index) => (
                        <MovementCard key={index} movement={movement} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-6">
                    <Pagination className="mt-6">
                        <PaginationContent>
                            {movements.links.map((link, index) => {
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
                    </Pagination>{" "}
                </div>
            </div>
        </Layout>
    );
};

export default MovementList;
