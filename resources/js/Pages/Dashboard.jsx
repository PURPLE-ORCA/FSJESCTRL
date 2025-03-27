import { Icon } from "@iconify/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import QuickAccessBar from "@/Components/QuickAccessBar";
import { TranslationContext } from "@/context/TranslationProvider";
import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";
import { useContext } from "react";
import RecentMovements from "@/Components/RecentMovements";
import TopProducts from "@/Components/TopProducts";
// import MovementTrends from "@/Components/MovementTrends";
// import ServiceActivity from "@/Components/ServiceActivity";
// import HelpRequestsOverview from "@/Components/HelpRequestsOverview";

export default function Dashboard({
    stats,
    topProducts,
    // movementTrends,
    // serviceActivity,
    // helpRequests,
    movements,
}) {
    const { translations } = useContext(TranslationContext);

    return (
        <Layout>
            <Head title="Dashboard" />

            {/* Header Section */}
            <div className="flex justify-between items-center mt-8 mb-8 mr-6">
                <h1 className="text-3xl font-bold">{translations.dashboard}</h1>
                <QuickAccessBar />
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[
                    {
                        title: "movements",
                        value: stats.movements,
                        icon: "mdi:swap-horizontal",
                    },
                    {
                        title: "products",
                        value: stats.products,
                        icon: "mdi:package-variant",
                    },
                    {
                        title: "services",
                        value: stats.services,
                        icon: "mdi:cog",
                    },
                    {
                        title: "users",
                        value: stats.users,
                        icon: "mdi:account-group",
                    },
                ].map((stat) => (
                    <Card
                        key={stat.title}
                        className="col-span-full md:col-span-1"
                    >
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium flex items-center">
                                <Icon icon={stat.icon} className="mr-2" />
                                {translations[stat.title] || stat.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stat.value}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            
            {/* Tables Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Recent Movements */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>{translations.recent_movements || "Recent Movements"}</CardTitle>
                        <Icon icon="mdi:history" />
                    </CardHeader>
                    <CardContent>
                        <RecentMovements movements={movements} />
                    </CardContent>
                </Card>

                {/* Top Products */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>{translations.top_products || "Top Products"}</CardTitle>
                        <Icon icon="mdi:star" />
                    </CardHeader>
                    <CardContent>
                        <TopProducts products={topProducts} />
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            {/* <div className="grid grid-cols-4 lg:grid-cols-[2fr_1fr] gap-4 mb-8"> */}
                {/* Movement Trends */}
                {/* <Card className="col-span-full ">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Movement Trends</CardTitle>
                        <Icon icon="mdi:chart-line" />
                    </CardHeader>
                    <CardContent>
                        <MovementTrends data={movementTrends} />
                    </CardContent>
                </Card> */}

                {/* Service Activity */}
                {/* <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Service Activity</CardTitle>
                        <Icon icon="mdi:chart-pie" />
                    </CardHeader>
                    <CardContent>
                        <ServiceActivity data={serviceActivity} />
                    </CardContent>
                </Card> */}

                {/* Help Requests */}
                {/* <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Help Requests</CardTitle>
                        <Icon icon="mdi:help-circle" />
                    </CardHeader>
                    <CardContent>
                        <HelpRequestsOverview data={helpRequests} />
                    </CardContent>
                </Card> */}
            {/* </div> */}

        </Layout>
    );
}
