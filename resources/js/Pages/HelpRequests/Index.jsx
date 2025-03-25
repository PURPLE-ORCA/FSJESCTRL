import React, { useState, useContext, useEffect } from "react";
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
import { TranslationContext } from "@/context/TranslationProvider";

export default function Index({ auth, helpRequests, currentFilter = "all" }) {
    const { props } = usePage();
    const [filter, setFilter] = useState(currentFilter);
    const { translations } = useContext(TranslationContext);

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
                label: translations.pending || "Pending",
                icon: "mdi:clock-outline",
            },
            in_progress: {
                variant: "info",
                label: translations.in_progress || "In Progress",
                icon: "mdi:progress-wrench",
            },
            resolved: {
                variant: "success",
                label: translations.resolved || "Resolved",
                icon: "mdi:check-circle-outline",
            },
            closed: {
                variant: "secondary",
                label: translations.closed || "Closed",
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
                label: translations.start || "Start",
                className: "bg-blue-600 hover:bg-blue-700 text-white",
            },
            in_progress: {
                action: () => updateStatus(request.id, "resolved"),
                icon: "mdi:check",
                label: translations.resolve || "Resolve",
                className: "bg-green-600 hover:bg-green-700 text-white",
            },
            resolved: {
                action: () => updateStatus(request.id, "closed"),
                icon: "mdi:archive",
                label: translations.close || "Close",
                className: "bg-gray-600 hover:bg-gray-700 text-white",
            },
            closed: {
                action: () => updateStatus(request.id, "in_progress"),
                icon: "mdi:refresh",
                label: translations.reopen || "Reopen",
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
            header: translations.user || "User",
            cell: ({ row }) => <div>{row.original.user.name}</div>,
        },
        {
            accessorKey: "product.name",
            header: translations.product || "Product",
            cell: ({ row }) => <div>{row.original.product.name}</div>,
        },
        {
            accessorKey: "description",
            header: translations.description || "Description",
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
            header: translations.status || "Status",
            cell: ({ row }) => getStatusBadge(row.original.status),
        },
        {
            accessorKey: "created_at",
            header: translations.date || "Date",
            cell: ({ row }) => (
                <div>{new Date(row.original.created_at).toLocaleString()}</div>
            ),
        },
        {
            accessorKey: "actions",
            header: translations.actions || "Actions",
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
                                    <span>
                                        {translations.view_details ||
                                            "View Details"}
                                    </span>
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
                                        ? translations.start || "Start"
                                        : row.original.status === "in_progress"
                                        ? translations.resolve || "Resolve"
                                        : row.original.status === "resolved"
                                        ? translations.close || "Close"
                                        : translations.reopen || "Reopen"}
                                </span>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    const sortOptions = [
        { value: "created_at", label: translations.date || "Date" },
        { value: "status", label: translations.status || "Status" },
        { value: "user.name", label: translations.user || "User" },
        { value: "product.name", label: translations.product || "Product" },
    ];

    const filterOptions = [
        {
            value: "all",
            label: translations.all_statuses || "All Statuses",
            icon: "mdi:filter-variant",
        },
        {
            value: "pending",
            label: translations.pending || "Pending",
            icon: "mdi:clock-outline",
        },
        {
            value: "in_progress",
            label: translations.in_progress || "In Progress",
            icon: "mdi:progress-wrench",
        },
        {
            value: "resolved",
            label: translations.resolved || "Resolved",
            icon: "mdi:check-circle-outline",
        },
        {
            value: "closed",
            label: translations.closed || "Closed",
            icon: "mdi:archive-outline",
        },
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
                                    <SelectValue
                                        placeholder={
                                            translations.filter_by_status ||
                                            "Filter by status"
                                        }
                                    />
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
                                    title={
                                        translations.help_requests ||
                                        "Help Requests"
                                    }
                                    sortOptions={sortOptions}
                                    searchPlaceholder={
                                        translations.search_by_user_or_product ||
                                        "Search by user or product..."
                                    }
                                    emptyMessage={
                                        translations.no_help_requests_found ||
                                        "No help requests found"
                                    }
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
                                        ? translations.no_help_requests_found ||
                                          "No help requests found."
                                        : translations.no_filtered_help_requests ||
                                          `No ${filter.replace(
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
