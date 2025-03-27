import React, { useContext } from "react";
import QuickAccessLink from "./QuickAccessLink";
import { TranslationContext } from "@/context/TranslationProvider";


const QuickAccessBar = () => {
        const { translations } = useContext(TranslationContext);

    return (
        <div className="flex flex-wrap gap-4 px-auto justify-center">
            <QuickAccessLink
                to="/products/create"
                icon="mdi:plus-box"
                label={translations.create_product}
            />
            <QuickAccessLink
                to="/services/create"
                icon="mdi:plus-circle"
                label={translations.create_service}
            />
            <QuickAccessLink
                to="/movements/create"
                icon="mdi:swap-horizontal-bold"
                label={translations.create_movement}
            />
            <QuickAccessLink
                to="/actions/create"
                icon="mdi:play-circle-outline"
                label={translations.action_create}
            />
            <QuickAccessLink
                to="/help-requests/create"
                icon="mdi:help-circle-outline"
                label={translations.request_help}
            />
        </div>
    );
};

export default QuickAccessBar;
