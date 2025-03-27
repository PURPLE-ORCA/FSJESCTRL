import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import TranslationProvider from "./context/TranslationProvider";


const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <TranslationProvider>
                <p className="text-center text-muted font-italic bg-gradient-to-br from-main to-black text-white">
                    DEVELOPPED BY{" "}
                    <a
                        href="https://github.com/PURPLE-ORCA"
                        className="text-purple-400 hover:text-purple-500"
                    >
                        EL MOUSSAOUI MOHAMMED
                    </a>
                </p>
                <App {...props} />
            </TranslationProvider>
        );
    },
    progress: {
        color: "#4c291e",
    },
});