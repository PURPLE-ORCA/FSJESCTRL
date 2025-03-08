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
import { ArrowLeft } from "lucide-react";


const ProductCreate = () => {
    const { auth, services } = usePage().props;
    const canManageProducts = auth?.abilities?.can_manage_products;

    const form = useForm({
        name: "",
        serial_number: "",
        supplier: "",
        quantity: 0,
        price: 0,
        served_to: null, 
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
            <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-6">
                    Add New Product
                </h1>

                <div className="flex items-center gap-2 mb-4">
                    <Link
                        href={route("products.index")}
                        className="text-blue-600"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Products
                    </Link>
                    <h1 className="text-3xl font-bold">Create New Action</h1>
                </div>

                {form.recentlySuccessful && (
                    <Alert className="mb-6 border-l-4 border-green-500 bg-green-50">
                        <AlertTitle className="font-medium text-green-800">
                            Success
                        </AlertTitle>
                        <AlertDescription className="text-green-700">
                            Product created successfully!
                        </AlertDescription>
                    </Alert>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 bg-none p-6 rounded-lg shadow-sm border border-transparent"
                >
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Name */}
                        <div className="col-span-1">
                            <Label
                                htmlFor="name"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Product Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                value={form.data.name}
                                onChange={(e) =>
                                    form.setData("name", e.target.value)
                                }
                                className="mt-1 rounded-md  shadow-sm "
                            />
                            {form.errors.name && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.errors.name}
                                </p>
                            )}
                        </div>

                        {/* Serial Number */}
                        <div className="col-span-1">
                            <Label
                                htmlFor="serial_number"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Serial Number
                            </Label>
                            <Input
                                id="serial_number"
                                type="text"
                                value={form.data.serial_number}
                                onChange={(e) =>
                                    form.setData(
                                        "serial_number",
                                        e.target.value
                                    )
                                }
                                className="mt-1 shadow-sm"
                            />
                            {form.errors.serial_number && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.errors.serial_number}
                                </p>
                            )}
                        </div>

                        {/* Supplier */}
                        <div className="col-span-1">
                            <Label
                                htmlFor="supplier"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Supplier
                            </Label>
                            <Input
                                id="supplier"
                                type="text"
                                value={form.data.supplier}
                                onChange={(e) =>
                                    form.setData("supplier", e.target.value)
                                }
                                className="mt-1 shadow-sm"
                            />
                            {form.errors.supplier && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.errors.supplier}
                                </p>
                            )}
                        </div>

                        {/* Quantity */}
                        <div className="col-span-1">
                            <Label
                                htmlFor="quantity"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Quantity
                            </Label>
                            <Input
                                id="quantity"
                                type="number"
                                value={form.data.quantity}
                                onChange={(e) =>
                                    form.setData("quantity", e.target.value)
                                }
                                className="mt-1 shadow-sm"
                            />
                            {form.errors.quantity && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.errors.quantity}
                                </p>
                            )}
                        </div>

                        {/* Price */}
                        <div className="col-span-1">
                            <Label
                                htmlFor="price"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Price
                            </Label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">
                                        $
                                    </span>
                                </div>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    value={form.data.price}
                                    onChange={(e) =>
                                        form.setData("price", e.target.value)
                                    }
                                    className="pl-7 shadow-sm"
                                />
                            </div>
                            {form.errors.price && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.errors.price}
                                </p>
                            )}
                        </div>

                        {/* Service */}
                        <div className="col-span-1 md:col-span-2">
                            <Label
                                htmlFor="served_to"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Service
                            </Label>
                            <Select
                                value={form.data.served_to?.toString() || ""}
                                onValueChange={(value) =>
                                    form.setData(
                                        "served_to",
                                        value ? parseInt(value) : null
                                    )
                                }
                            >
                                <SelectTrigger className="mt-1 w-full">
                                    <SelectValue placeholder="Select a service" />
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
                            {form.errors.served_to && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.errors.served_to}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end pt-5">
                        <Button
                            type="submit"
                            disabled={form.processing}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-main hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {form.processing ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                "Create Product"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default ProductCreate;
