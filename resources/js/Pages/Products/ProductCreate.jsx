import React from "react";
import { usePage } from "@inertiajs/react";
import { Link, useForm } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Layout from "@/Layouts/Layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ProductCreate = () => {
    const { auth, services } = usePage().props;
    const canManageProducts = auth?.abilities?.can_manage_products;

    const form = useForm({
        name: "",
        serial_number: "",
        supplier: "",
        quantity: 0,
        price: 0,
        served_to: null, // Change from "" to null
    });

    if (!canManageProducts) {
        return (
            <Layout>
                <div className="text-center text-2xl font-bold mx-4 my-20">
                    You do not have permission to view this page.
                </div>
            </Layout>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post(route("products.store"), {
            onSuccess: () => form.reset(),
            onError: (errors) => console.log(errors),
        });
    };

    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-4xl font-bold mb-4">Add New Product</h1>

                {form.recentlySuccessful && (
                    <Alert className="mb-4">
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>
                            Product created successfully!
                        </AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                            id="name"
                            type="text"
                            value={form.data.name}
                            onChange={(e) =>
                                form.setData("name", e.target.value)
                            }
                            className="mt-1"
                        />
                        {form.errors.name && (
                            <p className="text-red-500 text-sm">
                                {form.errors.name}
                            </p>
                        )}
                    </div>

                    {/* Serial Number */}
                    <div>
                        <Label htmlFor="serial_number">Serial Number</Label>
                        <Input
                            id="serial_number"
                            type="text"
                            value={form.data.serial_number}
                            onChange={(e) =>
                                form.setData("serial_number", e.target.value)
                            }
                            className="mt-1"
                        />
                        {form.errors.serial_number && (
                            <p className="text-red-500 text-sm">
                                {form.errors.serial_number}
                            </p>
                        )}
                    </div>

                    {/* supplier */}
                    <div>
                        <Label htmlFor="supplier">Supplier</Label>
                        <Input
                            id="supplier"
                            type="text"
                            value={form.data.supplier}
                            onChange={(e) =>
                                form.setData("supplier", e.target.value)
                            }
                            className="mt-1"
                        />
                        {form.errors.supplier && (
                            <p className="text-red-500 text-sm">
                                {form.errors.supplier}
                            </p>
                        )}
                    </div>

                    {/* Quantity */}
                    <div>
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                            id="quantity"
                            type="number"
                            value={form.data.quantity}
                            onChange={(e) =>
                                form.setData("quantity", e.target.value)
                            }
                            className="mt-1"
                        />
                        {form.errors.quantity && (
                            <p className="text-red-500 text-sm">
                                {form.errors.quantity}
                            </p>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <Label htmlFor="price">Price</Label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={form.data.price}
                            onChange={(e) =>
                                form.setData("price", e.target.value)
                            }
                            className="mt-1"
                        />
                        {form.errors.price && (
                            <p className="text-red-500 text-sm">
                                {form.errors.price}
                            </p>
                        )}
                    </div>

                    {/* Service */}
                    <div>
                        <Label htmlFor="served_to">Service</Label>
                        <Select
                            value={form.data.served_to?.toString() || ""} // Read value as string for display
                            onValueChange={
                                (value) =>
                                    form.setData(
                                        "served_to",
                                        value ? parseInt(value) : null
                                    ) // Convert to number or null
                            }
                        >
                            <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                                {services.map((service) => (
                                    <SelectItem
                                        key={service.id}
                                        value={service.id.toString()} // Send as string for dropdown
                                    >
                                        {service.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {form.errors.served_to && (
                            <p className="text-red-500 text-sm">
                                {form.errors.served_to}
                            </p>
                        )}
                    </div>

                    <Button type="submit" disabled={form.processing}>
                        {form.processing ? "Saving..." : "Create Product"}
                    </Button>
                </form>
            </div>
        </Layout>
    );
};

export default ProductCreate;
