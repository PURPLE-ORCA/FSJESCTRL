import React, { useContext } from "react";
import { usePage, Link, useForm, router } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import jsPDF from "jspdf";
import { Icon } from "@iconify/react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
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
import { TranslationContext } from "@/context/TranslationProvider";
import StayOut from "@/Components/StayOut";

const MovementCreate = () => {
    const {
        auth,
        products: allProducts,
        services,
        user_service_id,
    } = usePage().props;
    const canManageMovements = auth?.abilities?.can_manage_movements;
    const { translations } = useContext(TranslationContext);

    const form = useForm({
        product_id: null,
        from_service_id: parseInt(user_service_id),
        to_service_id: null,
        note: "",
    });

    if (!canManageMovements) {
        return (
            <StayOut/>
        );
    }

    if (!user_service_id) {
        return (
            <Layout>
                <Card className="max-w-md mx-auto my-20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ArrowLeft className="w-6 h-6 text-yellow-500" />
                            {translations.service_required ||
                                "Service Required"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Alert variant="destructive">
                            <ArrowLeft className="h-4 w-4" />
                            <AlertTitle>
                                {translations.missing_assignment ||
                                    "Missing Assignment"}
                            </AlertTitle>
                            <AlertDescription>
                                {translations.need_assignment ||
                                    "You need to be assigned to a service to create movements."}
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

    const availableProducts = allProducts.filter(
        (product) => product.current_location?.id === user_service_id
    );

    const handleProductSelect = (productId) => {
        const product = availableProducts.find((p) => p.id === productId);

        if (!product) {
            toast.error(translations.product_not_found || "Product not found");
            form.setData("product_id", null);
            return;
        }

        if (product.current_location?.id !== user_service_id) {
            toast.error(
                translations.product_not_in_service ||
                    "Product is not assigned to your service"
            );
            form.setData("product_id", null);
            return;
        }

        form.setData({
            ...form.data,
            product_id: product.id,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post(route("movements.store"), form.data, {
            onSuccess: () => {
                toast.success(
                    translations.movement_created_successfully ||
                        "Movement created successfully!"
                );
                form.reset();
            },
            onError: (errors) => {
                console.error("Form errors:", errors);
                const firstError = Object.values(errors)[0];
                toast.error(firstError);
            },
        });
    };

    const exportMovementPaper = () => {
        const product = availableProducts.find(
            (p) => p.id === form.data.product_id
        );
        const toService = services.find(
            (s) => s.id === form.data.to_service_id
        );
        const fromService = services.find(
            (s) => s.id === parseInt(user_service_id)
        );

        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // Header background
        doc.setFillColor(30, 144, 255); // DodgerBlue
        doc.rect(0, 0, pageWidth, 40, "F");

        // Header title with translation
        doc.setFontSize(22);
        doc.setTextColor(255, 255, 255);
        doc.text(
            translations.movement_paper || "Movement Paper",
            pageWidth / 2,
            25,
            { align: "center" }
        );

        // Content border
        doc.setLineWidth(0.5);
        doc.setDrawColor(0, 0, 0);
        doc.rect(10, 50, pageWidth - 20, 100);

        // Body content with translations
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        const contentX = 14;
        let contentY = 60;
        const lineSpacing = 10;

        doc.text(
            `${
                translations.date || "Date"
            }: ${new Date().toLocaleDateString()}`,
            contentX,
            contentY
        );
        contentY += lineSpacing;
        doc.text(
            `${translations.product || "Product"}: ${
                product ? product.name : "N/A"
            }`,
            contentX,
            contentY
        );
        contentY += lineSpacing;
        doc.text(
            `${translations.from_service || "From Service"}: ${
                fromService ? fromService.name : user_service_id
            }`,
            contentX,
            contentY
        );
        contentY += lineSpacing;
        doc.text(
            `${translations.to_service || "To Service"}: ${
                toService ? toService.name : "N/A"
            }`,
            contentX,
            contentY
        );
        contentY += lineSpacing;
        doc.text(
            `${translations.note || "Note"}: ${
                form.data.note || translations.no_note || "No note"
            }`,
            contentX,
            contentY
        );

        // Footer branding
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(
            "Designed and developed by EL MOUSSAOUI MOHAMMED",
            pageWidth / 2,
            pageHeight - 10,
            { align: "center" }
        );

        doc.save("movement_paper.pdf");
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
                                        {translations.dashboard || "Dashboard"}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink
                                        href={route("movements.index")}
                                    >
                                        {translations.movements || "Movements"}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink>
                                        {translations.create || "Create"}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle className="text-2xl font-bold">
                                    {translations.create_new_movement ||
                                        "Create New Movement"}
                                </CardTitle>
                                <CardDescription className="mt-1">
                                    {translations.move_products_between_services ||
                                        "Move products between services"}
                                </CardDescription>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link href={route("movements.index")}>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    {translations.back_to_movements ||
                                        "Back to Movements"}
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent>
                        {form.recentlySuccessful && (
                            <Alert className="mb-6 border-l-4 border-green-500 bg-green-50">
                                <ArrowLeft className="h-4 w-4 text-green-800" />
                                <AlertTitle className="font-medium text-green-800">
                                    {translations.success || "Success"}
                                </AlertTitle>
                                <AlertDescription className="text-green-700">
                                    {translations.movement_created_successfully ||
                                        "Movement created successfully!"}
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
                                    <Label
                                        htmlFor="product"
                                        className="text-base font-medium"
                                    >
                                        {translations.product || "Product"}
                                    </Label>
                                    <Select
                                        value={
                                            form.data.product_id?.toString() ||
                                            ""
                                        }
                                        onValueChange={(value) => {
                                            const productId = parseInt(value);
                                            form.setData(
                                                "product_id",
                                                productId
                                            );
                                            handleProductSelect(productId);
                                        }}
                                    >
                                        <SelectTrigger
                                            id="product"
                                            className="mt-1 w-full"
                                        >
                                            <SelectValue
                                                placeholder={
                                                    translations.select_a_product ||
                                                    "Select a product"
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableProducts.map(
                                                (product) => (
                                                    <SelectItem
                                                        key={product.id}
                                                        value={product.id.toString()}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <ArrowLeft className="h-4 w-4" />
                                                            <span>
                                                                {product.name} (
                                                                {translations.available ||
                                                                    "Available"}
                                                                :{" "}
                                                                {
                                                                    product.quantity
                                                                }
                                                                )
                                                            </span>
                                                        </div>
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                    {form.errors.product_id && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            <ArrowLeft className="h-4 w-4" />
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
                                <div className="col-span-1 md:col-span-2">
                                    <Label
                                        htmlFor="to_service"
                                        className="text-base font-medium"
                                    >
                                        {translations.destination_service ||
                                            "Destination Service"}
                                    </Label>
                                    <Select
                                        value={
                                            form.data.to_service_id?.toString() ||
                                            ""
                                        }
                                        onValueChange={(value) => {
                                            form.setData(
                                                "to_service_id",
                                                parseInt(value)
                                            );
                                        }}
                                    >
                                        <SelectTrigger
                                            id="to_service"
                                            className="mt-1 w-full"
                                        >
                                            <SelectValue
                                                placeholder={
                                                    translations.select_destination_service ||
                                                    "Select destination service"
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {services
                                                .filter(
                                                    (service) =>
                                                        service.id !==
                                                        user_service_id
                                                )
                                                .map((service) => (
                                                    <SelectItem
                                                        key={service.id}
                                                        value={service.id.toString()}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <ArrowLeft className="h-4 w-4" />
                                                            <span>
                                                                {service.name}
                                                            </span>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                    {form.errors.to_service_id && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            <ArrowLeft className="h-4 w-4" />
                                            {form.errors.to_service_id}
                                        </p>
                                    )}
                                </div>

                                {/* Note */}
                                <div className="col-span-1">
                                    <Label
                                        htmlFor="note"
                                        className="text-base font-medium"
                                    >
                                        {translations.note || "Note"}
                                    </Label>
                                    <div className="mt-1 relative">
                                        <Input
                                            id="note"
                                            type="text"
                                            placeholder={
                                                translations.add_note_optional ||
                                                "Add a note (optional)"
                                            }
                                            value={form.data.note}
                                            onChange={(e) =>
                                                form.setData(
                                                    "note",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <ArrowLeft className="h-4 w-4 text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-5 border-t mt-8">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={exportMovementPaper}
                                >
                                    <Icon
                                        icon="eva:file-outline"
                                        width="24"
                                        height="24"
                                    />
                                    {translations.export_pdf || "Export PDF"}
                                </Button>
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
                                    {translations.reset || "Reset"}
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={form.processing}
                                >
                                    {form.processing ? (
                                        <>
                                            <ArrowLeft className="mr-2 h-4 w-4 animate-spin" />
                                            {translations.processing ||
                                                "Processing..."}
                                        </>
                                    ) : (
                                        <>
                                            <ArrowLeft className="mr-2 h-4 w-4" />
                                            {translations.create_movement ||
                                                "Create Movement"}
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

export default MovementCreate;
