import { Head, Link } from "@inertiajs/react";
import { ArrowRightCircle, Box, Clipboard, BarChart3 } from "lucide-react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome to DashControl" />
            <div className="bg-gradient-to-br from-main to-black min-h-screen text-white">
                <div className="relative flex min-h-screen flex-col">
                    <header className="w-full px-6 py-4 backdrop-blur-md border-b border-main sticky top-0 z-10">
                        <div className="max-w-7xl mx-auto flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <Box className="w-6 h-6 text-main" />
                                <span className="text-xl font-bold tracking-tight">
                                    DashControl
                                </span>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="flex items-center space-x-2 bg-main hover:bg-black text-white font-medium px-4 py-2 rounded-md transition duration-200"
                                    >
                                        <span>Dashboard</span>
                                        <ArrowRightCircle className="w-4 h-4" />
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="text-gray-300 hover:text-white px-4 py-2 rounded-md transition duration-200"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="bg-main hover:bg-black text-white font-medium px-4 py-2 rounded-md transition duration-200"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </header>

                    <main className="flex-1">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="py-16 md:py-24 lg:py-32">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                    <div>
                                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                                            Simplify Your Inventory Management
                                        </h1>
                                        <p className="text-lg text-gray-300 mb-8">
                                            Track, manage, and optimize your
                                            inventory with our powerful and
                                            intuitive dashboard. Get real-time
                                            insights and never run out of stock
                                            again.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Link
                                                href={
                                                    auth.user
                                                        ? route("dashboard")
                                                        : route("register")
                                                }
                                                className="bg-main hover:bg-black text-white font-medium px-6 py-3 rounded-md transition duration-200 text-center"
                                            >
                                                {auth.user
                                                    ? "Go to Dashboard"
                                                    : "Get Started"}
                                            </Link>
                                            <Link
                                                href="#features"
                                                className="bg-black hover:bg-main text-white font-medium px-6 py-3 rounded-md transition duration-200 text-center"
                                            >
                                                Learn More
                                            </Link>
                                        </div>
                                    </div>
                                    <div>
                                        <img
                                            src="img/umpoujdaLogo.png"
                                            alt=""
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div
                                id="features"
                                className="py-16 border-t border-gray-800"
                            >
                                <h2 className="text-3xl font-bold text-center mb-12">
                                    Key Features
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="bg-black p-6 rounded-lg">
                                        <div className="bg-main/20 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                                            <Clipboard className="w-6 h-6 text-main" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-3">
                                            Real-time Tracking
                                        </h3>
                                        <p className="text-gray-400">
                                            Monitor your inventory levels in
                                            real-time and receive alerts when
                                            stock is running low.
                                        </p>
                                    </div>
                                    <div className="bg-black p-6 rounded-lg">
                                        <div className="bg-main/20 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                                            <BarChart3 className="w-6 h-6 text-main" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-3">
                                            Advanced Analytics
                                        </h3>
                                        <p className="text-gray-400">
                                            Gain insights into product
                                            performance, sales trends, and
                                            inventory turnover rates.
                                        </p>
                                    </div>
                                    <div className="bg-black p-6 rounded-lg">
                                        <div className="bg-main/20 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                                            <Box className="w-6 h-6 text-main" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-3">
                                            Supplier Management
                                        </h3>
                                        <p className="text-gray-400">
                                            Manage supplier relationships and
                                            streamline your procurement process.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    <footer className="bg-black  py-8">
                        <div className="max-w-7xl mx-auto px-6 text-center">
                            <div className="flex items-center justify-center space-x-2 mb-4">
                                <Box className="w-5 h-5 text-main" />
                                <span className="text-lg font-bold">
                                    DashControl
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Designed and developed by EL MOUSSAOUI MOHAMMED
                                &copy; {new Date().getFullYear()}
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}
