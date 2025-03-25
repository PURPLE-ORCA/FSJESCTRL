// 1) Import and consume TranslationContext at the top
import React, { useContext } from "react";
import { usePage, Link, router } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { TranslationContext } from "@/context/TranslationProvider";
import { Button } from "@/components/ui/button";
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
import { MaterialSymbolsEdit } from "@/Components/MaterialSymbolsEdit";
import { MingcuteDeleteFill } from "@/Components/MingcuteDeleteFill";
import DataTable from "@/Components/DataTable/DataTable";
import StayOut from "@/Components/StayOut";

const ServiceList = () => {
    const { auth, services, filters } = usePage().props;
    const canManageServices = auth?.abilities?.can_manage_services;

    // Pull in translations
    const { translations } = useContext(TranslationContext);

    if (!canManageServices) {
        return <StayOut />;
    }

    // Handle deleting a service
    const handleDelete = (service) => {
        router.delete(route("services.destroy", service.id));
    };

    // Define sort options for the dropdown, using translations as labels
    const sortOptions = [
        { value: "name", label: translations.name || "Name" },
        { value: "type", label: translations.type || "Type" },
        { value: "id", label: translations.id || "ID" },
        {
            value: "users_count",
            label: translations.users_count || "Users Count",
        },
    ];

    // Table columns with translated headers and messages
    const columns = [
        {
            accessorKey: "id",
            header: translations.id || "ID",
        },
        {
            accessorKey: "name",
            header: translations.name || "Name",
        },
        {
            accessorKey: "description",
            header: translations.description || "Description",
        },
        {
            accessorKey: "type",
            header: translations.type || "Type",
        },
        {
            accessorKey: "users_count",
            header: translations.users_count || "Users Count",
            cell: ({ row }) => <div>{row.original.users_count || 0}</div>,
        },
        {
            accessorKey: "actions",
            header: translations.actions || "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    {/* Edit Link */}
                    <Link href={route("services.edit", row.original.id)}>
                        <Button variant="outline">
                            <MaterialSymbolsEdit />
                        </Button>
                    </Link>

                    {/* Delete Button */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button>
                                <MingcuteDeleteFill />
                            </Button>
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
                                        : `Are you sure you want to delete "${row.original.name}"?`}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>
                                    {translations.cancel || "Cancel"}
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => handleDelete(row.original)}
                                >
                                    {translations.confirm || "Confirm"}
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
                <DataTable
                    data={services}
                    columns={columns}
                    filters={filters}
                    routeName="services.index"
                    title={
                        translations.service_management || "Service Management"
                    }
                    addRoute={route("services.create")}
                    addLabel={translations.add_service || "Add Service"}
                    sortOptions={sortOptions}
                    searchPlaceholder={
                        translations.search_by_name || "Search by name..."
                    }
                    emptyMessage={
                        translations.no_services_found || "No services found"
                    }
                />
            </div>
        </Layout>
    );
};

export default ServiceList;
