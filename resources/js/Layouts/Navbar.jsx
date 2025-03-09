import React, { useState } from "react";
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

const Navbar = () => {
    const { auth } = usePage().props;
    const user = auth.user;

    const mainNavItems = [
        {
            name: "Dashboard",
            icon: "material-symbols:dashboard",
            route: "dashboard",
        },
        {
            name: "Users",
            icon: "material-symbols:person",
            route: "users.index",
        },
        {
            name: "Services",
            icon: "material-symbols:miscellaneous-services",
            children: [
                { name: "All Services", route: "services.index" },
                { name: "Add Service", route: "services.create" },
            ],
        },
        {
            name: "Products",
            icon: "material-symbols:inventory-2",
            children: [
                { name: "All Products", route: "products.index" },
                { name: "Add Product", route: "products.create" },
            ],
        },
        {
            name: "Movements",
            icon: "material-symbols:swap-horiz",
            children: [
                { name: "All Movements", route: "movements.index" },
                { name: "Add Movement", route: "movements.create" },
            ],
        },
        {
            name: "Actions",
            icon: "material-symbols:tap-interaction",
            route: "actions.index",
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
                                            {item.name}
                                            <ChevronDown className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="center"
                                        className="w-48"
                                    >
                                        {item.children.map((child) => (
                                            <DropdownMenuItem
                                                key={child.name}
                                                asChild
                                            >
                                                <Link
                                                    href={route(child.route)}
                                                    className="w-full cursor-pointer"
                                                >
                                                    {child.name}
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Button
                                    key={item.name}
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
                                        {item.name}
                                    </Link>
                                </Button>
                            )
                        )}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2">
                        <ThemeToggler />

                        {/* Notifications */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="relative"
                                >
                                    <Bell className="h-5 w-5" />
                                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                                        3
                                    </Badge>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80">
                                <div className="flex justify-between items-center px-4 py-2 border-b">
                                    <span className="font-medium">
                                        Notifications
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-xs"
                                    >
                                        Mark all as read
                                    </Button>
                                </div>
                                <div className="py-2 px-4 text-sm text-muted-foreground">
                                    No new notifications
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

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
                                            <span>Settings</span>
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
                                            <span>Log out</span>
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
