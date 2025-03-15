import React from "react";
import { format } from "date-fns";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, User, Calendar, Package } from "lucide-react";

const ActionCard = ({ action }) => {
    // Format the date
    const formattedDate = action.created_at
        ? format(new Date(action.created_at), "PPP 'at' p")
        : "Unknown date";

    return (
        <Card className="w-full hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
                <div className="flex justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                        <Activity size={20} className="text-main" />
                        {action.action}
                    </CardTitle>
                    <Badge variant="outline">
                        {action.product?.name || "Unknown Product"}
                    </Badge>
                </div>
                <CardDescription className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-500" />
                    {formattedDate}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {action.details && (
                    <p className="text-gray-700">{action.details}</p>
                )}
            </CardContent>
            <CardFooter className="pt-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>{action.user?.name || "Unknown User"}</span>
                </div>
                <div className="flex items-center gap-1 ml-4">
                    <Package size={14} />
                    <span>Product ID: {action.product_id}</span>
                </div>
            </CardFooter>
        </Card>
    );
};

export default ActionCard;
