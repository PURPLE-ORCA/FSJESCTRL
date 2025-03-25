import React, { useState, useContext } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Icon } from "@iconify/react";
import {
    Bell,
    Menu,
    ChevronDown,
    LogOut,
    Settings,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import ThemeToggler from "@/Components/ThemeToggler";
import NotificationBadge from "@/Components/NotificationBadge";
import { TranslationContext } from "@/context/TranslationProvider";

const Navbar = ({pendingCount = 0}) => {
    const { auth } = usePage().props;
    const user = auth.user;

    const mainNavItems = [
        {
            key: "dashboard",
            icon: "material-symbols:dashboard",
            route: "dashboard",
        },
        {
            key: "users",
            icon: "material-symbols:person",
            route: "users.index",
        },
        {
            key: "services",
            icon: "material-symbols:home-repair-service",
            children: [
                { key: "all_services", route: "services.index" },
                { key: "add_service", route: "services.create" },
            ],
        },
        {
            key: "products",
            icon: "material-symbols:inventory-2",
            children: [
                { key: "all_products", route: "products.index" },
                { key: "add_product", route: "products.create" },
            ],
        },
        {
            key: "movements",
            icon: "material-symbols:swap-horiz",
            children: [
                { key: "all_movements", route: "movements.index" },
                { key: "add_movement", route: "movements.create" },
            ],
        },
        {
            key: "actions",
            icon: "mdi:interaction-tap",
            route: "actions.index",
        },
        {
            key: "interventions",
            icon: "la:screwdriver",
            children: [
                { key: "all_help_requests", route: "help-requests.index" },
                { key: "request_help", route: "help-requests.create" },
            ],
        },
    ];

    // Get user initials for avatar fallback
    const getInitials = (name) => {
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase();
    };

    const { translations, switchLanguage } = useContext(TranslationContext);
    const lang = localStorage.getItem("lang") || "fr"; // or however you prefer
    const locals = [
        {
            locale: "fr",
            flag: "france.png",
            label: "Français",
        },
        {
            locale: "ar",
            flag: "saudi-arabia.png",
            label: "العربية",
        },
    ];

    return (
        <nav className="border-b bg-background">
            <div className="mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <Icon
                                icon="material-symbols:dashboard-customize"
                                className="h-8 w-8 text-primary"
                            />
                            <span className="ml-2 font-semibold text-xl">
                                DashControl
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-1">
                        {mainNavItems.map((item) =>
                            item.children ? (
                                <DropdownMenu key={item.name}>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="flex items-center gap-1 text-sm"
                                        >
                                            <Icon
                                                icon={item.icon}
                                                className="h-4 w-4 mr-1"
                                            />
                                            {translations[item.key] || item.key}
                                            <ChevronDown className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="center"
                                        className="w-48"
                                    >
                                        {item.children.map((child) => (
                                            <DropdownMenuItem
                                                key={child.key}
                                                asChild
                                            >
                                                <Link
                                                    href={route(child.route)}
                                                    className="w-full cursor-pointer"
                                                >
                                                    {translations[child.key] ||
                                                        child.key}
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Button
                                    key={item.key}
                                    variant="ghost"
                                    asChild
                                    className={`text-sm ${
                                        route().current(item.route)
                                            ? "bg-muted"
                                            : ""
                                    }`}
                                >
                                    <Link
                                        href={route(item.route)}
                                        className="flex items-center gap-2"
                                    >
                                        <Icon
                                            icon={item.icon}
                                            className="h-4 w-4"
                                        />
                                        {translations[item.key] || item.key}
                                    </Link>
                                </Button>
                            )
                        )}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2">
                        <ThemeToggler />

                        <div className="relative">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="inline-flex items-center"
                                    >
                                        <Icon
                                            icon="fa-solid:language"
                                            className="h-4 w-4"
                                        />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-48"
                                >
                                    {locals.map((pay) => (
                                        <DropdownMenuItem
                                            key={pay.locale}
                                            onClick={() =>
                                                switchLanguage(pay.locale)
                                            }
                                            className={`flex justify-between items-center ${
                                                pay.locale === "ar"
                                                    ? "font-arabic"
                                                    : ""
                                            }`}
                                        >
                                            <span>{pay.label}</span>
                                            {pay.locale === lang && (
                                                <Icon
                                                    icon="fa-solid:check"
                                                    className="h-4 w-4 text-white"
                                                />
                                            )}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <NotificationBadge initialCount={pendingCount} />

                        {/* User Menu (Desktop) */}
                        <div className="hidden md:flex">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="flex items-center gap-2"
                                    >
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>
                                                {getInitials(user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium">
                                            {user.name.split(" ")[0]}
                                        </span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-56"
                                >
                                    <div className="px-4 py-3">
                                        <p className="text-sm font-medium">
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={route("profile.edit")}
                                            className="flex cursor-pointer"
                                        >
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>
                                                {translations.settings ||
                                                    "Settings"}
                                            </span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="flex w-full cursor-pointer"
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>
                                                {translations.logout ||
                                                    "Log out"}
                                            </span>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Mobile Menu */}
                        <div className="md:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="md:hidden"
                                    >
                                        <Menu className="h-6 w-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent
                                    side="right"
                                    className="w-[300px] sm:w-[350px]"
                                >
                                    <div className="py-4 flex flex-col h-full">
                                        {/* User Profile in Mobile Menu */}
                                        <div className="flex items-center px-2 pb-4 border-b">
                                            <Avatar className="h-10 w-10">
                                                <AvatarFallback>
                                                    {getInitials(user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="ml-3">
                                                <p className="font-medium">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground truncate">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Mobile Navigation */}
                                        <div className="flex-1 overflow-auto py-2">
                                            <div className="space-y-1">
                                                {mainNavItems.map((item) =>
                                                    item.children ? (
                                                        <div
                                                            key={item.name}
                                                            className="px-2 py-1.5"
                                                        >
                                                            <div className="flex items-center px-3 py-2 text-sm font-medium rounded-md">
                                                                <Icon
                                                                    icon={
                                                                        item.icon
                                                                    }
                                                                    className="h-5 w-5 mr-2"
                                                                />
                                                                {item.name}
                                                            </div>
                                                            <div className="ml-4 mt-1 space-y-1">
                                                                {item.children.map(
                                                                    (child) => (
                                                                        <Link
                                                                            key={
                                                                                child.name
                                                                            }
                                                                            href={route(
                                                                                child.route
                                                                            )}
                                                                            className="block px-3 py-2 text-sm rounded-md hover:bg-muted"
                                                                        >
                                                                            {
                                                                                child.name
                                                                            }
                                                                        </Link>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <Link
                                                            key={item.name}
                                                            href={route(
                                                                item.route
                                                            )}
                                                            className={`flex items-center px-3 py-2 mx-2 text-sm font-medium rounded-md ${
                                                                route().current(
                                                                    item.route
                                                                )
                                                                    ? "bg-muted"
                                                                    : "hover:bg-muted"
                                                            }`}
                                                        >
                                                            <Icon
                                                                icon={item.icon}
                                                                className="h-5 w-5 mr-2"
                                                            />
                                                            {item.name}
                                                        </Link>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        {/* Bottom Actions */}
                                        <div className="border-t pt-4 space-y-1">
                                            <Link
                                                href={route("profile.edit")}
                                                className="flex items-center px-3 py-2 mx-2 text-sm font-medium rounded-md hover:bg-muted"
                                            >
                                                <Settings className="h-5 w-5 mr-2" />
                                                Settings
                                            </Link>
                                            <Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                                className="flex w-full items-center px-3 py-2 mx-2 text-sm font-medium rounded-md hover:bg-muted"
                                            >
                                                <LogOut className="h-5 w-5 mr-2" />
                                                Log out
                                            </Link>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
