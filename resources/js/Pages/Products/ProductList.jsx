import React from "react";
import { usePage } from "@inertiajs/react";
import { Link, useForm, router } from "@inertiajs/react";
import { Table } from "@/components/ui/table"; 
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import Layout from "@/Layouts/Layout";
import { cn } from "@/lib/utils";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter, // Fixed typo
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";

const ProductList = () => {
    const { props } = usePage();
    const { products, filters } = props;
    const { auth } = usePage().props;

    const form = useForm({
        search: filters.search || "",
        sort_by: filters.sort_by || "name",
        sort_order: filters.sort_order || "asc",
    });

    const canManageProducts = auth?.abilities?.can_manage_products;

    if (!canManageProducts) {
        return (
            <Layout>
                <div className="text-center text-2xl font-bold mx-4 my-20">
                    You do not have permission to view this page.
                </div>
            </Layout>
        );
    }
    const handleDelete = (product) => {
        router.delete(route("products.destroy", product.id));
    };

    // Table columns
    const columns = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "serial_number", header: "Serial Number" },
        { accessorKey: "supplier", header: "Supplier" },
        { accessorKey: "quantity", header: "Quantity" },
        { accessorKey: "price", header: "Price" },
        {
            accessorKey: "service.name",
            header: "Served To",
            cell: ({ row }) => <div>{row.original.service?.name || "N/A"}</div>,
        },
        {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-1">
                            <Icon
                                icon="mdi:dots-vertical"
                                className="w-5 h-5"
                            />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem asChild>
                            <Link
                                href={`/actions/create?product_id=${row.original.id}`} // Pass product_id via URL
                            >
                                <div className="flex items-center gap-2">
                                    <Icon
                                        icon="mdi:interaction-double-tap"
                                        width="24"
                                        height="24"
                                    />
                                    <span>Intervention</span>
                                </div>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={`/products/${row.original.id}/edit`}>
                                <div className="flex items-center gap-2">
                                    <Icon
                                        icon="cuida:edit-outline"
                                        width="24"
                                        height="24"
                                    />
                                    <span>Edit</span>
                                </div>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <div className="flex items-center gap-2">
                                        <Icon
                                            icon="mingcute:delete-3-line"
                                            width="24"
                                            height="24"
                                        />
                                        <span>Delete</span>
                                    </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Confirm Deletion
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete the
                                            product "{row.original.name}"?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() =>
                                                handleDelete(row.original)
                                            }
                                            disabled={router.isProcessing}
                                        >
                                            {router.isProcessing
                                                ? "Deleting..."
                                                : "Confirm"}
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-4xl font-bold mb-4">Product List</h1>

                {/* Search and Filters */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault(); 
                        form.get(route("products.index"), {
                            preserveScroll: true,
                            preserveState: true,
                        });
                    }}
                    className="flex justify-between items-center mb-4"
                >
                    {/* Search Input */}
                    <Input
                        type="text"
                        placeholder="Search by name or supplier..."
                        value={form.data.search}
                        onChange={(e) => form.setData("search", e.target.value)}
                        className="max-w-sm"
                    />

                    {/* Sorting Buttons */}
                    <div className="flex gap-2">
                        <Button
                            onClick={() => {
                                form.setData({
                                    sort_by: "name",
                                    sort_order: "asc",
                                });
                                form.get(route("products.index"), {
                                    preserveScroll: true,
                                    preserveState: true,
                                });
                            }}
                        >
                            Sort by Name (Asc)
                        </Button>
                        <Button
                            onClick={() => {
                                form.setData({
                                    sort_by: "price",
                                    sort_order: "desc",
                                });
                                form.get(route("products.index"), {
                                    preserveScroll: true,
                                    preserveState: true,
                                });
                            }}
                        >
                            Sort by Price (Desc)
                        </Button>
                    </div>
                </form>

                {/* Table */}
                <Table columns={columns} data={products.data} />

                {/* Pagination */}
                <Pagination className="mt-6">
                    <PaginationContent>
                        {products.links.map((link, index) => {
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

export default ProductList;
