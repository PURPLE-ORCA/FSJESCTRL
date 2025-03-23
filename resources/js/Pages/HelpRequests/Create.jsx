// resources/js/Pages/HelpRequests/Create.jsx
import React from "react";
import { Head, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Label } from "@/Components/ui/label";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import {
    HelpCircle,
    Package,
    FileText,
    ArrowLeft,
    AlertTriangle,
    Send,
} from "lucide-react";
import { Link } from "@inertiajs/react";

export default function Create({ auth, products }) {
    const { data, setData, errors, post, processing } = useForm({
        product_id: "",
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("help-requests.store"));
    };

    return (
        <Layout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight flex items-center">
                        <HelpCircle className="mr-2 h-5 w-5 text-blue-500" />
                        Create Help Request
                    </h2>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={route("help-requests.index")}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to List
                        </Link>
                    </Button>
                </div>
            }
        >
            <Head title="Create Help Request" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center">
                                <FileText className="mr-2 h-5 w-5 text-blue-500" />
                                New Help Request
                            </CardTitle>
                            <CardDescription>
                                Please fill out the details below to submit a
                                new help request
                            </CardDescription>
                        </CardHeader>
                        <form onSubmit={handleSubmit}>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <Package className="mr-2 h-4 w-4 text-gray-500" />
                                        <Label
                                            htmlFor="product_id"
                                            className="font-medium"
                                        >
                                            Product
                                        </Label>
                                    </div>
                                    <Select
                                        value={data.product_id}
                                        onValueChange={(value) =>
                                            setData("product_id", value)
                                        }
                                    >
                                        <SelectTrigger className="w-full">
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
                                    {errors.product_id && (
                                        <Alert
                                            variant="destructive"
                                            className="py-2 mt-2"
                                        >
                                            <AlertTriangle className="h-4 w-4" />
                                            <AlertDescription>
                                                {errors.product_id}
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <FileText className="mr-2 h-4 w-4 text-gray-500" />
                                        <Label
                                            htmlFor="description"
                                            className="font-medium"
                                        >
                                            Description
                                        </Label>
                                    </div>
                                    <Textarea
                                        id="description"
                                        placeholder="Please describe your issue in detail..."
                                        className="resize-y min-h-32"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.description && (
                                        <Alert
                                            variant="destructive"
                                            className="py-2 mt-2"
                                        >
                                            <AlertTriangle className="h-4 w-4" />
                                            <AlertDescription>
                                                {errors.description}
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                    <p className="text-sm text-gray-500 mt-1">
                                        Please include any relevant details that
                                        might help us resolve your issue.
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between border-t pt-6">
                                <Button variant="outline" type="button" asChild>
                                    <Link href={route("help-requests.index")}>
                                        Cancel
                                    </Link>
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="gap-2"
                                >
                                    <Send className="h-4 w-4" />
                                    Submit Request
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
