// resources/js/Pages/HelpRequests/Index.jsx
import React, { useEffect, useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import NotificationBadge from "@/Components/NotificationBadge";
import Layout from "@/Layouts/Layout";

export default function Index({
    auth,
    helpRequests,
    pendingCount,
    currentFilter = "all",
}) {
    const [filter, setFilter] = useState(currentFilter);

    // Auto-refresh every 30 seconds as mentioned in the document
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ["helpRequests", "pendingCount"] });
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const updateStatus = (helpRequestId, newStatus) => {
        router.put(route("help-requests.update-status", helpRequestId), {
            status: newStatus,
        });
    };

    const handleFilterChange = (e) => {
        const newFilter = e.target.value;
        setFilter(newFilter);
        router.get(
            route("help-requests.index", { status: newFilter }),
            {},
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    // Helper function to get the appropriate status badge color
    const getStatusBadgeColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "in_progress":
                return "bg-blue-100 text-blue-800";
            case "resolved":
                return "bg-green-100 text-green-800";
            case "closed":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <Layout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Help Requests
                    </h2>
                    <NotificationBadge initialCount={pendingCount} />
                </div>
            }
        >
            <Head title="Help Requests" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {/* Filter Section */}
                            <div className="mb-6">
                                <label
                                    htmlFor="status-filter"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Filter by Status
                                </label>
                                <select
                                    id="status-filter"
                                    className="mt-1 block w-full md:w-64 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    value={filter}
                                    onChange={handleFilterChange}
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                    <option value="resolved">Resolved</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>

                            {helpRequests.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white">
                                        <thead>
                                            <tr>
                                                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    User
                                                </th>
                                                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Product
                                                </th>
                                                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Description
                                                </th>
                                                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Date
                                                </th>
                                                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {helpRequests.map((request) => (
                                                <tr key={request.id}>
                                                    <td className="py-4 px-4 border-b border-gray-200">
                                                        {request.user.name}
                                                    </td>
                                                    <td className="py-4 px-4 border-b border-gray-200">
                                                        {request.product.name}
                                                    </td>
                                                    <td className="py-4 px-4 border-b border-gray-200">
                                                        <div className="max-w-xs overflow-hidden text-ellipsis">
                                                            {
                                                                request.description
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 border-b border-gray-200">
                                                        <span
                                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(
                                                                request.status
                                                            )}`}
                                                        >
                                                            {request.status.replace(
                                                                "_",
                                                                " "
                                                            )}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4 border-b border-gray-200">
                                                        {new Date(
                                                            request.created_at
                                                        ).toLocaleDateString()}
                                                    </td>
                                                    <td className="py-4 px-4 border-b border-gray-200">
                                                        <div className="flex space-x-2">
                                                            {request.status ===
                                                                "pending" && (
                                                                <button
                                                                    onClick={() =>
                                                                        updateStatus(
                                                                            request.id,
                                                                            "in_progress"
                                                                        )
                                                                    }
                                                                    className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                                                                >
                                                                    Start
                                                                </button>
                                                            )}

                                                            {request.status ===
                                                                "in_progress" && (
                                                                <button
                                                                    onClick={() =>
                                                                        updateStatus(
                                                                            request.id,
                                                                            "resolved"
                                                                        )
                                                                    }
                                                                    className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                                                                >
                                                                    Resolve
                                                                </button>
                                                            )}

                                                            {request.status ===
                                                                "resolved" && (
                                                                <button
                                                                    onClick={() =>
                                                                        updateStatus(
                                                                            request.id,
                                                                            "closed"
                                                                        )
                                                                    }
                                                                    className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
                                                                >
                                                                    Close
                                                                </button>
                                                            )}

                                                            {/* Option to reopen closed requests */}
                                                            {request.status ===
                                                                "closed" && (
                                                                <button
                                                                    onClick={() =>
                                                                        updateStatus(
                                                                            request.id,
                                                                            "in_progress"
                                                                        )
                                                                    }
                                                                    className="px-3 py-1 bg-orange-600 text-white text-xs rounded hover:bg-orange-700"
                                                                >
                                                                    Reopen
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 border-b border-gray-200">
                                                        <div className="flex space-x-2">
                                                            {/* Existing status update buttons */}

                                                            {/* Add the View button */}
                                                            <Link
                                                                href={route(
                                                                    "help-requests.show",
                                                                    request.id
                                                                )}
                                                                className="px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700"
                                                            >
                                                                View
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">
                                        {filter === "all"
                                            ? "No help requests found."
                                            : `No ${filter} help requests found.`}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
