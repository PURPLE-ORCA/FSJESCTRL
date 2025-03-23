import React, { useEffect, useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DataTable from "@/Components/DataTable/DataTable";

export default function Index({
    auth,
    helpRequests,
    currentFilter = "all",
}) {
    const [filter, setFilter] = useState(currentFilter);
    const { props } = usePage();

    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ["helpRequests", "pendingCount"] });
    }, 30000);

        return () => clearInterval(interval);
    }, []);

    const updateStatus = (helpRequestId, newStatus) => {
        router.put(route("help-requests.update-status", helpRequestId), {
            status: newStatus,
        });
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        router.get(
            route("help-requests.index", { status: newFilter }),
            {},
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const getStatusBadge = (status) => {
        const statusMap = {
            pending: {
                variant: "warning",
                label: "Pending",
                icon: "mdi:clock-outline",
            },
            in_progress: {
                variant: "info",
                label: "In Progress",
                icon: "mdi:progress-wrench",
            },
            resolved: {
                variant: "success",
                label: "Resolved",
                icon: "mdi:check-circle-outline",
            },
            closed: {
                variant: "secondary",
                label: "Closed",
                icon: "mdi:archive-outline",
            },
        };

        const statusInfo = statusMap[status] || statusMap.closed;
        const variantStyles = {
            warning: "bg-yellow-100 hover:bg-yellow-200 text-yellow-800",
            info: "bg-blue-100 hover:bg-blue-200 text-blue-800",
            success: "bg-green-100 hover:bg-green-200 text-green-800",
            secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
        };

        return (
            <Badge
                className={variantStyles[statusInfo.variant]}
                variant="outline"
            >
                <Icon icon={statusInfo.icon} className="mr-1 w-4 h-4" />
                {statusInfo.label}
            </Badge>
        );
    };

    const getActionButton = (request) => {
        const actions = {
            pending: {
                action: () => updateStatus(request.id, "in_progress"),
                icon: "mdi:play",
                label: "Start",
                className: "bg-blue-600 hover:bg-blue-700 text-white",
            },
            in_progress: {
                action: () => updateStatus(request.id, "resolved"),
                icon: "mdi:check",
                label: "Resolve",
                className: "bg-green-600 hover:bg-green-700 text-white",
            },
            resolved: {
                action: () => updateStatus(request.id, "closed"),
                icon: "mdi:archive",
                label: "Close",
                className: "bg-gray-600 hover:bg-gray-700 text-white",
            },
            closed: {
                action: () => updateStatus(request.id, "in_progress"),
                icon: "mdi:refresh",
                label: "Reopen",
                className: "bg-orange-600 hover:bg-orange-700 text-white",
            },
        };

        const actionInfo = actions[request.status];

        return (
            <Button
                onClick={actionInfo.action}
                size="sm"
                className={actionInfo.className}
            >
                <Icon icon={actionInfo.icon} className="mr-1 w-4 h-4" />
                {actionInfo.label}
            </Button>
        );
    };

    const columns = [
        {
            accessorKey: "user.name",
            header: "User",
            cell: ({ row }) => <div>{row.original.user.name}</div>,
        },
        {
            accessorKey: "product.name",
            header: "Product",
            cell: ({ row }) => <div>{row.original.product.name}</div>,
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => (
                <div
                    className="max-w-xs truncate"
                    title={row.original.description}
                >
                    {row.original.description}
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => getStatusBadge(row.original.status),
        },
        {
            accessorKey: "created_at",
            header: "Date",
            cell: ({ row }) => (
                <div>
                    {new Date(row.original.created_at).toLocaleString()}
                </div>
            ),
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
                                href={route(
                                    "help-requests.show",
                                    row.original.id
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    <Icon
                                        icon="mdi:eye-outline"
                                        width="24"
                                        height="24"
                                    />
                                    <span>View Details</span>
                                </div>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                getActionButton(row.original).props.onClick()
                            }
                        >
                            <div className="flex items-center gap-2">
                                <Icon
                                    icon={
                                        row.original.status === "pending"
                                            ? "mdi:play"
                                            : row.original.status ===
                                              "in_progress"
                                            ? "mdi:check"
                                            : row.original.status === "resolved"
                                            ? "mdi:archive"
                                            : "mdi:refresh"
                                    }
                                    width="24"
                                    height="24"
                                />
                                <span>
                                    {row.original.status === "pending"
                                        ? "Start"
                                        : row.original.status === "in_progress"
                                        ? "Resolve"
                                        : row.original.status === "resolved"
                                        ? "Close"
                                        : "Reopen"}
                                </span>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    const sortOptions = [
        { value: "created_at", label: "Date" },
        { value: "status", label: "Status" },
        { value: "user.name", label: "User" },
        { value: "product.name", label: "Product" },
    ];

    const filterOptions = [
        { value: "all", label: "All Statuses", icon: "mdi:filter-variant" },
        { value: "pending", label: "Pending", icon: "mdi:clock-outline" },
        {
            value: "in_progress",
            label: "In Progress",
            icon: "mdi:progress-wrench",
        },
        {
            value: "resolved",
            label: "Resolved",
            icon: "mdi:check-circle-outline",
        },
        { value: "closed", label: "Closed", icon: "mdi:archive-outline" },
    ];

    return (
        <Layout user={auth.user}>
            <div className="">
                <div className="overflow-hidden">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <Select
                                value={filter}
                                onValueChange={handleFilterChange}
                            >
                                <SelectTrigger className="w-[180px] border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {filterOptions.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Icon
                                                        icon={option.icon}
                                                        className="w-4 h-4"
                                                    />
                                                    {option.label}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {helpRequests.length > 0 ? (
                            <div className="mt-4">
                                <DataTable
                                    data={{ data: helpRequests }}
                                    columns={columns}
                                    filters={{ status: filter }}
                                    routeName="help-requests.index"
                                    title="Help Requests"
                                    sortOptions={sortOptions}
                                    searchPlaceholder="Search by user or product..."
                                    emptyMessage="No help requests found"
                                    showHeader={false}
                                    className="border rounded-lg"
                                />
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <Icon
                                    icon="mdi:inbox-outline"
                                    className="w-12 h-12 mx-auto text-gray-400"
                                />
                                <p className="mt-2 text-gray-600 text-sm">
                                    {filter === "all"
                                        ? "No help requests found."
                                        : `No ${filter.replace(
                                              "_",
                                              " "
                                          )} help requests found.`}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}