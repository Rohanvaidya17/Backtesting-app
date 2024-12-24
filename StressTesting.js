import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StressTesting = ({ baselineData }) => {
  const [stressParams, setStressParams] = useState({
    interestRateShock: 2.0,  // 200 basis points shock
    marketDecline: 20,       // 20% market value decline
    nplIncrease: 50,         // 50% increase in NPLs
    depositWithdrawal: 15    // 15% sudden deposit withdrawal
  });

  const [stressedResults, setStressedResults] = useState(null);

  // Calculate stressed scenarios
  const runStressTest = () => {
    const stressedData = baselineData.map(record => {
      // Apply interest rate shock
      const stressedNII = record.netInterestIncome * (1 - (stressParams.interestRateShock / 100));
      
      // Apply market decline to assets
      const stressedAssets = record.totalAssets * (1 - (stressParams.marketDecline / 100));
      
      // Increase NPLs
      const stressedNPL = record.nonPerformingLoans * (1 + (stressParams.nplIncrease / 100));
      
      // Simulate deposit withdrawal
      const stressedDeposits = record.totalDeposits * (1 - (stressParams.depositWithdrawal / 100));

      // Calculate stressed CAR
      const stressedCAR = (record.totalCapital / stressedAssets) * 100;

      return {
        date: record.date,
        originalCAR: (record.totalCapital / record.totalAssets) * 100,
        stressedCAR: stressedCAR,
        originalNPL: (record.nonPerformingLoans / record.totalLoans) * 100,
        stressedNPL: (stressedNPL / record.totalLoans) * 100,
        originalLCR: (record.highQualityAssets / record.totalNetCashOutflows) * 100,
        stressedLCR: (record.highQualityAssets / (record.totalNetCashOutflows * 1.2)) * 100
      };
    });

    setStressedResults(stressedData);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Stress Testing Scenarios</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <Label>Interest Rate Shock (%)</Label>
            <Input 
              type="number" 
              value={stressParams.interestRateShock}
              onChange={(e) => setStressParams({
                ...stressParams,
                interestRateShock: parseFloat(e.target.value)
              })}
            />
          </div>
          <div>
            <Label>Market Value Decline (%)</Label>
            <Input 
              type="number"
              value={stressParams.marketDecline}
              onChange={(e) => setStressParams({
                ...stressParams,
                marketDecline: parseFloat(e.target.value)
              })}
            />
          </div>
          <div>
            <Label>NPL Increase (%)</Label>
            <Input 
              type="number"
              value={stressParams.nplIncrease}
              onChange={(e) => setStressParams({
                ...stressParams,
                nplIncrease: parseFloat(e.target.value)
              })}
            />
          </div>
          <div>
            <Label>Deposit Withdrawal (%)</Label>
            <Input 
              type="number"
              value={stressParams.depositWithdrawal}
              onChange={(e) => setStressParams({
                ...stressParams,
                depositWithdrawal: parseFloat(e.target.value)
              })}
            />
          </div>
        </div>

        <Button onClick={runStressTest} className="w-full mb-6">
          Run Stress Test
        </Button>

        {stressedResults && (
          <div className="space-y-6">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stressedResults}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="originalCAR" 
                    stroke="#8884d8" 
                    name="Original CAR"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="stressedCAR" 
                    stroke="#ff4d4f" 
                    name="Stressed CAR"
                    strokeDasharray="5 5"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="originalNPL" 
                    stroke="#82ca9d" 
                    name="Original NPL"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="stressedNPL" 
                    stroke="#ffa39e" 
                    name="Stressed NPL"
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-sm font-medium">Capital Impact</h3>
                  <div className="text-2xl font-bold mt-2">
                    {(stressedResults[stressedResults.length - 1].originalCAR - 
                      stressedResults[stressedResults.length - 1].stressedCAR).toFixed(2)}%
                  </div>
                  <p className="text-sm text-gray-500">CAR Reduction</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-sm font-medium">Asset Quality Impact</h3>
                  <div className="text-2xl font-bold mt-2">
                    {(stressedResults[stressedResults.length - 1].stressedNPL - 
                      stressedResults[stressedResults.length - 1].originalNPL).toFixed(2)}%
                  </div>
                  <p className="text-sm text-gray-500">NPL Increase</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-sm font-medium">Liquidity Impact</h3>
                  <div className="text-2xl font-bold mt-2">
                    {(stressedResults[stressedResults.length - 1].originalLCR - 
                      stressedResults[stressedResults.length - 1].stressedLCR).toFixed(2)}%
                  </div>
                  <p className="text-sm text-gray-500">LCR Reduction</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StressTesting;