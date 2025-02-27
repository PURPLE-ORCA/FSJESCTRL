import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <Layout>
            <Head title="Dashboard" />
            <div className="py-12">
                <h1>this is the dashboard page</h1>
            </div>
        </Layout>
    );
}
