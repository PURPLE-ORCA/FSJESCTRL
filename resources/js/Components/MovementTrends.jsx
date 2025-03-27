import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

const MovementTrends = ({ data }) => {
    const chartData = {
        labels: data.map((item) => item.month),
        datasets: [
            {
                label: "Movements",
                data: data.map((item) => item.count),
                borderColor: "#3B82F6",
                backgroundColor: "#BFDBFE",
                fill: true,
            },
        ],
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Movement Trends</h3>
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                }}
            />
        </div>
    );
};

export default MovementTrends;
