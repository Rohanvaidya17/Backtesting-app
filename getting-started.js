import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Download } from 'lucide-react';

const GettingStarted = () => {
  const downloadSampleCSV = () => {
    const sampleData = `date,netIncome,totalAssets,shareholderEquity,netInterestIncome,earningAssets,totalLoans,totalDeposits,nonPerformingLoans,highQualityAssets,totalNetCashOutflows,totalCapital,riskWeightedAssets
2024-01-01,1000000,20000000,5000000,800000,15000000,12000000,18000000,600000,3000000,2500000,2000000,15000000
2024-02-01,1100000,21000000,5200000,850000,16000000,12500000,19000000,550000,3200000,2600000,2100000,16000000
2024-03-01,1050000,20500000,5100000,820000,15500000,12200000,18500000,580000,3100000,2550000,2050000,15500000`;

    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_banking_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Getting Started</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">Quick Start Guide:</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Download our sample CSV template</li>
              <li>Fill it with your banking data</li>
              <li>Upload the file to analyze your metrics</li>
              <li>Explore different tabs to see various analyses</li>
            </ol>
          </div>

          <div className="flex justify-center">
            <Button onClick={downloadSampleCSV} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Sample CSV
            </Button>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">What You Can Do:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>View key performance metrics (ROA, ROE, NIM)</li>
              <li>Analyze risk indicators</li>
              <li>Run stress tests with different scenarios</li>
              <li>Track trends over time</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GettingStarted;