import React from "react";
import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { Link } from "@inertiajs/react";
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

    if (!canManageServices) {
        return <StayOut/>;
    }

    // Handle deleting a service
    const handleDelete = (service) => {
        router.delete(route("services.destroy", service.id));
    };

    // Define sort options for the dropdown
    const sortOptions = [
        { value: "name", label: "Name" },
        { value: "type", label: "Type" },
        { value: "id", label: "ID" },
        { value: "users_count", label: "Users Count" },
    ];

    // Table columns
    const columns = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "description",
            header: "Description",
        },
        {
            accessorKey: "type",
            header: "Type",
        },
        {
            accessorKey: "users_count",
            header: "Users Count",
            cell: ({ row }) => <div>{row.original.users_count || 0}</div>,
        },
        {
            accessorKey: "actions",
            header: "Actions",
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
                                    Confirm Deletion
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete "
                                    {row.original.name}"?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => handleDelete(row.original)}
                                >
                                    Confirm
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
                    title="Service Management"
                    addRoute={route("services.create")}
                    addLabel="Add Service"
                    sortOptions={sortOptions}
                    searchPlaceholder="Search by name..."
                    emptyMessage="No services found"
                />
            </div>
        </Layout>
    );
};

export default ServiceList;
