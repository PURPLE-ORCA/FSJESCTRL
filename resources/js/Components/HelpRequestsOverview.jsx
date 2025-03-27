import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const HelpRequestsOverview = ({ data }) => {
    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                label: "Help Requests",
                data: Object.values(data).map((item) => item.total),
                backgroundColor: [
                    "#F59E0B", // Pending
                    "#3B82F6", // In Progress
                    "#22C55E", // Resolved
                    "#EF4444", // Closed
                ],
                borderColor: "#ffffff",
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Help Requests</h3>
            <Doughnut data={chartData} />
        </div>
    );
};

export default HelpRequestsOverview;
