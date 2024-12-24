import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Upload } from 'lucide-react';
import Papa from 'papaparse';

const FileUpload = ({ onDataUpload, onError, isLoading }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Log file details
    console.log('Uploading file:', file.name);

    // Validate file type
    if (!file.name.endsWith('.csv')) {
      onError('Please upload a CSV file.');
      return;
    }

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log('Parse results:', results);
        if (results.errors && results.errors.length > 0) {
          onError(`CSV parsing errors: ${results.errors.map(e => e.message).join(', ')}`);
          return;
        }
        onDataUpload(results.data);
      },
      error: (error) => {
        console.error('Parse error:', error);
        onError('Error parsing CSV file: ' + error.message);
      }
    });
  };

  const downloadTemplate = () => {
    const template = `date,netIncome,totalAssets,shareholderEquity,netInterestIncome,earningAssets,totalLoans,totalDeposits,nonPerformingLoans,highQualityAssets,totalNetCashOutflows,totalCapital,riskWeightedAssets
2024-01-01,1000000,20000000,5000000,800000,15000000,12000000,18000000,600000,3000000,2500000,2000000,15000000`;
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'banking_data_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Button className="w-full" disabled={isLoading}>
              <Upload className="h-4 w-4 mr-2" />
              {isLoading ? 'Processing...' : 'Upload Banking Data (CSV)'}
            </Button>
          </label>
          <Button 
            onClick={downloadTemplate} 
            variant="outline" 
            className="w-full mt-2"
          >
            Download Template
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;