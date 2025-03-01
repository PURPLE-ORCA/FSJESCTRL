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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import { cn } from "@/lib/utils";

const UsersList = () => {
    const { auth, users, roles, services, filters } = usePage().props;
    const canManageUsers = auth?.abilities?.can_manage_users;

    if (!canManageUsers) {
        return (
            <Layout>
                <div className="text-center text-2xl font-bold mx-4 my-20">
                    You do not have permission to view this page.
                </div>
            </Layout>
        );
    }

    // Form for search/sorting
    const form = useForm({
        search: filters.search || "",
        sort_by: filters.sort_by || "name",
        sort_order: filters.sort_order || "asc",
    });

    // Table columns
    const columns = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "email", header: "Email" },
        {
            accessorKey: "role.name",
            header: "Role",
            cell: ({ row }) => <div>{row.original.role?.name || "N/A"}</div>,
        },
        {
            accessorKey: "service.name",
            header: "Service",
            cell: ({ row }) => <div>{row.original.service?.name || "N/A"}</div>,
        },
        {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    {/* Role Update Dropdown */}
                    <Select
                        value={row.original.role_id?.toString() || ""}
                        onValueChange={(value) =>
                            handleRoleUpdate(row.original, value)
                        }
                    >
                        <SelectTrigger className="w-36">
                            <SelectValue placeholder="Assign Role" />
                        </SelectTrigger>
                        <SelectContent>
                            {roles.map((role) => (
                                <SelectItem
                                    key={role.id}
                                    value={role.id.toString()}
                                >
                                    {role.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

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
                                    Are you sure you want to delete{" "}
                                    {row.original.name}?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => handleDelete(row.original)}
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

    // Handle role updates
    const handleRoleUpdate = (user, roleId) => {
        router.put(route("users.update", user.id), {
            role_id: roleId,
            service_id: user.service_id, // Preserve existing service
        });
    };

    // Handle user deletion
    const handleDelete = (user) => {
        router.delete(route("users.destroy", user.id), {
        });
    };

    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-4xl font-bold mb-4">User Management</h1>

                {/* Search and Sorting */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.get(route("users.index"), {
                            preserveScroll: true,
                            preserveState: true,
                        });
                    }}
                    className="flex justify-between items-center mb-4"
                >
                    <Input
                        type="text"
                        placeholder="Search by name or email..."
                        value={form.data.search}
                        onChange={(e) => form.setData("search", e.target.value)}
                        className="max-w-sm"
                    />
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
                                    sort_by: "email",
                                    sort_order: "desc",
                                });
                                form.submit();
                            }}
                        >
                            Sort by Email (Desc)
                        </Button>
                    </div>
                </form>

                {/* Table */}
                <Table columns={columns} data={users.data} />

                {/* Pagination */}
                <Pagination className="mt-6">
                    <PaginationContent>
                        {users.links.map((link, index) => {
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

export default UsersList;
