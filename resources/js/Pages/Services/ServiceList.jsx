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

const ServiceList = () => {
    const { auth, services, filters } = usePage().props;
    const canManageServices = auth?.abilities?.can_manage_services;
    const [editingService, setEditingService] = React.useState(null); // Track service being edited

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

    // Handle adding a new service
    const handleAddService = (e) => {
        e.preventDefault();
        router.post(route("services.store"), form.data, {
            onSuccess: () => {
                form.reset("name", "type");
            },
        });
    };

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
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    {/* Edit Link */}
                    <Link href={route("services.edit", row.original.id)}>
                        <Button variant="outline">Edit</Button>
                    </Link>

                    {/* Delete Button */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">Delete</Button>
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

                {/* Add Service Form */}
                <form onSubmit={handleAddService} className="mb-6 space-y-4">
                    <h2 className="text-2xl font-semibold">Add New Service</h2>

                    {/* Name Field */}
                    <div>
                        <Input
                            type="text"
                            placeholder="Enter service name"
                            value={form.data.name}
                            onChange={(e) =>
                                form.setData("name", e.target.value)
                            }
                            required
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            placeholder="Enter service description"
                            value={form.data.name}
                            onChange={(e) =>
                                form.setData("description", e.target.value)
                            }
                            required
                        />
                    </div>

                    {/* Type Field */}
                    <div>
                        <select
                            value={form.data.type}
                            onChange={(e) =>
                                form.setData("type", e.target.value)
                            }
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="magazine">Magazine</option>
                            <option value="it">IT</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" disabled={router.isProcessing}>
                        {router.isProcessing ? "Adding..." : "Add Service"}
                    </Button>
                </form>

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
