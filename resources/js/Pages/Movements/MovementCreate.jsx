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
    const {
        auth,
        products: allProducts,
        services,
        user_service_id,
    } = usePage().props;
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

    if (!user_service_id) {
        return (
            <Layout>
                <div className="text-center text-xl text-red-500 mx-4 my-20">
                    You need to be assigned to a service to create movements
                </div>
            </Layout>
        );
    }

    // Filter products available in user's service
    const availableProducts = allProducts.filter(
        (product) =>
            product.served_to &&
            product.served_to.toString() === user_service_id.toString()
    );

    const handleProductSelect = (productId) => {
        const product = availableProducts.find((p) => p.id === productId);

        if (!product) {
            toast.error("Product not found");
            form.setData("product_id", null);
            return;
        }

        // Use setData while preserving from_service_id
        form.setData({
            ...form.data,
            product_id: product.id,
            quantity: product.quantity,
        });
    };

    const form = useForm({
        product_id: null,
        from_service_id: parseInt(user_service_id), // Use parseInt to ensure it's a number
        to_service_id: null,
        quantity: 0,
        note: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post(route("movements.store"), form.data, {
            onSuccess: () => {
                toast.success("Movement recorded!");
                form.reset();
            },
            onError: (errors) => {
                console.error("Form errors:", errors); // Add this line
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
                                const productId = parseInt(value);
                                form.setData("product_id", productId);
                                handleProductSelect(productId);
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a product" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableProducts.map((product) => (
                                    <SelectItem
                                        key={product.id}
                                        value={product.id.toString()}
                                    >
                                        {product.name} (Available:{" "}
                                        {product.quantity})
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

                    <input
                        type="hidden"
                        name="from_service_id"
                        value={user_service_id}
                    />

                    {/* To Service */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            To Service
                        </label>
                        <Select
                            value={form.data.to_service_id?.toString() || ""}
                            onValueChange={(value) => {
                                form.setData("to_service_id", parseInt(value));
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select destination service" />
                            </SelectTrigger>
                            <SelectContent>
                                {services
                                    .filter(
                                        (service) =>
                                            service.id !== user_service_id
                                    ) // Add this filter
                                    .map((service) => (
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
