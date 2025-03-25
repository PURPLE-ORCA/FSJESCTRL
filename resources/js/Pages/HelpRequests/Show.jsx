// resources/js/Pages/HelpRequests/Show.jsx
import React, { useContext } from "react";
import { Head, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    ArrowLeft,
    Calendar,
    Clock,
    User,
    AlertCircle,
    Package,
    Barcode,
    Building2,
    ShoppingCart,
    DollarSign,
    ClipboardList,
    Activity,
    FileText,
    CheckCircle,
} from "lucide-react";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Avatar } from "@/Components/ui/avatar";
import { TranslationContext } from "@/context/TranslationProvider";

export default function Show({ auth, helpRequest }) {
    const { translations } = useContext(TranslationContext);

    // Format date helper function
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    // Helper to get status badge color
    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "in_progress":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "completed":
                return "bg-green-100 text-green-800 border-green-200";
            case "cancelled":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    // Helper to get action icon
    const getActionIcon = (action) => {
        switch (action.toLowerCase()) {
            case "created":
                return <Package className="h-4 w-4 text-green-500" />;
            case "updated":
                return <Activity className="h-4 w-4 text-blue-500" />;
            case "repaired":
                return <CheckCircle className="h-4 w-4 text-purple-500" />;
            case "inspected":
                return <FileText className="h-4 w-4 text-amber-500" />;
            default:
                return <Activity className="h-4 w-4 text-gray-500" />;
        }
    };

    return (
        <Layout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        {translations.help_request_details ||
                            "Help Request Details"}
                    </h2>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={route("help-requests.index")}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {translations.back_to_list || "Back to List"}
                        </Link>
                    </Button>
                </div>
            }
        >
            <Head
                title={
                    translations.help_request_details || "Help Request Details"
                }
            />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Request Information Card */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xl flex items-center">
                                    <AlertCircle className="mr-2 h-5 w-5 text-blue-500" />
                                    {translations.help_request_information ||
                                        "Help Request Information"}
                                </CardTitle>
                                <Badge
                                    className={`font-medium capitalize px-3 py-1 ${getStatusColor(
                                        helpRequest.status
                                    )}`}
                                    variant="outline"
                                >
                                    {helpRequest.status.replace("_", " ")}
                                </Badge>
                            </div>
                            <CardDescription>
                                {translations.details_about_support_request ||
                                    "Details about the support request"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-start space-x-3">
                                    <User className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            {translations.requested_by ||
                                                "Requested By"}
                                        </p>
                                        <p className="font-medium text-gray-900">
                                            {helpRequest.user.name}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            {translations.date_requested ||
                                                "Date Requested"}
                                        </p>
                                        <p className="font-medium text-gray-900">
                                            {formatDate(helpRequest.created_at)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3 mt-6">
                                <AlertCircle className="h-5 w-5 text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-2">
                                        {translations.description ||
                                            "Description"}
                                    </p>
                                    <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">
                                        {helpRequest.description}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Product Information Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center">
                                <Package className="mr-2 h-5 w-5 text-purple-500" />
                                {translations.product_information ||
                                    "Product Information"}
                            </CardTitle>
                            <CardDescription>
                                {translations.details_about_related_product ||
                                    "Details about the related product"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-start space-x-3">
                                    <Package className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            {translations.product_name ||
                                                "Product Name"}
                                        </p>
                                        <p className="font-medium text-gray-900">
                                            {helpRequest.product.name}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <Barcode className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            {translations.serial_number ||
                                                "Serial Number"}
                                        </p>
                                        <p className="font-medium text-gray-900">
                                            {helpRequest.product.serial_number}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            {translations.supplier ||
                                                "Supplier"}
                                        </p>
                                        <p className="font-medium text-gray-900">
                                            {helpRequest.product.supplier}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action History Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center">
                                <ClipboardList className="mr-2 h-5 w-5 text-green-500" />
                                {translations.action_history ||
                                    "Action History"}
                            </CardTitle>
                            <CardDescription>
                                {translations.timeline_of_actions ||
                                    "Timeline of actions performed on this product"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {helpRequest.product.action_logs &&
                            helpRequest.product.action_logs.length > 0 ? (
                                <div className="relative space-y-4 max-h-96 overflow-y-auto p-1">
                                    {/* Timeline line */}
                                    <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                                    {helpRequest.product.action_logs.map(
                                        (log) => (
                                            <div
                                                key={log.id}
                                                className="flex items-start space-x-4 relative"
                                            >
                                                {/* Timeline dot */}
                                                <div className="z-10 flex-shrink-0 mt-1 w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-gray-200">
                                                    {getActionIcon(log.action)}
                                                </div>
                                                {/* Content */}
                                                <div className="flex-grow bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-gray-300 transition-colors">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h4 className="font-medium text-gray-900">
                                                                {log.action}
                                                            </h4>
                                                            <p className="text-sm text-gray-500 mt-1">
                                                                {formatDate(
                                                                    log.created_at
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <div className="text-right">
                                                                <span className="text-sm font-medium text-gray-700">
                                                                    {
                                                                        log.user
                                                                            .name
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 text-gray-700">
                                                        <p>{log.details}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-12 border rounded-md bg-gray-50">
                                    <ClipboardList className="mx-auto h-12 w-12 text-gray-300" />
                                    <p className="mt-4 text-gray-500">
                                        {translations.no_action_history ||
                                            "No action history available for this product."}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
