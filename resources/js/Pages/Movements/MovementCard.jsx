import React from "react";
import { Icon } from "@iconify/react";

const MovementCard = ({ movement }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition duration-150">
            <div className="flex items-center mb-4">
                <Icon
                    icon="mdi:package-variant"
                    className="w-6 h-6 text-blue-500 mr-2"
                />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {movement.product?.name || "N/A"}
                </h2>
            </div>
            <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                    <Icon
                        icon="mdi:truck-delivery"
                        className="w-5 h-5 inline-block mr-1"
                    />
                    <span className="font-semibold">From:</span>{" "}
                    {movement.from_service?.name || "N/A"}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                    <Icon
                        icon="mdi:storefront"
                        className="w-5 h-5 inline-block mr-1"
                    />
                    <span className="font-semibold">To:</span>{" "}
                    {movement.to_service?.name || "N/A"}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                    <Icon
                        icon="mdi:counter"
                        className="w-5 h-5 inline-block mr-1"
                    />
                    <span className="font-semibold">Quantity:</span>{" "}
                    {movement.quantity}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                    <Icon
                        icon="mdi:calendar"
                        className="w-5 h-5 inline-block mr-1"
                    />
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(movement.movement_date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                    <Icon
                        icon="mdi:account"
                        className="w-5 h-5 inline-block mr-1"
                    />
                    <span className="font-semibold">User:</span>{" "}
                    {movement.user?.name || "N/A"}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-2 italic">
                    <Icon
                        icon="mdi:note"
                        className="w-5 h-5 inline-block mr-1"
                    />
                    <span className="font-semibold">Note:</span>{" "}
                    {movement.note || "No note"}
                </p>
            </div>
        </div>
    );
};

export default MovementCard;
