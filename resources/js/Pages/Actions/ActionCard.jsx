import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

const ActionCard = ({ action }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded((prev) => !prev);
    };
    return (
        <div
            onClick={toggleExpand}
            className="bg-white dark:bg-black rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4 hover:shadow-xl transition duration-150 cursor-pointer"
        >
            {/* Collapsed view: Show product name and action type */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Icon
                        icon="mdi:information-outline"
                        className="w-6 h-6 text-main"
                    />
                    <span className="font-bold text-lg text-gray-900 dark:text-white">
                        {action.product?.name || "N/A"}
                    </span>
                    <span className="text-gray-500">-</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                        {action.action}
                    </span>
                </div>
                <div className="text-lg text-gray-500 dark:text-gray-400">
                    {new Date(action.created_at).toLocaleTimeString()}
                </div>
            </div>

            {/* Expanded view: Show additional details */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 overflow-hidden"
                    >
                        <div className="mt-4 border-t pt-4 space-y-2">
                            <div className="flex items-center">
                                <Icon
                                    icon="mdi:account"
                                    className="w-5 h-5 text-main mr-2"
                                />
                                <span className="font-semibold text-sm">
                                    User:
                                </span>
                                <span className="ml-1 text-sm text-gray-600">
                                    {action.user?.name || "N/A"}
                                </span>
                            </div>
                            {action.details && (
                                <div className="flex items-center">
                                    <Icon
                                        icon="mdi:note-text-outline"
                                        className="w-5 h-5 text-main mr-2"
                                    />
                                    <span className="font-semibold text-sm">
                                        Details:
                                    </span>
                                    <span className="ml-1 text-sm text-gray-600">
                                        {action.details}
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center">
                                <Icon
                                    icon="mdi:calendar"
                                    className="w-5 h-5 text-main mr-2"
                                />
                                <span className="font-semibold text-sm">
                                    Date:
                                </span>
                                <span className="ml-1 text-sm text-gray-600">
                                    {new Date(
                                        action.created_at
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ActionCard;
