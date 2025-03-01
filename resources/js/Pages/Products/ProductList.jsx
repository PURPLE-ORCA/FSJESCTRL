import React from "react";
import { usePage } from "@inertiajs/react";
import { Link, useForm, router } from "@inertiajs/react";
import { Table } from "@/components/ui/table"; // Assuming shadcn DataTable
import { Input } from "@/components/ui/input"; // shadcn Input
import { Button } from "@/components/ui/button"; // shadcn Button
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
import { toast } from "sonner";
import { MingcuteDeleteFill } from "@/Components/MingcuteDeleteFill";
import { MaterialSymbolsEdit } from "@/Components/MaterialSymbolsEdit";

const ProductList = () => {
    const { props } = usePage();
    const { products, filters } = props; // Data passed from the backend
    const { auth } = usePage().props;
    // const { can_manage_products } = props.auth.user?.abilities || {};

    const form = useForm({
        search: filters.search || "",
        sort_by: filters.sort_by || "name",
        sort_order: filters.sort_order || "asc",
    });

    const [productToDelete, setProductToDelete] = React.useState(null); // Track product to delete
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
    // Confirm deletion
    // const confirmDelete = () => {
    //     if (!productToDelete) return;

    //     router.delete(route("products.destroy", productToDelete.id), {
    //         onSuccess: () => {
    //             toast.success("Product deleted successfully!");
    //             setProductToDelete(null);
    //         },
    //         onError: () => {
    //             toast.error("Failed to delete product");
    //             setProductToDelete(null);
    //         },
    //     });
    // };

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
                <div className="flex gap-2">
                    <Link href={`/products/${row.original.id}/edit`}>
                        <Button variant="outline">
                            <MaterialSymbolsEdit />
                        </Button>
                    </Link>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button>
                                <MingcuteDeleteFill />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Confirm Deletion
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete the product
                                    "{row.original.name}"?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => handleDelete(row.original)} // Ensure this is the only place calling handleDelete
                                    disabled={router.isProcessing}
                                >
                                    {router.isProcessing
                                        ? "Deleting..."
                                        : "Confirm"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
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
                        e.preventDefault(); // Prevent default form submission
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
