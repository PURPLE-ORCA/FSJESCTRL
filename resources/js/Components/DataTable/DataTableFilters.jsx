import React from "react";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const DataTableFilters = ({
    form,
    onSearch,
    onResetFilters,
    sortOptions = [],
    searchPlaceholder = "Search...",
    extraFilters = null,
}) => {
    const handleSearch = (e) => {
        e.preventDefault();
        onSearch();
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
            <form onSubmit={handleSearch} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search Input */}
                    <div className="flex-1">
                        <label
                            htmlFor="search"
                            className="text-sm font-medium mb-1 block"
                        >
                            Search
                        </label>
                        <div className="relative">
                            <Input
                                id="search"
                                type="text"
                                placeholder={searchPlaceholder}
                                value={form.data.search}
                                onChange={(e) =>
                                    form.setData("search", e.target.value)
                                }
                                className="w-full pl-10"
                            />
                            <Icon
                                icon="mdi:magnify"
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                            />
                        </div>
                    </div>

                    {/* Sort By */}
                    <div className="w-full md:w-64">
                        <label
                            htmlFor="sort_by"
                            className="text-sm font-medium mb-1 block"
                        >
                            Sort By
                        </label>
                        <Select
                            id="sort_by"
                            value={form.data.sort_by}
                            onValueChange={(value) => {
                                form.setData("sort_by", value);
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Sort by..." />
                            </SelectTrigger>
                            <SelectContent>
                                {sortOptions.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Sort Order */}
                    <div className="w-full md:w-64">
                        <label
                            htmlFor="sort_order"
                            className="text-sm font-medium mb-1 block"
                        >
                            Sort Order
                        </label>
                        <Select
                            id="sort_order"
                            value={form.data.sort_order}
                            onValueChange={(value) => {
                                form.setData("sort_order", value);
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Sort order..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="asc">Ascending</SelectItem>
                                <SelectItem value="desc">Descending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Extra Filters (if provided) */}
                {extraFilters}

                <div className="flex justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onResetFilters}
                        disabled={form.processing}
                    >
                        <Icon icon="mdi:refresh" className="mr-2 w-5 h-5" />
                        Reset Filters
                    </Button>

                    <Button type="submit" disabled={form.processing}>
                        <Icon icon="mdi:filter" className="mr-2 w-5 h-5" />
                        Apply Filters
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default DataTableFilters;