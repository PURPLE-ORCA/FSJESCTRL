import React, { useContext } from "react";
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
import { TranslationContext } from "@/context/TranslationProvider";

const ServiceCreate = () => {
    const { auth } = usePage().props;
    const canManageServices = auth?.abilities?.can_manage_services;
    const { translations } = useContext(TranslationContext);

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
                            {translations.acces_denied || "Access Denied"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Alert variant="destructive">
                            <Icon
                                icon="solar:lock-keyhole-broken"
                                className="h-4 w-4"
                            />
                            <AlertTitle>
                                {translations.permission_error ||
                                    "Permission Error"}
                            </AlertTitle>
                            <AlertDescription>
                                {translations.no_permission ||
                                    "You do not have permission to access this page."}
                            </AlertDescription>
                        </Alert>
                        <Button className="mt-4 w-full" asChild>
                            <Link href={route("dashboard")}>
                                {translations.return_to_dashboard ||
                                    "Return to Dashboard"}
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
                toast.success(
                    translations.service_created_successfully ||
                        "Service created successfully"
                );
                form.reset();
            },
            onError: () => {
                toast.error(
                    translations.failed_to_create_service ||
                        "Failed to create service"
                );
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
                                        {translations.Dashboard || "Dashboard"}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink
                                        href={route("services.index")}
                                    >
                                        {translations.services || "Services"}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink>
                                        {" "}
                                        {translations.create || "Create"}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <div className="flex justify-between items-center">
                            <CardTitle className="text-2xl font-bold">
                                {translations.create_new_service ||
                                    "Create New Service"}
                            </CardTitle>
                            <Button variant="outline" size="sm" asChild>
                                <Link href={route("services.index")}>
                                    <Icon
                                        icon="solar:arrow-left-broken"
                                        className="mr-2 h-4 w-4"
                                    />
                                    {translations.back_to_services ||
                                        "Back to Services"}
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
                                    {translations.service_name ||
                                        "Service Name"}
                                </Label>
                                <Input
                                    id="name"
                                    placeholder={
                                        translations.enter_service_name ||
                                        "Enter service name"
                                    }
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
                                    {translations.description || "Description"}
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder={
                                        translations.enter_service_description ||
                                        "Enter service description"
                                    }
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
                                    {translations.service_type ||
                                        "Service Type"}
                                </Label>
                                <Select
                                    value={form.data.type}
                                    onValueChange={(value) =>
                                        form.setData("type", value)
                                    }
                                >
                                    <SelectTrigger id="type" className="w-full">
                                        <SelectValue
                                            placeholder={
                                                translations.select_a_type ||
                                                "Select a type"
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="magazine">
                                            <div className="flex items-center gap-2">
                                                <Icon
                                                    icon="solar:book-broken"
                                                    className="h-4 w-4"
                                                />
                                                <span>
                                                    {translations.magazine ||
                                                        "Magazine"}
                                                </span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="service">
                                            <div className="flex items-center gap-2">
                                                <Icon
                                                    icon="solar:widget-broken"
                                                    className="h-4 w-4"
                                                />
                                                <span>
                                                    {translations.service ||
                                                        "Service"}
                                                </span>
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
                                    {translations.reset || "Reset"}
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
                                        ? translations.creating || "Creating..."
                                        : translations.create_service ||
                                          "Create Service"}
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
