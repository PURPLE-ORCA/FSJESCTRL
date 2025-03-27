import { cn } from "@/lib/utils";

export const Grid = ({ className, children, ...props }) => {
    return (
        <div
            className={cn("grid gap-4", className)}
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(0, 1fr))" }}
            {...props}
        >
            {children}
        </div>
    );
};

export const GridItem = ({ className, colSpan, children, ...props }) => {
    return (
        <div
            className={cn(
                "col-span-full",
                typeof colSpan === "object" && {
                    [`md:col-span-${colSpan.md}`]: colSpan.md,
                    [`lg:col-span-${colSpan.lg}`]: colSpan.lg,
                },
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};
