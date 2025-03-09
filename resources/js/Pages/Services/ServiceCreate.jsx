import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { useForm, router } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { toast } from "sonner";
import { Icon } from "@iconify/react";

// Shadcn UI components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ServiceCreate = () => {
    const { auth } = usePage().props;
    const canManageServices = auth?.abilities?.can_manage_services;

    // Redirect unauthorized users
    if (!canManageServices) {
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
                                You do not have permission to access this page.
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

    const form = useForm({
        name: "",
        description: "",
        type: "magazine", // Default type
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("services.store"), form.data, {
            onSuccess: () => {
                toast.success("Service created successfully");
                form.reset();
            },
            onError: () => {
                toast.error("Failed to create service");
            },
        });
    };

    return (
        <Layout>
            <div className="container max-w-3xl mx-auto py-8 px-4">
                <Card>
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
                                        href={route("services.index")}
                                    >
                                        Services
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink>Create</BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <div className="flex justify-between items-center">
                            <CardTitle className="text-2xl font-bold">
                                Create New Service
                            </CardTitle>
                            <Button variant="outline" size="sm" asChild>
                                <Link href={route("services.index")}>
                                    <Icon
                                        icon="solar:arrow-left-broken"
                                        className="mr-2 h-4 w-4"
                                    />
                                    Back to Services
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6 py-4"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-base">
                                    Service Name
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Enter service name"
                                    value={form.data.name}
                                    onChange={(e) =>
                                        form.setData("name", e.target.value)
                                    }
                                    className="w-full"
                                    required
                                />
                                {form.errors.name && (
                                    <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                        <Icon
                                            icon="solar:danger-triangle-broken"
                                            className="h-4 w-4"
                                        />
                                        {form.errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="description"
                                    className="text-base"
                                >
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Enter service description"
                                    value={form.data.description}
                                    onChange={(e) =>
                                        form.setData(
                                            "description",
                                            e.target.value
                                        )
                                    }
                                    className="w-full min-h-24"
                                />
                                {form.errors.description && (
                                    <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                        <Icon
                                            icon="solar:danger-triangle-broken"
                                            className="h-4 w-4"
                                        />
                                        {form.errors.description}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="type" className="text-base">
                                    Service Type
                                </Label>
                                <Select
                                    value={form.data.type}
                                    onValueChange={(value) =>
                                        form.setData("type", value)
                                    }
                                >
                                    <SelectTrigger id="type" className="w-full">
                                        <SelectValue placeholder="Select a type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="magazine">
                                            <div className="flex items-center gap-2">
                                                <Icon
                                                    icon="solar:book-broken"
                                                    className="h-4 w-4"
                                                />
                                                <span>Magazine</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="service">
                                            <div className="flex items-center gap-2">
                                                <Icon
                                                    icon="solar:widget-broken"
                                                    className="h-4 w-4"
                                                />
                                                <span>Service</span>
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {form.errors.type && (
                                    <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                        <Icon
                                            icon="solar:danger-triangle-broken"
                                            className="h-4 w-4"
                                        />
                                        {form.errors.type}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="mr-2"
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
                                    className="gap-2"
                                >
                                    <Icon
                                        icon="solar:add-circle-broken"
                                        className="h-4 w-4"
                                    />
                                    {form.processing
                                        ? "Creating..."
                                        : "Create Service"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
};

export default ServiceCreate;
