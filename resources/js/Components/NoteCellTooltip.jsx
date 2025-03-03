import React, { useState } from "react";

const NoteCellTooltip = ({ note }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <div className="truncate max-w-[200px] text-ellipsis cursor-help">
                {note || "No note"}
            </div>
            {showTooltip && note && (
                <div className="absolute left-0 top-full mt-1 w-max max-w-xs bg-gray-700 text-white text-sm p-2 rounded shadow-lg z-10">
                    {note}
                </div>
            )}
        </div>
    );
};

export default NoteCellTooltip;