import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Dropdown from './Dropdown';
export default function NotificationBadge({ initialCount = 0 }) {
    const [count, setCount] = useState(initialCount);
    
    useEffect(() => {
        const interval = setInterval(() => {
            // Fetch the latest count
            fetch(route('help-requests.pending-count'))
                .then(response => response.json())
                .then(data => setCount(data.count));
        }, 30000); // Every 30 seconds
        
        return () => clearInterval(interval);
    }, []);
    
    const handleMarkAllAsRead = () => {
        fetch(route('help-requests.mark-as-read'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        })
        .then(() => setCount(0));
    };
    
    return (
        <div className="relative">
            <Dropdown>
                <Dropdown.Trigger>
                    <button className="relative p-1 text-gray-600 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        {count > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                {count}
                            </span>
                        )}
                    </button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <div className="p-3">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                            {count > 0 && (
                                <button
                                    onClick={handleMarkAllAsRead}
                                    className="text-xs text-blue-600 hover:text-blue-800"
                                >
                                    Mark all as read
                                </button>
                            )}
                        </div>
                        <div className="space-y-1">
                            {count > 0 ? (
                                <p className="text-sm text-gray-600">
                                    There is {count} new help request{count !== 1 && 's'}.
                                </p>
                            ) : (
                                <p className="text-sm text-gray-600">No new notifications.</p>
                            )}
                            <a
                                href={route('help-requests.index')}
                                className="block text-sm text-blue-600 hover:text-blue-800"
                            >
                                View all help requests
                            </a>
                        </div>
                    </div>
                </Dropdown.Content>
            </Dropdown>
        </div>
    );
}