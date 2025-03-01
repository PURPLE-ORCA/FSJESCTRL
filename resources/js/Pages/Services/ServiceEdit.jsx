import React from "react";
import { usePage } from "@inertiajs/react";
import { Link, useForm, router } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/Layouts/Layout";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ServiceEdit = () => {
    const { auth, service } = usePage().props;
    const canManageServices = auth?.abilities?.can_manage_services;

    if (!canManageServices) {
        return (
            <Layout>
                <div className="text-center text-2xl font-bold mx-4 my-20">
                    You do not have permission to view this page.
                </div>
            </Layout>
        );
    }

    const form = useForm({
        name: service.name,
        description: service.description,
        type: service.type,
    });

    // In ServiceEdit.jsx
    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(route("services.update", service.id), form.data, {
        });
    };

    return (
        <Layout>
            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">Edit Service</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Name
                        </label>
                        <Input
                            id="name"
                            type="text"
                            value={form.data.name}
                            onChange={(e) =>
                                form.setData("name", e.target.value)
                            }
                            required
                        />
                        {form.errors.name && (
                            <p className="text-red-500 text-sm">
                                {form.errors.name}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Description
                        </label>
                        <Input
                            id="description"
                            type="text"
                            value={form.data.description}
                            onChange={(e) =>
                                form.setData("description", e.target.value)
                            }
                        />
                        {form.errors.description && (
                            <p className="text-red-500 text-sm">
                                {form.errors.description}
                            </p>
                        )}
                    </div>

                    {/* Type */}
                    <div>
                        <label
                            htmlFor="type"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Type
                        </label>
                        <select
                            id="type"
                            value={form.data.type}
                            onChange={(e) =>
                                form.setData("type", e.target.value)
                            }
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="magazine">Magazine</option>
                            <option value="service">Service</option>
                        </select>
                        {form.errors.type && (
                            <p className="text-red-500 text-sm">
                                {form.errors.type}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" disabled={form.processing}>
                        {form.processing ? "Saving..." : "Update Service"}
                    </Button>
                </form>
            </div>
        </Layout>
    );
};

export default ServiceEdit;
