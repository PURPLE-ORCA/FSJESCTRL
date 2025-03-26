import React, { useContext } from "react";
import { usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import MovementCard from "./MovementCard";
import StayOut from "@/Components/StayOut";
import SearchFilterBar from "@/Components/SearchFilterBar";
import PaginationLinks from "@/Components/PaginationLinks";
import MovementDataExport from "./MovementDataExport";
import { TranslationContext } from "@/context/TranslationProvider";

const MovementList = () => {
    const { auth, movements, filters, services } = usePage().props;
    const canViewMovements = auth?.abilities?.can_view_movements;
    const { translations } = useContext(TranslationContext);

    if (!canViewMovements) {
        return <StayOut />;
    }

    // Define sort options with translations
    const sortOptions = [
        { label: translations.movement_date || "Date", value: "movement_date" },
        {
            label: translations.product_name || "Product Name",
            value: "product_name",
        },
    ];

    // Define filter options with translations
    const filterOptions = [
        {
            name: "from_service_id",
            label: translations.from_service || "From Service",
            options:
                services?.map((service) => ({
                    label: service.name,
                    value: service.id.toString(),
                })) || [],
        },
        {
            name: "to_service_id",
            label: translations.to_service || "To Service",
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
                <h1 className="text-4xl font-bold mb-4">
                    {translations.stock_movements || "Stock Movements"}
                </h1>

                <SearchFilterBar
                    routeName="movements.index"
                    initialFilters={initialFilters}
                    searchPlaceholder={
                        translations.search_by_product_name ||
                        "Search by product name..."
                    }
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
                        {translations.no_movements_found ||
                            "No movements found. Try adjusting your search or filters."}
                    </div>
                )}

                <PaginationLinks links={movements.links} />
            </div>
        </Layout>
    );
};

export default MovementList;
