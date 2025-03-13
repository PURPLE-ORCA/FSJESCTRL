import React from "react";
import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
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
import DataTable from "@/Components/DataTable/DataTable";
import StayOut from "@/Components/StayOut";

const ProductList = () => {
    const { props } = usePage();
    const { products, filters } = props;
    const { auth } = usePage().props;

    const canManageProducts = auth?.abilities?.can_manage_products;

    if (!canManageProducts) {
        return (
            <StayOut/>
        );
    }

    const handleDelete = (product) => {
        router.delete(route("products.destroy", product.id));
    };

    // Define sort options for the dropdown
    const sortOptions = [
        { value: "name", label: "Name" },
        { value: "price", label: "Price" },
        { value: "supplier", label: "Supplier" },
        { value: "quantity", label: "Quantity" },
        { value: "id", label: "ID" },
        { value: "serial_number", label: "Serial Number" },
    ];

    // Table columns
    const columns = [
        {
            accessorKey: "id",
            header: "ID",
            sortable: true,
        },
        {
            accessorKey: "name",
            header: "Name",
            sortable: true,
        },
        {
            accessorKey: "serial_number",
            header: "Serial Number",
            sortable: true,
        },
        {
            accessorKey: "supplier",
            header: "Supplier",
            sortable: true,
        },
        {
            accessorKey: "quantity",
            header: "Quantity",
            sortable: true,
            cell: ({ row }) => <div>{row.original.quantity}</div>,
        },
        {
            accessorKey: "price",
            header: "Price",
            sortable: true,
            cell: ({ row }) => (
                <div>
                    {typeof row.original.price === "number"
                        ? `$${row.original.price.toFixed(2)}`
                        : row.original.price}
                </div>
            ),
        },
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
                                href={`/actions/create?product_id=${row.original.id}`}
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
                <DataTable
                    data={products}
                    columns={columns}
                    filters={filters}
                    routeName="products.index"
                    title="Product List"
                    addRoute={route("products.create")}
                    addLabel="Add Product"
                    sortOptions={sortOptions}
                    searchPlaceholder="Search by name or supplier..."
                    emptyMessage="No products found"
                />
            </div>
        </Layout>
    );
};

export default ProductList;
