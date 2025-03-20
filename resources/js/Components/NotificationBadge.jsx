import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function NotificationBadge({ initialCount = 0 }) {
    const [count, setCount] = useState(initialCount);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            // Fetch the latest count
            fetch(route("help-requests.pending-count"))
                .then((response) => response.json())
                .then((data) => setCount(data.count));
        }, 30000); // Every 30 seconds

        return () => clearInterval(interval);
    }, []);

    const handleMarkAllAsRead = (e) => {
        e.preventDefault();
        e.stopPropagation();

        fetch(route("help-requests.mark-as-read"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
        }).then(() => setCount(0));
    };

    const navigateToHelpRequests = () => {
        router.visit(route("help-requests.index"));
        setIsOpen(false);
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {count > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 min-w-5 p-0 flex items-center justify-center rounded-full text-xs font-medium"
                        >
                            {count > 99 ? "99+" : count}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
                <div className="p-2">
                    <div className="flex justify-between items-center mb-2 px-2 py-1">
                        <h3 className="text-sm font-medium">Notifications</h3>
                        {count > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleMarkAllAsRead}
                                className="text-xs h-7 px-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                            >
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Mark all as read
                            </Button>
                        )}
                    </div>
                    <Separator className="my-1" />
                    <div className="space-y-1 mt-3 px-2">
                        {count > 0 ? (
                            <div className="flex items-center text-sm text-amber-600 bg-amber-50 p-2 rounded-md">
                                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                                <p>
                                    You have {count} new help request
                                    {count !== 1 && "s"} pending.
                                </p>
                            </div>
                        ) : (
                            <div className="flex items-center text-sm text-gray-600 p-2">
                                <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                                <p>No new notifications.</p>
                            </div>
                        )}
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={navigateToHelpRequests}
                    className="flex items-center justify-center cursor-pointer py-2 text-blue-600 hover:text-blue-800"
                >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View all help requests
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
