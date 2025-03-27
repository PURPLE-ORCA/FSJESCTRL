import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { Heatmap } from "@/components/ui/heatmap";
import axios from "axios";

export default function DashboardAnalytics() {
    const [movements, setMovements] = useState([]);
    const [activeUsers, setActiveUsers] = useState([]);
    const [helpRequests, setHelpRequests] = useState([]);

    useEffect(() => {
        axios
            .get("/dashboard/movements-analysis")
            .then((res) => setMovements(res.data));
        axios
            .get("/dashboard/most-active-users")
            .then((res) => setActiveUsers(res.data));
        axios
            .get("/dashboard/help-requests-insights")
            .then((res) => setHelpRequests(res.data));
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Movements Heatmap */}
            <Card>
                <CardContent>
                    <h2 className="text-lg font-bold mb-2">
                        Movements Heatmap
                    </h2>
                    <Heatmap data={movements} />
                </CardContent>
            </Card>

            {/* Most Active Users Bar Chart */}
            <Card>
                <CardContent>
                    <h2 className="text-lg font-bold mb-2">
                        Most Active Users
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={activeUsers}>
                            <XAxis dataKey="user_id" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="total" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Help Requests Pie Chart */}
            <Card>
                <CardContent>
                    <h2 className="text-lg font-bold mb-2">
                        Help Requests Insights
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={helpRequests}
                                dataKey="total"
                                nameKey="status"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                            >
                                {helpRequests.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={
                                            [
                                                "#ff6384",
                                                "#36a2eb",
                                                "#ffce56",
                                                "#4bc0c0",
                                            ][index % 4]
                                        }
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
