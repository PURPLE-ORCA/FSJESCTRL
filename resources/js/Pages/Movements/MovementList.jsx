import React from "react";
import { usePage } from "@inertiajs/react";
import { Link, useForm } from "@inertiajs/react";
import { Table } from "@/components/ui/table";
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

const MovementList = () => {
    const { auth, movements, filters } = usePage().props;
    const canViewMovements = auth?.abilities?.can_view_movements;

    if (!canViewMovements) {
        return (
            <Layout>
                <div className="text-center text-2xl font-bold mx-4 my-20">
                    You do not have permission to view this page.
                </div>
            </Layout>
        );
    }

    // Form for search
    const form = useForm({
        search: filters.search || "",
    });

    // Table columns
    const columns = [
        {
            accessorKey: "product.name",
            header: "Product",
            cell: ({ row }) => <div>{row.original.product?.name || "N/A"}</div>,
        },
        {
            accessorKey: "fromService.name",
            header: "From Service",
            cell: ({ row }) => (
                <div>{row.original.from_service?.name || "N/A"}</div>
            ),
        },
        {
            accessorKey: "toService.name",
            header: "To Service",
            cell: ({ row }) => (
                <div>{row.original.to_service?.name || "N/A"}</div>
            ),
        },
        {
            accessorKey: "quantity",
            header: "Quantity",
            cell: ({ row }) => <div>{row.original.quantity}</div>,
        },
        {
            accessorKey: "movement_date",
            header: "Date",
            cell: ({ row }) => (
                <div>
                    {new Date(row.original.movement_date).toLocaleDateString()}
                </div>
            ),
        },
        {
            accessorKey: "user.name",
            header: "User",
            cell: ({ row }) => <div>{row.original.user?.name || "N/A"}</div>,
        },
        {
            accessorKey: "note",
            header: "Note",
            cell: ({ row }) => (
                <div
                    className="truncate max-w-[200px] text-ellipsis"
                    title={row.original.note}
                >
                    {row.original.note || "No note"}
                </div>
            ),
        },
    ];

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
                    className="flex justify-between items-center mb-4"
                >
                    {/* Search Input */}
                    <Input
                        type="text"
                        placeholder="Search by product name..."
                        value={form.data.search}
                        onChange={(e) => form.setData("search", e.target.value)}
                        className="max-w-sm"
                    />

                    {/* Sorting Buttons */}
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
                    </div>
                </form>

                {/* Table */}
                <Table columns={columns} data={movements.data} />

                {/* Pagination */}
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
                </Pagination>
            </div>
        </Layout>
    );
};

export default MovementList;
