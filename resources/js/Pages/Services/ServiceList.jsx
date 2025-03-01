import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { useForm, router } from "@inertiajs/react";
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
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
import { toast } from "sonner";
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
import { MaterialSymbolsEdit } from "@/Components/MaterialSymbolsEdit";
import { MingcuteDeleteFill } from "@/Components/MingcuteDeleteFill";

const ServiceList = () => {
    const { auth, services, filters } = usePage().props;
    const canManageServices = auth?.abilities?.can_manage_services;

    if (!canManageServices) {
        return (
            <Layout>
                <div className="text-center text-2xl font-bold mx-4 my-20">
                    You do not have permission to view this page.
                </div>
            </Layout>
        );
    }

    // Form for search/sorting and adding services
    const form = useForm({
        search: filters.search || "",
        sort_by: filters.sort_by || "name",
        sort_order: filters.sort_order || "asc",
        name: "",
        description: "",
        type: "magazine", // Default type
    });

    // Handle deleting a service
    const handleDelete = (service) => {
        router.delete(route("services.destroy", service.id));
    };

    // Table columns
    const columns = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "description", header: "Description" },
        { accessorKey: "type", header: "Type" },
        {
            accessorKey: "users_count",
            header: "Users Count",
            cell: ({ row }) => <div>{row.original.users_count || 0}</div>, // Default to 0 if null
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
                <h1 className="text-4xl font-bold mb-4">Service Management</h1>

                {/* Search and Sorting */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.get(route("services.index"), {
                            preserveScroll: true,
                            preserveState: true,
                        });
                    }}
                    className="flex justify-between items-center mb-4"
                >
                    {/* Search Input */}
                    <Input
                        type="text"
                        placeholder="Search by name..."
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
                                form.submit();
                            }}
                        >
                            Sort by Name (Asc)
                        </Button>
                        <Button
                            onClick={() => {
                                form.setData({
                                    sort_by: "type",
                                    sort_order: "desc",
                                });
                                form.submit();
                            }}
                        >
                            Sort by Type (Desc)
                        </Button>
                    </div>
                </form>

                {/* Table */}
                <Table columns={columns} data={services.data} />

                {/* Pagination */}
                <Pagination className="mt-6">
                    <PaginationContent>
                        {services.links.map((link, index) => {
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

export default ServiceList;
