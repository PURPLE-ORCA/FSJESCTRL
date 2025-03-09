import React from "react";
import { usePage, useForm, Link, router } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
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

const ActionCreate = () => {
    const { auth, products, query } = usePage().props;
    const canCreateActions = auth?.abilities?.can_view_actions;

    // Get product_id from URL query parameter (with optional chaining)
    const productIdFromUrl = query?.product_id
        ? parseInt(query.product_id)
        : null;

    const form = useForm({
        product_id: productIdFromUrl || null,
        action: "",
        details: "",
    });

    // Redirect unauthorized users
    if (!canCreateActions) {
        return (
            <Layout>
                <Card className="max-w-md mx-auto my-20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ArrowLeft className="w-6 h-6 text-yellow-500" />
                            Access Denied
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Alert variant="destructive">
                            <ArrowLeft className="h-4 w-4" />
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

        router.post(route("actions.store"), form.data, {
            onSuccess: () => {
                toast.success("Action logged successfully!");
                form.reset();
            },
            onError: (errors) => {
                console.error("Form errors:", errors);
                const firstError = Object.values(errors)[0];
                toast.error(firstError);
            },
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
                                        href={route("actions.index")}
                                    >
                                        Actions
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
                                    Create New Action
                                </CardTitle>
                                <CardDescription className="mt-1">
                                    Log actions for products in the system
                                </CardDescription>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link href={route("actions.index")}>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Actions
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent>
                        {form.recentlySuccessful && (
                            <Alert className="mb-6 border-l-4 border-green-500 bg-green-50">
                                <ArrowLeft className="h-4 w-4 text-green-800" />
                                <AlertTitle className="font-medium text-green-800">
                                    Success
                                </AlertTitle>
                                <AlertDescription className="text-green-700">
                                    Action logged successfully!
                                </AlertDescription>
                            </Alert>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6 py-4"
                        >
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Product Selection */}
                                <div className="col-span-1 md:col-span-2">
                                    <div className="flex items-center justify-between">
                                        <Label
                                            htmlFor="product"
                                            className="text-base font-medium"
                                        >
                                            Product
                                        </Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-6 w-6"
                                                    >
                                                        <ArrowLeft className="h-4 w-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>
                                                        Select a product to log
                                                        an action for
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Select
                                        defaultValue={productIdFromUrl?.toString()}
                                        onValueChange={(value) =>
                                            form.setData(
                                                "product_id",
                                                value ? parseInt(value) : null
                                            )
                                        }
                                    >
                                        <SelectTrigger
                                            id="product"
                                            className="mt-1 w-full"
                                        >
                                            <SelectValue placeholder="Select a product" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {products?.map((product) => (
                                                <SelectItem
                                                    key={product.id}
                                                    value={product.id.toString()}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <ArrowLeft className="h-4 w-4" />
                                                        <span>
                                                            {product.name}{" "}
                                                            {product.serial_number &&
                                                                `(${product.serial_number})`}
                                                        </span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {form.errors.product_id && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            <ArrowLeft className="h-4 w-4" />
                                            {form.errors.product_id}
                                        </p>
                                    )}
                                </div>

                                {/* Action Type */}
                                <div className="col-span-1">
                                    <div className="flex items-center justify-between">
                                        <Label
                                            htmlFor="action"
                                            className="text-base font-medium"
                                        >
                                            Action Type
                                        </Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-6 w-6"
                                                    >
                                                        <ArrowLeft className="h-4 w-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>
                                                        Type of action performed
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <div className="mt-1 relative">
                                        <Input
                                            id="action"
                                            type="text"
                                            placeholder="e.g., 'Added', 'Transferred', 'Updated'"
                                            value={form.data.action}
                                            onChange={(e) =>
                                                form.setData(
                                                    "action",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <ArrowLeft className="h-4 w-4 text-gray-400" />
                                        </div>
                                    </div>
                                    {form.errors.action && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            <ArrowLeft className="h-4 w-4" />
                                            {form.errors.action}
                                        </p>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="col-span-1">
                                    <Label
                                        htmlFor="details"
                                        className="text-base font-medium"
                                    >
                                        Details (Optional)
                                    </Label>
                                    <div className="mt-1 relative">
                                        <Input
                                            id="details"
                                            type="text"
                                            placeholder="Additional notes..."
                                            value={form.data.details}
                                            onChange={(e) =>
                                                form.setData(
                                                    "details",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <ArrowLeft className="h-4 w-4 text-gray-400" />
                                        </div>
                                    </div>
                                    {form.errors.details && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            <ArrowLeft className="h-4 w-4" />
                                            {form.errors.details}
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
                                            <ArrowLeft className="mr-2 h-4 w-4 animate-spin" />
                                            Logging Action...
                                        </>
                                    ) : (
                                        <>
                                            <ArrowLeft className="mr-2 h-4 w-4" />
                                            Log Action
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

export default ActionCreate;
