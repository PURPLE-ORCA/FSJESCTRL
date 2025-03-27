import React from "react";

const StatCard = ({ title, value, icon, className }) => {
    return (
        <div className={`p-6 rounded-lg shadow bg-white ${className}`}>
            <div className="flex items-center space-x-4">
                {icon && (
                    <div className="p-3 rounded-full bg-blue-100">{icon}</div>
                )}
                <div>
                    <h3 className="text-xl font-bold text-gray-800">{value}</h3>
                    <p className="text-gray-500">{title}</p>
                </div>
            </div>
        </div>
    );
};

export default StatCard;