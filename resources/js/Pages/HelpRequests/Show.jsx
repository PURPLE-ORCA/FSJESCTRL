// resources/js/Pages/HelpRequests/Show.jsx
import React from "react";
import { Head, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

export default function Show({ auth, helpRequest }) {
    // Format date helper function
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <Layout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Help Request Details
                    </h2>
                    <Link
                        href={route('help-requests.index')}
                        className="px-4 py-2 bg-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-300"
                    >
                        Back to List
                    </Link>
                </div>
            }
        >
            <Head title="Help Request Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Help Request Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Requested By</p>
                                    <p className="font-medium">{helpRequest.user.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Status</p>
                                    <p className="font-medium capitalize">{helpRequest.status.replace('_', ' ')}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Date Requested</p>
                                    <p className="font-medium">{formatDate(helpRequest.created_at)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Last Updated</p>
                                    <p className="font-medium">{formatDate(helpRequest.updated_at)}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <p className="text-sm text-gray-600">Description</p>
                                    <p className="font-medium">{helpRequest.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Product Name</p>
                                    <p className="font-medium">{helpRequest.product.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Serial Number</p>
                                    <p className="font-medium">{helpRequest.product.serial_number}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Supplier</p>
                                    <p className="font-medium">{helpRequest.product.supplier}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Quantity</p>
                                    <p className="font-medium">{helpRequest.product.quantity}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Price</p>
                                    <p className="font-medium">${parseFloat(helpRequest.product.price).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Action History</h3>
                            
                            {helpRequest.product.action_logs && helpRequest.product.action_logs.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white">
                                        <thead>
                                            <tr>
                                                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Action
                                                </th>
                                                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Details
                                                </th>
                                                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Performed By
                                                </th>
                                                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Date
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {helpRequest.product.action_logs.map((log) => (
                                                <tr key={log.id}>
                                                    <td className="py-4 px-4 border-b border-gray-200">
                                                        {log.action}
                                                    </td>
                                                    <td className="py-4 px-4 border-b border-gray-200">
                                                        {log.details}
                                                    </td>
                                                    <td className="py-4 px-4 border-b border-gray-200">
                                                        {log.user.name}
                                                    </td>
                                                    <td className="py-4 px-4 border-b border-gray-200">
                                                        {formatDate(log.created_at)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No action history available for this product.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}