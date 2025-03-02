import React from "react";
import { usePage } from "@inertiajs/react";
import { useForm, router } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/Layouts/Layout";
import { toast } from "sonner";

const MovementCreate = () => {
    const { auth, products, services } = usePage().props;
    const canManageMovements = auth?.abilities?.can_manage_movements;

    if (!canManageMovements) {
        return (
            <Layout>
                <div className="text-center text-2xl font-bold mx-4 my-20">
                    You do not have permission to view this page.
                </div>
            </Layout>
        );
    }

    const form = useForm({
        product_id: null, // Change to null
        from_service_id: null, // Change to null
        to_service_id: null, // Change to null
        quantity: 0,
        note: "",
    });

    // Fetch product details when selected
    const handleProductSelect = (productId) => {
        const product = products.find((p) => p.id === parseInt(productId));
        if (product) {
            form.setData({
                product_id: product.id, // Set as number
                from_service_id: product.served_to, // Keep as number
                quantity: product.quantity,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("movements.store"), form.data, {
            onSuccess: () => {
                toast.success("Movement recorded!");
                form.reset();
            },
            onError: (errors) => {
                const firstError = Object.values(errors)[0];
                toast.error(firstError);
            },
        });
    };

    return (
        <Layout>
            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">Create Movement</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Product Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Product
                        </label>
                        <Select
                            onValueChange={(value) => {
                                form.setData("product_id", value);
                                handleProductSelect(value);
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a product" />
                            </SelectTrigger>
                            <SelectContent>
                                {products.map((product) => (
                                    <SelectItem
                                        key={product.id}
                                        value={product.id.toString()}
                                    >
                                        {product.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {form.errors.product_id && (
                            <p className="text-red-500 text-sm">
                                {form.errors.product_id}
                            </p>
                        )}
                    </div>

                    {/* From Service (Auto-filled) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            From Service
                        </label>
                        <Input
                            value={
                                services.find(
                                    (s) =>
                                        s.id ===
                                        parseInt(form.data.from_service_id)
                                )?.name || ""
                            }
                            disabled
                            className="mt-1"
                        />
                    </div>

                    {/* To Service */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            To Service
                        </label>
                        <Select
                            value={form.data.to_service_id?.toString() || ""}
                            onValueChange={(value) => {
                                form.setData("to_service_id", parseInt(value)); // Convert to number
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select destination service" />
                            </SelectTrigger>
                            <SelectContent>
                                {services.map((service) => (
                                    <SelectItem
                                        key={service.id}
                                        value={service.id.toString()}
                                    >
                                        {service.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {form.errors.to_service_id && (
                            <p className="text-red-500 text-sm">
                                {form.errors.to_service_id}
                            </p>
                        )}
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Quantity
                        </label>
                        <Input
                            type="number"
                            value={form.data.quantity}
                            onChange={(e) => {
                                const value = parseInt(e.target.value) || 0;
                                form.setData("quantity", value);
                            }}
                            className="mt-1"
                            min={1}
                        />
                        {form.errors.quantity && (
                            <p className="text-red-500 text-sm">
                                {form.errors.quantity}
                            </p>
                        )}
                    </div>

                    {/* Note */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Note
                        </label>
                        <Input
                            type="text"
                            value={form.data.note}
                            onChange={(e) =>
                                form.setData("note", e.target.value)
                            }
                            className="mt-1"
                        />
                    </div>

                    <Button type="submit" disabled={form.processing}>
                        {form.processing ? "Saving..." : "Create Movement"}
                    </Button>
                </form>
            </div>
        </Layout>
    );
};

export default MovementCreate;
