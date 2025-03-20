// resources/js/Pages/HelpRequests/Create.jsx
import React from "react";
import { Head, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Layout from "@/Layouts/Layout";
import { Textarea } from "@/Components/ui/textarea";

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
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Help Request
                </h2>
            }
        >
            <Head title="Create Help Request" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <InputLabel
                                        htmlFor="product_id"
                                        value="Product"
                                    />
                                    <select
                                        id="product_id"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.product_id}
                                        onChange={(e) =>
                                            setData(
                                                "product_id",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">
                                            Select a product
                                        </option>
                                        {products.map((product) => (
                                            <option
                                                key={product.id}
                                                value={product.id}
                                            >
                                                {product.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.product_id}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mb-4">
                                    <InputLabel
                                        htmlFor="description"
                                        value="Description"
                                    />
                                    <Textarea
                                        id="description"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        rows={4}
                                    />
                                    <InputError
                                        message={errors.description}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton
                                        className="ml-4"
                                        disabled={processing}
                                    >
                                        Submit Request
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
