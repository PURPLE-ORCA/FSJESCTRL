import React, { useState } from "react";
import Logo from "@/Components/Logo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Bell,
    Menu,
    X,
    User,
    BarChart3,
    Activity,
    Inbox,
    Package,
} from "lucide-react";

const Navbar = () => {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <nav className="bg-main shadow">
            {/* Desktop & Tablet View */}
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center">
                                <Logo className="h-9 w-auto text-white" />
                                <span className="ml-2 font-bold text-white hidden md:block">
                                    DashControl
                                </span>
                            </Link>
                        </div>
                        <div className="hidden space-x-1 sm:-my-px sm:ml-6 sm:flex">
                            <NavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white/80 rounded-md transition duration-150 ease-in-out hover:bg-white/10 hover:text-white"
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                href={route("users.index")}
                                active={route().current("users.index")}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white/80 rounded-md transition duration-150 ease-in-out hover:bg-white/10 hover:text-white"
                            >
                                <User className="h-4 w-4 mr-1" />
                                Users
                            </NavLink>
                            <NavLink className="inline-flex items-center px-3 py-2 text-sm font-medium text-white/80 rounded-md transition duration-150 ease-in-out hover:bg-white/10 hover:text-white">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="inline-flex items-center gap-1">
                                        <Package className="h-4 w-4" />
                                        <span>Products</span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-white dark:bg-gray-800 py-1">
                                        <DropdownMenuItem
                                            asChild
                                            className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <Link
                                                href={route("products.create")}
                                            >
                                                Add Product
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            asChild
                                            className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <Link
                                                href={route("products.index")}
                                            >
                                                All Products
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </NavLink>
                            <NavLink className="inline-flex items-center px-3 py-2 text-sm font-medium text-white/80 rounded-md transition duration-150 ease-in-out hover:bg-white/10 hover:text-white">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="inline-flex items-center gap-1">
                                        <Activity className="h-4 w-4" />
                                        <span>Services</span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-white dark:bg-gray-800 py-1">
                                        <DropdownMenuItem
                                            asChild
                                            className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <Link
                                            // href={route("services.create")}
                                            >
                                                Add Service
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            asChild
                                            className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <Link
                                                href={route("services.index")}
                                            >
                                                All Services
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </NavLink>
                            <NavLink className="inline-flex items-center px-3 py-2 text-sm font-medium text-white/80 rounded-md transition duration-150 ease-in-out hover:bg-white/10 hover:text-white">
                                <Inbox className="h-4 w-4 mr-1" />
                                Mouvements
                            </NavLink>
                            <NavLink className="inline-flex items-center px-3 py-2 text-sm font-medium text-white/80 rounded-md transition duration-150 ease-in-out hover:bg-white/10 hover:text-white">
                                <Bell className="h-4 w-4 mr-1" />
                                Notifications
                            </NavLink>
                            <NavLink className="inline-flex items-center px-3 py-2 text-sm font-medium text-white/80 rounded-md transition duration-150 ease-in-out hover:bg-white/10 hover:text-white">
                                Actions
                            </NavLink>
                            <NavLink className="inline-flex items-center px-3 py-2 text-sm font-medium text-white/80 rounded-md transition duration-150 ease-in-out hover:bg-white/10 hover:text-white">
                                <BarChart3 className="h-4 w-4 mr-1" />
                                Analytics
                            </NavLink>
                        </div>
                    </div>

                    {/* User Dropdown (Desktop) */}
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <button className="mr-3 relative rounded-full bg-white/10 p-1 text-white hover:bg-white/20 focus:outline-none  ">
                            <span className="sr-only">View notifications</span>
                            <Bell className="h-6 w-6" />
                            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                        </button>

                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center rounded-full border-2 border-white/30 bg-white/10 p-1 text-white hover:bg-white/20 focus:outline-none ">
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <User className="h-6 w-6" />
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content className="mt-2 w-48 rounded-md bg-white py-1 shadow-lg dark:bg-gray-800">
                                <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-2">
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                        {user.email}
                                    </p>
                                </div>
                                <Dropdown.Link
                                    href={route("profile.edit")}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    !showingNavigationDropdown
                                )
                            }
                            className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10"
                        >
                            <span className="sr-only">Open main menu</span>
                            {showingNavigationDropdown ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`${
                    showingNavigationDropdown ? "block" : "hidden"
                } sm:hidden bg-main`}
            >
                <div className="space-y-1 px-3 pb-3 pt-2">
                    <ResponsiveNavLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                        className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white/10"
                    >
                        Dashboard
                    </ResponsiveNavLink>
                    <div className="rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white/10">
                        <span className="block">Products</span>
                        <div className="mt-1 ml-3 space-y-1">
                            <ResponsiveNavLink
                                href={route("products.create")}
                                className="block rounded-md px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
                            >
                                Add Product
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route("products.index")}
                                className="block rounded-md px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
                            >
                                All Products
                            </ResponsiveNavLink>
                        </div>
                    </div>
                    <div className="rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white/10">
                        <span className="block">Services</span>
                        <div className="mt-1 ml-3 space-y-1">
                            <ResponsiveNavLink className="block rounded-md px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white">
                                Add Service
                            </ResponsiveNavLink>
                            <ResponsiveNavLink className="block rounded-md px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white">
                                All Services
                            </ResponsiveNavLink>
                        </div>
                    </div>
                    <ResponsiveNavLink className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white/10">
                        <div className="flex items-center">
                            <Inbox className="h-5 w-5 mr-2" />
                            Mouvements
                        </div>
                    </ResponsiveNavLink>
                    <ResponsiveNavLink className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white/10">
                        <div className="flex items-center">
                            <Bell className="h-5 w-5 mr-2" />
                            Notifications
                        </div>
                    </ResponsiveNavLink>
                    <ResponsiveNavLink className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white/10">
                        Actions
                    </ResponsiveNavLink>
                    <ResponsiveNavLink className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white/10">
                        <div className="flex items-center">
                            <BarChart3 className="h-5 w-5 mr-2" />
                            Analytics
                        </div>
                    </ResponsiveNavLink>
                </div>
                <div className="border-t border-indigo-700 pb-3 pt-4">
                    <div className="flex items-center px-4">
                        <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                                <User className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium text-white">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-white/60">
                                {user.email}
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                        <ResponsiveNavLink
                            href={route("profile.edit")}
                            className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white/10"
                        >
                            Profile
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            method="post"
                            href={route("logout")}
                            as="button"
                            className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white/10"
                        >
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
