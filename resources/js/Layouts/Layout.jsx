import SonnerToastProvider from "@/Components/SonnerToastProvider";
import Navbar from "./Navbar";
import React, { useContext } from "react";
import { TranslationContext } from "@/context/TranslationProvider";
import { cn } from "@/lib/utils"; // if you have a utility for classNames

const Layout = ({ header, children }) => {
    const {language} = useContext(TranslationContext);

    return (
        <SonnerToastProvider>
            <div
                className={cn(
                    "bg-white dark:bg-black text-black dark:text-white",
                    language === "ar" ? "rtl" : "ltr"
                )}
            >
                <div>
                    <Navbar />
                </div>
                <main>{children}</main>
            </div>
        </SonnerToastProvider>
    );
};

export default Layout;
