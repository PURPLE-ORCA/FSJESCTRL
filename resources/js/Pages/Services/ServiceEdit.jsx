import React, { useContext } from "react";
import { TranslationContext } from "@/context/TranslationProvider";
import { usePage } from "@inertiajs/react";
import { Link, useForm, router } from "@inertiajs/react";
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
import StayOut from "@/Components/StayOut";

const ServiceEdit = () => {
    const { auth, service } = usePage().props;
    const canManageServices = auth?.abilities?.can_manage_services;
    const { translations } = useContext(TranslationContext);

    if (!canManageServices) {
        return (
            <StayOut/>
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
        router.put(route("services.update", service.id), form.data, {});
    };

    return (
        <Layout>
            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">
                    {translations.edit_service || "Edit Service"}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <Label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            {translations.name || "Name"}
                        </Label>
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
                        <Label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            {translations.description || "Description"}
                        </Label>
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
                        <Label
                            htmlFor="type"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            {translations.type || "Type"}
                        </Label>
                        <Select
                            id="type"
                            value={form.data.type}
                            onChange={(value) => form.setData("type", value)}
                            className="w-full p-2 border rounded-md"
                        >
                            <SelectTrigger className="mt-1 w-full">
                                <SelectValue
                                    placeholder={
                                        translations.select_a_type ||
                                        "Select a type"
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="magazine">
                                    {translations.magazine || "Magazine"}
                                </SelectItem>
                                <SelectItem value="service">
                                    {translations.service || "Service"}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {form.errors.type && (
                            <p className="text-red-500 text-sm">
                                {form.errors.type}
                            </p>
                        )}
                    </div>

                    <Button type="submit" disabled={form.processing}>
                        {form.processing
                            ? translations.saving || "Saving..."
                            : translations.update_service || "Update Service"}
                    </Button>
                </form>
            </div>
        </Layout>
    );
};

export default ServiceEdit;
