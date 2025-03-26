import React from "react";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const MovementDataExport = ({ data }) => {
    const exportToCSV = () => {
        if (!data || !data.length) return;

        const headers = [
            "Product",
            "From Service",
            "To Service",
            "Date",
            "User",
            "Note",
        ];
        const rows = data.map((item) => [
            item.product?.name || "N/A",
            item.from_service?.name || "N/A",
            item.to_service?.name || "N/A",
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
        try {
            // Create a new jsPDF instance
            const doc = new jsPDF("landscape");

            // Set title
            doc.text("Stock Movements", 14, 10);

            // Prepare data
            const tableRows = [];
            data.forEach((item) => {
                tableRows.push([
                    item.product?.name || "N/A",
                    item.from_service?.name || "N/A",
                    item.to_service?.name || "N/A",
                    new Date(item.movement_date).toLocaleDateString(),
                    item.user?.name || "N/A",
                    (item.note || "No note").substring(0, 30), // Limit note length
                ]);
            });

            // Add table to document using the imported autoTable function
            autoTable(doc, {
                head: [
                    [
                        "Product",
                        "From Service",
                        "To Service",
                        "Date",
                        "User",
                        "Note",
                    ],
                ],
                body: tableRows,
                startY: 15,
                styles: { fontSize: 8, cellPadding: 1 },
                headStyles: { fillColor: [70, 70, 70] },
            });

            // Save the PDF
            doc.save("movements.pdf");
        } catch (error) {
            console.error("PDF error:", error);
            alert("PDF export failed. See console for details.");
        }
    };

    return (
        <div className="flex gap-2 mb-4">
            <Button
                onClick={exportToCSV}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                CSV
            </Button>
            <Button
                onClick={exportToExcel}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Excel
            </Button>
            <Button
                onClick={exportToPDF}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                PDF
            </Button>
        </div>
    );
};

export default MovementDataExport;
