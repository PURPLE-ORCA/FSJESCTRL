import React from "react";
import { usePage } from "@inertiajs/react";
import { Link, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { Icon } from "@iconify/react";

// Shadcn UI components
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
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

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

    // Redirect unauthorized users
    if (!canManageProducts) {
        return (
            <Layout>
                <Card className="max-w-md mx-auto my-20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Icon
                                icon="solar:shield-warning-broken"
                                className="w-6 h-6 text-yellow-500"
                            />
                            Access Denied
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Alert variant="destructive">
                            <Icon
                                icon="solar:lock-keyhole-broken"
                                className="h-4 w-4"
                            />
                            <AlertTitle>Permission Error</AlertTitle>
                            <AlertDescription>
                                You do not have permission to view this page.
                            </AlertDescription>
                        </Alert>
                        <Button className="mt-4 w-full" asChild>
                            <Link href={route("dashboard")}>
                                Return to Dashboard
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
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
            <div className="container max-w-4xl mx-auto py-8 px-4">
                <Card className="border shadow-sm">
                    <CardHeader className="pb-2">
                        <Breadcrumb className="mb-2">
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={route("dashboard")}>
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink
                                        href={route("products.index")}
                                    >
                                        Products
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink>Create</BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle className="text-2xl font-bold">
                                    Add New Product
                                </CardTitle>
                                <CardDescription className="mt-1">
                                    Create a new product in the inventory
                                </CardDescription>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link href={route("products.index")}>
                                    <Icon
                                        icon="solar:arrow-left-broken"
                                        className="mr-2 h-4 w-4"
                                    />
                                    Back to Products
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent>
                        {form.recentlySuccessful && (
                            <Alert className="mb-6 border-l-4 border-green-500 bg-green-50">
                                <Icon
                                    icon="solar:check-circle-broken"
                                    className="h-4 w-4 text-green-800"
                                />
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
                            className="space-y-6 py-4"
                        >
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Name */}
                                <div className="col-span-1">
                                    <Label
                                        htmlFor="name"
                                        className="text-base font-medium"
                                    >
                                        Product Name
                                    </Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter product name"
                                        value={form.data.name}
                                        onChange={(e) =>
                                            form.setData("name", e.target.value)
                                        }
                                        className="mt-1"
                                    />
                                    {form.errors.name && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            <Icon
                                                icon="solar:danger-triangle-broken"
                                                className="h-4 w-4"
                                            />
                                            {form.errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Serial Number */}
                                <div className="col-span-1">
                                    <Label
                                        htmlFor="serial_number"
                                        className="text-base font-medium"
                                    >
                                        Serial Number
                                    </Label>
                                    <Input
                                        id="serial_number"
                                        placeholder="Enter serial number"
                                        value={form.data.serial_number}
                                        onChange={(e) =>
                                            form.setData(
                                                "serial_number",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1"
                                    />
                                    {form.errors.serial_number && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            <Icon
                                                icon="solar:danger-triangle-broken"
                                                className="h-4 w-4"
                                            />
                                            {form.errors.serial_number}
                                        </p>
                                    )}
                                </div>

                                {/* Supplier */}
                                <div className="col-span-1">
                                    <Label
                                        htmlFor="supplier"
                                        className="text-base font-medium"
                                    >
                                        Supplier
                                    </Label>
                                    <Input
                                        id="supplier"
                                        placeholder="Enter supplier name"
                                        value={form.data.supplier}
                                        onChange={(e) =>
                                            form.setData(
                                                "supplier",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1"
                                    />
                                    {form.errors.supplier && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            <Icon
                                                icon="solar:danger-triangle-broken"
                                                className="h-4 w-4"
                                            />
                                            {form.errors.supplier}
                                        </p>
                                    )}
                                </div>

                                {/* Quantity */}
                                <div className="col-span-1">
                                    <div className="flex items-center justify-between">
                                        <Label
                                            htmlFor="quantity"
                                            className="text-base font-medium"
                                        >
                                            Quantity
                                        </Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-6 w-6"
                                                    >
                                                        <Icon
                                                            icon="solar:info-circle-broken"
                                                            className="h-4 w-4"
                                                        />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>
                                                        Number of items in stock
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <div className="mt-1 relative">
                                        <Input
                                            id="quantity"
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={form.data.quantity}
                                            onChange={(e) =>
                                                form.setData(
                                                    "quantity",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <Icon
                                                icon="solar:box-broken"
                                                className="h-4 w-4 text-gray-400"
                                            />
                                        </div>
                                    </div>
                                    {form.errors.quantity && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            <Icon
                                                icon="solar:danger-triangle-broken"
                                                className="h-4 w-4"
                                            />
                                            {form.errors.quantity}
                                        </p>
                                    )}
                                </div>

                                {/* Price */}
                                <div className="col-span-1">
                                    <Label
                                        htmlFor="price"
                                        className="text-base font-medium"
                                    >
                                        Price
                                    </Label>
                                    <div className="mt-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">
                                                $
                                            </span>
                                        </div>
                                        <Input
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            placeholder="0.00"
                                            value={form.data.price}
                                            onChange={(e) =>
                                                form.setData(
                                                    "price",
                                                    e.target.value
                                                )
                                            }
                                            className="pl-7"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <Icon
                                                icon="solar:tag-price-broken"
                                                className="h-4 w-4 text-gray-400"
                                            />
                                        </div>
                                    </div>
                                    {form.errors.price && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            <Icon
                                                icon="solar:danger-triangle-broken"
                                                className="h-4 w-4"
                                            />
                                            {form.errors.price}
                                        </p>
                                    )}
                                </div>

                                {/* Service */}
                                <div className="col-span-1 md:col-span-2">
                                    <Label
                                        htmlFor="served_to"
                                        className="text-base font-medium"
                                    >
                                        Associated Service
                                    </Label>
                                    <Select
                                        value={
                                            form.data.served_to?.toString() ||
                                            ""
                                        }
                                        onValueChange={(value) =>
                                            form.setData(
                                                "served_to",
                                                value ? parseInt(value) : null
                                            )
                                        }
                                    >
                                        <SelectTrigger
                                            id="served_to"
                                            className="mt-1 w-full"
                                        >
                                            <SelectValue placeholder="Select a service" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {services.map((service) => (
                                                <SelectItem
                                                    key={service.id}
                                                    value={service.id.toString()}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Icon
                                                            icon={
                                                                service.type ===
                                                                "magazine"
                                                                    ? "solar:book-broken"
                                                                    : "solar:widget-broken"
                                                            }
                                                            className="h-4 w-4"
                                                        />
                                                        <span>
                                                            {service.name}
                                                        </span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {form.errors.served_to && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            <Icon
                                                icon="solar:danger-triangle-broken"
                                                className="h-4 w-4"
                                            />
                                            {form.errors.served_to}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-5 border-t mt-8">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => form.reset()}
                                    disabled={form.processing}
                                >
                                    <Icon
                                        icon="solar:refresh-broken"
                                        className="mr-2 h-4 w-4"
                                    />
                                    Reset
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={form.processing}
                                >
                                    {form.processing ? (
                                        <>
                                            <Icon
                                                icon="solar:refresh-circle-broken"
                                                className="mr-2 h-4 w-4 animate-spin"
                                            />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Icon
                                                icon="solar:add-circle-broken"
                                                className="mr-2 h-4 w-4"
                                            />
                                            Create Product
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
};

export default ProductCreate;
