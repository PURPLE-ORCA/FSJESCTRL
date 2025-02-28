import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "relative inline-flex items-center px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none " +
                (active
                    ? "text-main dark:text-main"
                    : "text-gray-600 hover:text-main dark:text-gray-400 dark:hover:text-main") +
                " " +
                className
            }
        >
            {/* Underline Animation */}
            <span
                className={`absolute bottom-0 left-0 h-[2px] w-full bg-main transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0"
                }`}
            ></span>
            {children}
        </Link>
    );
}
