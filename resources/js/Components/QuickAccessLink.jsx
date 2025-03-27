import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";

const QuickAccessLink = ({ to, icon, label, variant = "outline" }) => {
    return (
        <Link href={to} className="no-underline">
            <Button variant={variant} className="flex items-center gap-2">
                <Icon icon={icon} className="text-xl" />
                {label}
            </Button>
        </Link>
    );
};

export default QuickAccessLink;
