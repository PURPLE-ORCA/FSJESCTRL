import React, { useContext } from "react";
import PropTypes from "prop-types";
import { TranslationContext } from "@/context/TranslationProvider";


const TopProducts = ({ products }) => {
        const { translations } = useContext(TranslationContext);

    if (!products.length) {
        return <div className="bg-white p-4 rounded shadow">Loading...</div>;
    }

    return (
        <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold mb-4">
                {translations.top5_products}
            </h3>
            <table className="w-full">
                <thead>
                    <tr className="border-b">
                        <th className="py-2 text-left">Product</th>
                        <th className="py-2 text-left">Movements</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="border-t">
                            <td className="py-2">{product.name}</td>
                            <td className="py-2">{product.movements_count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

TopProducts.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            movements_count: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default TopProducts;
