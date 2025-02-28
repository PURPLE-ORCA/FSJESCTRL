import React from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const Navbar = () => {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <nav className="bg-black shadow dark:bg-mian ">
            {/* Desktop & Tablet View */}
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-14 justify-between">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href="/">
                                <ApplicationLogo className="h-8 w-auto text-indigo-600 dark:text-indigo-400" />
                            </Link>
                        </div>
                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            <NavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none focus:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                            >
                                Dashboard
                            </NavLink>
                            <NavLink className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none focus:text-gray-700 dark:text-gray-300 dark:hover:text-white">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        Products
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            Add a product
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link
                                                href={route("products.index")}
                                            >
                                                All products
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </NavLink>
                            <NavLink
                                // href={route("dashboard")}
                                // active={route().current("dashboard")}
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none focus:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                            >
                                Mouvements
                            </NavLink>
                            <NavLink
                                // href={route("dashboard")}
                                // active={route().current("dashboard")}
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none focus:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                            >
                                Notifications
                            </NavLink>
                            <NavLink
                                // href={route("dashboard")}
                                // active={route().current("dashboard")}
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none focus:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                            >
                                Actions
                            </NavLink>
                            <NavLink
                                // href={route("dashboard")}
                                // active={route().current("dashboard")}
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none focus:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                            >
                                Analytics
                            </NavLink>
                        </div>
                    </div>

                    {/* User Dropdown (Desktop) */}
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center rounded-full bg-white p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route("profile.edit")}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    (previousState) => !previousState
                                )
                            }
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-400"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className={`${
                                    showingNavigationDropdown
                                        ? "hidden"
                                        : "block"
                                } h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            <svg
                                className={`${
                                    showingNavigationDropdown
                                        ? "block"
                                        : "hidden"
                                } h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`${
                    showingNavigationDropdown ? "block" : "hidden"
                } sm:hidden`}
            >
                <div className="space-y-1 pb-3 pt-2">
                    <ResponsiveNavLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                        className="block py-2 pl-3 pr-4 text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        Dashboard
                    </ResponsiveNavLink>
                </div>
                <div className="border-t border-gray-200 pb-3 pt-4 dark:border-gray-700">
                    <div className="px-4">
                        <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                            {user.name}
                        </div>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {user.email}
                        </div>
                    </div>
                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("profile.edit")}
                            className="block py-2 pl-3 pr-4 text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Profile
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            method="post"
                            href={route("logout")}
                            as="button"
                            className="block py-2 pl-3 pr-4 text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
