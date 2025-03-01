// resources/js/Components/SonnerToastProvider.jsx
import React, { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function SonnerToastProvider({ children }) {
    const { flash } = usePage().props;

    useEffect(() => {
        // Check for success message
        if (flash.success) {
            toast.success(flash.success);
        }

        // Check for error message
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <>
            {children}
            <Toaster position="bottom-right" />
        </>
    );
}
