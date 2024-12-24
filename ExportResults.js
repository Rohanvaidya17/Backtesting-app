import React from 'react';
import { Button } from './ui/button';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import * as XLSX from 'xlsx';

const ExportResults = ({ data, metrics, riskAnalysis }) => {
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    // Metrics Sheet
    const metricsData = [{
      'ROA (%)': metrics.roa,
      'ROE (%)': metrics.roe,
      'NIM (%)': metrics.nim,
      'Date': new Date().toLocaleDateString()
    }];
    const metricsSheet = XLSX.utils.json_to_sheet(metricsData);
    XLSX.utils.book_append_sheet(workbook, metricsSheet, "Key Metrics");

    // Risk Analysis Sheet
    const riskData = [{
      'NPL Ratio (%)': riskAnalysis.nplRatio,
      'LCR (%)': riskAnalysis.lcr,
      'CAR (%)': riskAnalysis.car
    }];
    const riskSheet = XLSX.utils.json_to_sheet(riskData);
    XLSX.utils.book_append_sheet(workbook, riskSheet, "Risk Analysis");

    // Raw Data Sheet
    const dataSheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, dataSheet, "Raw Data");

    // Save the file
    XLSX.writeFile(workbook, 'banking_analysis_report.xlsx');
  };

  const exportToCSV = () => {
    const csvContent = [
      ["Banking Analysis Report"],
      ["Generated on:", new Date().toLocaleDateString()],
      [],
      ["Key Metrics"],
      ["ROA (%)", metrics.roa],
      ["ROE (%)", metrics.roe],
      ["NIM (%)", metrics.nim],
      [],
      ["Risk Analysis"],
      ["NPL Ratio (%)", riskAnalysis.nplRatio],
      ["LCR (%)", riskAnalysis.lcr],
      ["CAR (%)", riskAnalysis.car]
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'banking_analysis_report.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex gap-2 mt-4">
      <Button onClick={exportToExcel} className="flex items-center gap-2">
        <FileSpreadsheet className="h-4 w-4" />
        Export to Excel
      </Button>
      <Button onClick={exportToCSV} variant="outline" className="flex items-center gap-2">
        <FileText className="h-4 w-4" />
        Export to CSV
      </Button>
    </div>
  );
};

export default ExportResults;