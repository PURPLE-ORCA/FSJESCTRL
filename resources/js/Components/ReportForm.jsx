// resources/js/Components/ReportForm.jsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReportForm = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [productId, setProductId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/reports/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector(
                    'meta[name="csrf-token"]'
                ).content,
            },
            body: JSON.stringify({
                start_date: startDate,
                end_date: endDate,
                product_id: productId,
            }),
        });

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "report.xlsx";
        a.click();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
            <div className="flex gap-4 mb-4">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    placeholderText="Start Date"
                    className="border p-2"
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    placeholderText="End Date"
                    className="border p-2"
                />
                <select
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="border p-2"
                >
                    <option value="">All Products</option>
                    {/* Populate with product options */}
                </select>
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Generate Report
            </button>
        </form>
    );
};

export default ReportForm;
