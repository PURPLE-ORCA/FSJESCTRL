import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <Layout>
            <Head title="Dashboard" />
            <div className="py-12">
                <h1 className="text-4xl text-center font-bold">THIS IS THE DASHBOARD PAGE</h1>
            </div>
        </Layout>
    );
}
