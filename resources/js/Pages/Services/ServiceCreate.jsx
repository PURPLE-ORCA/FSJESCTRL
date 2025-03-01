import React from "react";
import { usePage } from "@inertiajs/react";
import { useForm, router } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/Layouts/Layout";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
const ServiceCreate = () => {
    const { auth } = usePage().props;
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
        name: "",
        description: "",
        type: "magazine", // Default type
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("services.store"), form.data, {
            onSuccess: () => {
                form.reset();
            },
        });
    };

    return (
        <Layout>
            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">Create Service</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name
                        </Label>
                        <Input
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
                        <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description
                        </Label>
                        <Input
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
                        <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Type
                        </Label>
                        <Select
                            value={form.data.type}
                            onChange={(e) =>
                                form.setData("type", e.target.value)
                            }
                            className="w-full p-2 border rounded-md"
                        >
                            <SelectTrigger className="mt-1 w-full">
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="magazine">
                                    Magazine
                                </SelectItem>
                                <SelectItem value="service">Service</SelectItem>
                            </SelectContent>
                        </Select>
                        {form.errors.type && (
                            <p className="text-red-500 text-sm">
                                {form.errors.type}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" disabled={form.processing}>
                        {form.processing ? "Creating..." : "Create Service"}
                    </Button>
                </form>
            </div>
        </Layout>
    );
};

export default ServiceCreate;