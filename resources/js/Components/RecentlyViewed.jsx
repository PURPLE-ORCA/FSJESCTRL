// resources/js/Components/RecentlyViewed.jsx
import React from "react";
import { Link } from "@inertiajs/react";

const RecentlyViewed = ({ items }) => {
    return (
        <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold mb-4">Recently Viewed</h3>
            <ul>
                {items.map((item) => (
                    <li
                        key={item.id}
                        className="flex justify-between items-center py-2 border-b"
                    >
                        <Link href={`/products/${item.product.id}`}>
                            {item.product.name}
                        </Link>
                        <small>
                            {new Date(item.created_at).toLocaleDateString()}
                        </small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentlyViewed;
