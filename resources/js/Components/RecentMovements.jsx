// resources/js/Components/RecentMovements.jsx
import React, { useContext } from "react";
import { TranslationContext } from "@/context/TranslationProvider";

const RecentMovements = ({ movements }) => {
        const { translations } = useContext(TranslationContext);

    return (
        <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold mb-4">{translations.recent_movements}</h3>
            <table className="w-full">
                <tbody>
                    {movements.map((move) => (
                        <tr key={move.id} className="border-t">
                            <td className="py-2">{move.product.name}</td>
                            <td>
                                {move.from_service.name} →{" "}
                                {move.to_service.name}
                            </td>
                            <td>
                                {new Date(
                                    move.movement_date
                                ).toLocaleDateString()}
                            </td>
                            <td>{move.user.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecentMovements;
