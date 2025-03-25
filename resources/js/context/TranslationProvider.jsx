import { createContext, useEffect, useState } from "react";
import ar from "../lang/ar.json";
import fr from "../lang/fr.json";

export const TranslationContext = createContext();

export default function TranslationProvider({ children }) {
    const [language, setLanguage] = useState(
        () => localStorage.getItem("lang") || "fr"
    );

    const getTranslations = (lang) => {
        switch (lang) {
            case "ar":
                return ar;
            case "fr":
                return fr;
            default:
                return fr;
        }
    };

    const [translations, setTranslations] = useState(getTranslations(language));

    const switchLanguage = (lang) => {
        if (!["ar", "fr"].includes(lang)) return;
        setLanguage(lang);
        setTranslations(getTranslations(lang));
        localStorage.setItem("lang", lang);
    };

    return (
        <TranslationContext.Provider value={{ translations, switchLanguage }}>
            {children}
        </TranslationContext.Provider>
    );
}
