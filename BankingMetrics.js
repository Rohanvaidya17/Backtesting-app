import React from 'react';
import { Card, CardContent } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BankingMetrics = ({ data }) => {
  // Add null check for data
  if (!data) {
    return null;
  }

  // Calculate metrics with safety checks
  const calculateMetrics = () => {
    try {
      return {
        roa: ((data.netIncome / data.totalAssets) * 100).toFixed(2),
        roe: ((data.netIncome / data.shareholderEquity) * 100).toFixed(2),
        nim: ((data.netInterestIncome / data.earningAssets) * 100).toFixed(2)
      };
    } catch (error) {
      console.error('Error calculating metrics:', error);
      return {
        roa: '0.00',
        roe: '0.00',
        nim: '0.00'
      };
    }
  };

  const metrics = calculateMetrics();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold">ROA</h3>
          <p className="text-3xl font-bold text-blue-600">{metrics.roa}%</p>
          <p className="text-sm text-gray-500">Return on Assets</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold">ROE</h3>
          <p className="text-3xl font-bold text-blue-600">{metrics.roe}%</p>
          <p className="text-sm text-gray-500">Return on Equity</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold">NIM</h3>
          <p className="text-3xl font-bold text-blue-600">{metrics.nim}%</p>
          <p className="text-sm text-gray-500">Net Interest Margin</p>
        </CardContent>
      </Card>

      {/* Chart will only render if we have all required data */}
      {data.netIncome && data.netInterestIncome && (
        <Card className="col-span-1 md:col-span-3">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Performance Trend</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[data]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="netIncome" 
                    stroke="#8884d8" 
                    name="Net Income" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="netInterestIncome" 
                    stroke="#82ca9d" 
                    name="Net Interest Income" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BankingMetrics;