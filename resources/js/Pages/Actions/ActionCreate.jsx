import React from "react";
import { usePage, useForm, Link } from "@inertiajs/react";
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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft } from "lucide-react";

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

    if (!canCreateActions) {
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
        form.post(route("actions.store"), {
            onSuccess: () => form.reset(),
            onError: (errors) => console.log(errors),
        });
    };

    return (
        <Layout>
            <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Link
                        href={route("actions.index")}
                        className="text-blue-600"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Actions
                    </Link>
                    <h1 className="text-3xl font-bold">Create New Action</h1>
                </div>

                {form.recentlySuccessful && (
                    <Alert>
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>
                            Action logged successfully.
                        </AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Product Selection */}
                    <div>
                        <Label htmlFor="product_id">Product</Label>
                        <Select
                            defaultValue={productIdFromUrl?.toString()}
                            onValueChange={(value) =>
                                form.setData(
                                    "product_id",
                                    value ? parseInt(value) : null
                                )
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a product" />
                            </SelectTrigger>
                            <SelectContent>
                                {products?.map(
                                    (
                                        product // Add optional chaining (?.)
                                    ) => (
                                        <SelectItem
                                            key={product.id}
                                            value={product.id.toString()}
                                        >
                                            {product.name}{" "}
                                            {product.serial_number &&
                                                `(${product.serial_number})`}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                        {form.errors.product_id && (
                            <p className="text-red-500 text-sm mt-1">
                                {form.errors.product_id}
                            </p>
                        )}
                    </div>

                    {/* Action Type */}
                    <div>
                        <Label htmlFor="action">Action Type</Label>
                        <Input
                            type="text"
                            placeholder="e.g., 'Added', 'Transferred', 'Updated'"
                            value={form.data.action}
                            onChange={(e) =>
                                form.setData("action", e.target.value)
                            }
                            className="w-full mt-1 shadow-sm"
                        />
                        {form.errors.action && (
                            <p className="text-red-500 text-sm mt-1">
                                {form.errors.action}
                            </p>
                        )}
                    </div>

                    {/* Details */}
                <div>
                        <Label htmlFor="details">Details (Optional)</Label>
                        <Input
                            type="text"
                            placeholder="Additional notes..."
                            value={form.data.details}
                            onChange={(e) =>
                                form.setData("details", e.target.value)
                            }
                            className="w-full mt-1 shadow-sm"
                        />
                        {form.errors.details && (
                            <p className="text-red-500 text-sm mt-1">
                                {form.errors.details}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="mt-4"
                        disabled={form.processing}
                    >
                        {form.processing ? "Logging Action..." : "Log Action"}
                    </Button>
                </form>
            </div>
        </Layout>
    );
};

export default ActionCreate;
