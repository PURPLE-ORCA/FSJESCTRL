import React from "react";
import { usePage, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
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
import { cn } from "@/lib/utils";
import DataExport from "@/Components/DataExport";
import ActionCard from "./ActionCard";

const ActionList = () => {
    const { auth, actions, filters } = usePage().props;
    const canViewActions = auth?.abilities?.can_view_actions;

    if (!canViewActions) {
        return (
            <Layout>
                <div className="text-center text-2xl font-bold mx-4 my-20">
                    You do not have permission to view this page.
                </div>
            </Layout>
        );
    }

    // Form for search/filtering
    const form = useForm({
        search: filters.search || "",
    });

    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-4xl font-bold mb-4">Actions List</h1>

                {/* Search and Filters */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.get(route("actions.index"), {
                            preserveScroll: true,
                            preserveState: true,
                        });
                    }}
                    className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4"
                >
                    <Input
                        type="text"
                        placeholder="Search actions..."
                        value={form.data.search}
                        onChange={(e) => form.setData("search", e.target.value)}
                        className="max-w-sm"
                    />

                    <div className="flex gap-2">
                        <Button
                            onClick={() => {
                                form.setData({
                                    sort_by: "created_at",
                                    sort_order: "desc",
                                });
                                form.submit();
                            }}
                        >
                            Sort by Date (Desc)
                        </Button>

                        <DataExport data={actions.data} />
                    </div>
                </form>

                <div className="flex flex-wrap justify-center flex-col gap-4">
                    {actions.data.map((action, index) => (
                        <ActionCard key={index} action={action} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-6">
                    <Pagination className="mt-6">
                        <PaginationContent>
                            {actions.links.map((link, index) => {
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
            </div>
        </Layout>
    );
};

export default ActionList;
