import React from "react";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const ProductDataExport = ({ data }) => {
    const exportToCSV = () => {
        if (!data || !data.length) return;

        const headers = [
            "ID",
            "Name",
            "Serial Number",
            "Supplier",
            "Quantity",
            "Price",
            "Served To",
        ];
        const rows = data.map((item) => [
            item.id,
            item.name,
            item.serial_number || "N/A",
            item.supplier || "N/A",
            item.quantity,
            typeof item.price === "number"
                ? `$${item.price.toFixed(2)}`
                : item.price || "N/A",
            item.service?.name || "N/A",
        ]);

        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += headers.join(",") + "\n";
        rows.forEach((row) => {
            csvContent += row.join(",") + "\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "products.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToExcel = () => {
        const worksheetData = data.map((item) => ({
            ID: item.id,
            Name: item.name,
            "Serial Number": item.serial_number || "N/A",
            Supplier: item.supplier || "N/A",
            Quantity: item.quantity,
            Price:
                typeof item.price === "number"
                    ? `$${item.price.toFixed(2)}`
                    : item.price || "N/A",
            "Served To": item.service?.name || "N/A",
        }));
        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
        XLSX.writeFile(workbook, "products.xlsx");
    };

    const exportToPDF = () => {
        try {
            // Create a new jsPDF instance
            const doc = new jsPDF("landscape");

            // Set title
            doc.text("Product List", 14, 10);

            // Prepare data
            const tableRows = [];
            data.forEach((item) => {
                tableRows.push([
                    item.id || "",
                    item.name || "",
                    item.serial_number || "",
                    item.supplier || "",
                    item.quantity || "",
                    typeof item.price === "number"
                        ? `$${item.price.toFixed(2)}`
                        : item.price || "",
                    item.service?.name || "",
                ]);
            });

            // Add table to document using the imported autoTable function
            autoTable(doc, {
                head: [
                    [
                        "ID",
                        "Name",
                        "Serial Number",
                        "Supplier",
                        "Quantity",
                        "Price",
                        "Served To",
                    ],
                ],
                body: tableRows,
                startY: 15,
                styles: { fontSize: 8, cellPadding: 1 },
                headStyles: { fillColor: [70, 70, 70] },
            });

            // Save the PDF
            doc.save("products.pdf");
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

export default ProductDataExport;
