import React, { useState, useContext } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { TranslationContext } from "@/context/TranslationProvider";

const MovementCard = ({ movement }) => {
    const [expanded, setExpanded] = useState(false);
    const { translations } = useContext(TranslationContext);

    const toggleExpand = () => {
        setExpanded((prev) => !prev);
    };

    return (
        <div
            onClick={toggleExpand}
            className="bg-white dark:bg-black rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4 hover:shadow-xl transition duration-150 cursor-pointer"
        >
            {/* Collapsed view: only from, to, and time */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Icon
                        icon="mdi:truck-delivery"
                        className="w-6 h-6 text-main"
                    />
                    <span className="font-bold text-lg text-gray-900 dark:text-white">
                        {movement.from_service?.name ||
                            translations.na ||
                            "N/A"}
                    </span>
                    <span className="text-gray-500">
                        {translations.to || "to"}
                    </span>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">
                        {movement.to_service?.name || translations.na || "N/A"}
                    </span>
                </div>
                <div className="text-lg text-gray-500 dark:text-gray-400">
                    {new Date(movement.movement_date).toLocaleTimeString()}
                </div>
            </div>

            {/* Animated expanded content */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 overflow-hidden"
                    >
                        <div className="border-t pt-4">
                            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                                <div className="flex items-center">
                                    <Icon
                                        icon="mdi:package-variant"
                                        className="w-5 h-5 text-main mr-2"
                                    />
                                    <span className="font-semibold text-lg">
                                        {translations.product
                                            ? translations.product + ":"
                                            : "Product:"}
                                    </span>
                                    <span className="ml-1 text-lg text-gray-600">
                                        {movement.product?.name ||
                                            translations.na ||
                                            "N/A"}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <Icon
                                        icon="mdi:counter"
                                        className="w-5 h-5 text-main mr-2"
                                    />
                                    <span className="font-semibold text-lg">
                                        {translations.quantity
                                            ? translations.quantity + ":"
                                            : "Quantity:"}
                                    </span>
                                    <span className="ml-1 text-lg text-gray-600">
                                        {movement.quantity}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <Icon
                                        icon="mdi:account"
                                        className="w-5 h-5 text-main mr-2"
                                    />
                                    <span className="font-semibold text-lg">
                                        {translations.user
                                            ? translations.user + ":"
                                            : "User:"}
                                    </span>
                                    <span className="ml-1 text-lg text-gray-600">
                                        {movement.user?.name ||
                                            translations.na ||
                                            "N/A"}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <Icon
                                        icon="mdi:calendar"
                                        className="w-5 h-5 text-main mr-2"
                                    />
                                    <span className="font-semibold text-lg">
                                        {translations.date
                                            ? translations.date + ":"
                                            : "Date:"}
                                    </span>
                                    <span className="ml-1 text-lg text-gray-600">
                                        {new Date(
                                            movement.movement_date
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex items-center col-span-2">
                                    <Icon
                                        icon="mdi:note"
                                        className="w-5 h-5 text-main mr-2"
                                    />
                                    <span className="font-semibold text-lg">
                                        {translations.note
                                            ? translations.note + ":"
                                            : "Note:"}
                                    </span>
                                    <span className="ml-1 text-lg text-gray-600">
                                        {movement.note ||
                                            translations.no_note ||
                                            "No note"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MovementCard;
