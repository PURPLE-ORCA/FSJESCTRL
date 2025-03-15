import React from "react";
import { usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import MovementCard from "./MovementCard";
import StayOut from "@/Components/StayOut";
import SearchFilterBar from "@/Components/SearchFilterBar";
import PaginationLinks from "@/Components/PaginationLinks";
import MovementDataExport from "./MovementDataExport";

const MovementList = () => {
    const { auth, movements, filters, services } = usePage().props;
    const canViewMovements = auth?.abilities?.can_view_movements;

    if (!canViewMovements) {
        return <StayOut />;
    }

    // Define sort options
    const sortOptions = [
        { label: "Date", value: "movement_date" },
        { label: "Product Name", value: "product_name" },
        { label: "Quantity", value: "quantity" },
    ];

    // Define filter options
    const filterOptions = [
        {
            name: "from_service_id",
            label: "From Service",
            options:
                services?.map((service) => ({
                    label: service.name,
                    value: service.id.toString(),
                })) || [],
        },
        {
            name: "to_service_id",
            label: "To Service",
            options:
                services?.map((service) => ({
                    label: service.name,
                    value: service.id.toString(),
                })) || [],
        },
    ];

    // Ensure filter values are set to "all" if not present
    const initialFilters = {
        ...filters,
        from_service_id: filters.from_service_id || "all",
        to_service_id: filters.to_service_id || "all",
    };

    // Create a separate component for export to prevent it from being part of the form
    const exportButton = <MovementDataExport data={movements.data} />;

    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-4xl font-bold mb-4">Stock Movements</h1>

                <SearchFilterBar
                    routeName="movements.index"
                    initialFilters={initialFilters}
                    searchPlaceholder="Search by product name..."
                    sortOptions={sortOptions}
                    filterOptions={filterOptions}
                    additionalControls={exportButton}
                />

                {movements.data.length > 0 ? (
                    <div className="flex flex-wrap justify-center flex-col gap-4">
                        {movements.data.map((movement, index) => (
                            <MovementCard
                                key={movement.id || index}
                                movement={movement}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        No movements found. Try adjusting your search or
                        filters.
                    </div>
                )}

                <PaginationLinks links={movements.links} />
            </div>
        </Layout>
    );
};

export default MovementList;
