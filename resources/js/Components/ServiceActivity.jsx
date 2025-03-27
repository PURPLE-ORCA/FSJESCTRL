import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ServiceActivity = ({ data }) => {
    const chartData = {
        labels: data.map((item) => item.name),
        datasets: [
            {
                label: "Activity",
                data: data.map((item) => item.movements_count),
                backgroundColor: [
                    "#3B82F6",
                    "#22C55E",
                    "#F59E0B",
                    "#EF4444",
                    "#6366F1",
                ],
            },
        ],
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Service Activity</h3>
            <Pie data={chartData} />
        </div>
    );
};

export default ServiceActivity;
