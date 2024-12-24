import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Alert, AlertDescription } from './components/ui/alert';
import { BookOpen, TrendingUp, Activity, BarChart2 } from 'lucide-react';
import Papa from 'papaparse';
import BankingMetrics from './components/BankingMetrics';
import RiskAnalysis from './components/RiskAnalysis';
import StressTesting from './components/StressTesting';
import GettingStarted from './components/getting-started';
import ExportResults from './components/ExportResults';
import TimeRangeSelector from './components/TimeRangeSelector';
import { validateCSV } from './utils/csvValidator';

const BacktestingApp = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('guide');
  const [timeRange, setTimeRange] = useState('all');
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Filter data based on selected time range
  useEffect(() => {
    if (!data) return;

    if (timeRange === 'all') {
      setFilteredData(data);
      return;
    }

    const now = new Date();
    const filterDate = new Date();

    if (timeRange === 'ytd') {
      filterDate.setMonth(0, 1); // January 1st of current year
    } else {
      filterDate.setDate(now.getDate() - timeRange); // Last N days
    }

    const filtered = data.filter(item => new Date(item.date) >= filterDate);
    setFilteredData(filtered);
  }, [data, timeRange]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
      setLoading(true);
      
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          console.log("Parsing complete:", results.data);
          const validation = validateCSV(results.data);
          if (validation.isValid) {
            setData(results.data);
            setFilteredData(results.data);
            setError(null);
            setActiveTab('metrics');
          } else {
            setError(validation.error);
          }
          setLoading(false);
        },
        error: (error) => {
          console.error("Parsing error:", error);
          setError('Error parsing CSV file: ' + error.message);
          setLoading(false);
        }
      });
    }
  };

  const getLatestMetrics = () => {
    if (!filteredData || filteredData.length === 0) return null;
    return filteredData[filteredData.length - 1];
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Header */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Banking Analytics Platform</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            <Button 
              onClick={() => setActiveTab('guide')}
              variant={activeTab === 'guide' ? 'default' : 'outline'}
              className="flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Getting Started
            </Button>
            <Button 
              onClick={() => setActiveTab('metrics')}
              variant={activeTab === 'metrics' ? 'default' : 'outline'}
              className="flex items-center gap-2"
              disabled={!data}
            >
              <TrendingUp className="h-4 w-4" />
              Key Metrics
            </Button>
            <Button 
              onClick={() => setActiveTab('risk')}
              variant={activeTab === 'risk' ? 'default' : 'outline'}
              className="flex items-center gap-2"
              disabled={!data}
            >
              <Activity className="h-4 w-4" />
              Risk Analysis
            </Button>
            <Button 
              onClick={() => setActiveTab('stress')}
              variant={activeTab === 'stress' ? 'default' : 'outline'}
              className="flex items-center gap-2"
              disabled={!data}
            >
              <BarChart2 className="h-4 w-4" />
              Stress Testing
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Getting Started Guide */}
      {activeTab === 'guide' && <GettingStarted />}

      {/* File Upload Section */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
              id="file-upload"
              disabled={loading}
            />
            <p className="mt-2 text-sm text-gray-500">
              {loading ? 'Processing...' : 'Upload your CSV file with banking data'}
            </p>
          </div>
          {error && (
            <Alert className="mt-2">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Time Range Selector */}
      {data && activeTab !== 'guide' && (
        <div className="mb-6">
          <TimeRangeSelector 
            onRangeChange={setTimeRange} 
            currentRange={timeRange}
          />
        </div>
      )}

      {/* Main Content */}
      {filteredData && (
        <>
          {activeTab === 'metrics' && <BankingMetrics data={getLatestMetrics()} />}
          {activeTab === 'risk' && <RiskAnalysis data={getLatestMetrics()} />}
          {activeTab === 'stress' && <StressTesting baselineData={filteredData} />}
          
          {/* Export Section */}
          <Card className="mt-6">
            <CardContent>
              <ExportResults 
                data={filteredData}
                metrics={getLatestMetrics()}
                riskAnalysis={getLatestMetrics()}
              />
            </CardContent>
          </Card>

          {/* Data Preview */}
          <Card className="mt-6">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Data Preview</h3>
              <div className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-96">
                <pre className="text-sm">{JSON.stringify(filteredData, null, 2)}</pre>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default BacktestingApp;