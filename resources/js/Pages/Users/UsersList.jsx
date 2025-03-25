import React, { useContext } from "react";
import { usePage } from "@inertiajs/react";
import { Link, useForm, router,  } from "@inertiajs/react";
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
import StayOut from "@/Components/StayOut";
import { TranslationContext } from "@/context/TranslationProvider";

const UsersList = () => {
    const { auth, users, roles, services, filters } = usePage().props;
    const canManageUsers = auth?.abilities?.can_manage_users;
    const { translations } = useContext(TranslationContext);

    if (!canManageUsers) {
        return <StayOut />;
    }

    const form = useForm({
        search: filters.search || "",
        sort_by: filters.sort_by || "name",
        sort_order: filters.sort_order || "asc",
    });

    // Table columns
    const columns = [
        { accessorKey: "id", header: translations.id || "ID" },
        { accessorKey: "name", header: translations.name || "Name" },
        { accessorKey: "email", header: translations.email || "Email" },
        {
            accessorKey: "role.name",
            header: translations.role || "Role",
            cell: ({ row }) => (
                <div>
                    {row.original.role?.name ||
                        translations.no_role ||
                        "no role"}
                </div>
            ),
        },
        {
            accessorKey: "service.name",
            header: translations.service || "Service",
            cell: ({ row }) => (
                <div>
                    {row.original.service?.name ||
                        translations.no_service ||
                        "no service"}
                </div>
            ),
        },
        {
            accessorKey: "actions",
            header: translations.actions || "Actions",
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
                            <SelectValue
                                placeholder={
                                    translations.assign_role || "Assign Role"
                                }
                            />
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
                            <Button variant="destructive">
                                {translations.delete || "Delete"}
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
                                        : `Are you sure you want to delete ${row.original.name}?`}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>
                                    {translations.cancel || "Cancel"}
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => handleDelete(row.original)}
                                    disabled={router.isProcessing}
                                >
                                    {router.isProcessing
                                        ? translations.deleting || "Deleting..."
                                        : translations.confirm || "Confirm"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            ),
        },
    ];

    const handleRoleUpdate = (user, roleId) => {
        router.put(route("users.update", user.id), {
            role_id: roleId,
            service_id: user.service_id,
        });
    };

    // Handle user deletion
    const handleDelete = (user) => {
        router.delete(route("users.destroy", user.id), {});
    };

    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-4xl font-bold mb-4">
                    {translations.user_management || "User Management"}
                </h1>
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
                        placeholder={
                            translations.search_placeholder ||
                            "Search by name or email..."
                        }
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
                            {translations.sort_name_asc || "Sort by Name (Asc)"}
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
                            {translations.sort_email_desc ||
                                "Sort by Email (Desc)"}
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
