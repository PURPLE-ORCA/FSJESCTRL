import React, { useContext } from "react";
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
import ProductDataExport from "./ProducDataExport";
import { TranslationContext } from "@/context/TranslationProvider";

const ProductList = () => {
    const { props } = usePage();
    const { products, filters } = props;
    const { auth } = usePage().props;
    const { translations } = useContext(TranslationContext);

    const canManageProducts = auth?.abilities?.can_manage_products;

    if (!canManageProducts) {
        return <StayOut />;
    }

    const handleDelete = (product) => {
        router.delete(route("products.destroy", product.id));
    };

const sortOptions = [
    { value: "name", label: translations.name || "Name" },
    { value: "price", label: translations.price || "Price" },
    { value: "supplier", label: translations.supplier || "Supplier" },
    { value: "id", label: translations.id || "ID" },
    {
        value: "serial_number",
        label: translations.serial_number || "Serial Number",
    },
];


const columns = [
    { accessorKey: "id", header: translations.id || "ID" },
    { accessorKey: "name", header: translations.name || "Name" },
    {
        accessorKey: "serial_number",
        header: translations.serial_number || "Serial Number",
    },
    { accessorKey: "supplier", header: translations.supplier || "Supplier" },
    {
        accessorKey: "price",
        header: translations.price || "Price",
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
        header: translations.served_to || "Served To",
        cell: ({ row }) => <div>{row.original.service?.name || "N/A"}</div>,
    },
    {
        accessorKey: "actions",
        header: translations.actions || "Actions",
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-1">
                        <Icon icon="mdi:dots-vertical" className="w-5 h-5" />
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
                                <span>
                                    {translations.intervention ||
                                        "Intervention"}
                                </span>
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
                                <span>{translations.edit || "Edit"}</span>
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
                                    <span>
                                        {translations.delete || "Delete"}
                                    </span>
                                </div>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        {translations.confirm_deletion ||
                                            "Confirm Deletion"}
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {translations.confirm_delete_message
                                            ? translations.confirm_delete_message.replace(
                                                  "{name}",
                                                  row.original.name
                                              )
                                            : `Are you sure you want to delete the product "${row.original.name}"?`}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        {translations.cancel || "Cancel"}
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() =>
                                            handleDelete(row.original)
                                        }
                                        disabled={router.isProcessing}
                                    >
                                        {router.isProcessing
                                            ? translations.deleting ||
                                              "Deleting..."
                                            : translations.confirm || "Confirm"}
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
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                    <ProductDataExport data={products.data} />
                    <Link href={route("products.create")}>
                        <Button>
                            {translations.add_product || "Add Product"}
                        </Button>
                    </Link>
                </div>
            </div>
            <DataTable
                data={products}
                columns={columns}
                filters={filters}
                routeName="products.index"
                title={translations.product_list || "Product List"}
                sortOptions={sortOptions}
                searchPlaceholder={
                    translations.search_by_name_or_supplier ||
                    "Search by name or supplier..."
                }
                emptyMessage={
                    translations.no_products_found || "No products found"
                }
                showHeader={false}
            />
        </div>
    </Layout>
);

};

export default ProductList;
