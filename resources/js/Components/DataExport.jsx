// DataExport.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const DataExport = ({ data }) => {
    const exportToCSV = () => {
        if (!data || !data.length) return;

        const headers = [
            "Product",
            "From Service",
            "To Service",
            "Quantity",
            "Date",
            "User",
            "Note",
        ];
        const rows = data.map((item) => [
            item.product?.name || "N/A",
            item.from_service?.name || "N/A",
            item.to_service?.name || "N/A",
            item.quantity,
            new Date(item.movement_date).toLocaleDateString(),
            item.user?.name || "N/A",
            item.note || "No note",
        ]);

        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += headers.join(",") + "\n";
        rows.forEach((row) => {
            csvContent += row.join(",") + "\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "movements.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToExcel = () => {
        const worksheetData = data.map((item) => ({
            Product: item.product?.name || "N/A",
            "From Service": item.from_service?.name || "N/A",
            "To Service": item.to_service?.name || "N/A",
            Quantity: item.quantity,
            Date: new Date(item.movement_date).toLocaleDateString(),
            User: item.user?.name || "N/A",
            Note: item.note || "No note",
        }));
        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Movements");
        XLSX.writeFile(workbook, "movements.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        const headers = [
            [
                "Product",
                "From Service",
                "To Service",
                "Quantity",
                "Date",
                "User",
                "Note",
            ],
        ];
        const rows = data.map((item) => [
            item.product?.name || "N/A",
            item.from_service?.name || "N/A",
            item.to_service?.name || "N/A",
            item.quantity,
            new Date(item.movement_date).toLocaleDateString(),
            item.user?.name || "N/A",
            item.note || "No note",
        ]);
        doc.autoTable({
            head: headers,
            body: rows,
            startY: 20,
        });
        doc.save("movements.pdf");
    };

    return (
        <div className="flex gap-2 mb-4">
            <Button onClick={exportToCSV}>Export CSV</Button>
            <Button onClick={exportToExcel}>Export Excel</Button>
            <Button onClick={exportToPDF}>Export PDF</Button>
        </div>
    );
};

export default DataExport;