import { TranslationContext } from "@/context/TranslationProvider";
import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";
import { useContext } from "react";

export default function Dashboard() {
        const { translations } = useContext(TranslationContext);

    return (
        <Layout>
            <Head title="Dashboard" />
            <div className="py-12">
                <h1 className="text-4xl text-center font-bold">{translations.dashboard}</h1>
            </div>
        </Layout>
    );
}
