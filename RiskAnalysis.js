import React from 'react';
import { Card, CardContent } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

const RiskAnalysis = ({ data }) => {
  if (!data) {
    return null;
  }

  const calculateRiskMetrics = () => {
    try {
      return {
        nplRatio: ((data.nonPerformingLoans / data.totalLoans) * 100).toFixed(2),
        lcr: ((data.highQualityAssets / data.totalNetCashOutflows) * 100).toFixed(2),
        car: ((data.totalCapital / data.riskWeightedAssets) * 100).toFixed(2)
      };
    } catch (error) {
      console.error('Error calculating risk metrics:', error);
      return {
        nplRatio: '0.00',
        lcr: '0.00',
        car: '0.00'
      };
    }
  };

  const riskMetrics = calculateRiskMetrics();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold">NPL Ratio</h3>
          <p className="text-3xl font-bold text-blue-600">{riskMetrics.nplRatio}%</p>
          <p className="text-sm text-gray-500">Non-Performing Loans Ratio</p>
          {parseFloat(riskMetrics.nplRatio) > 5 && (
            <Alert className="mt-2">
              <AlertDescription>High NPL ratio detected</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold">LCR</h3>
          <p className="text-3xl font-bold text-blue-600">{riskMetrics.lcr}%</p>
          <p className="text-sm text-gray-500">Liquidity Coverage Ratio</p>
          {parseFloat(riskMetrics.lcr) < 100 && (
            <Alert className="mt-2">
              <AlertDescription>LCR below recommended level</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold">CAR</h3>
          <p className="text-3xl font-bold text-blue-600">{riskMetrics.car}%</p>
          <p className="text-sm text-gray-500">Capital Adequacy Ratio</p>
          {parseFloat(riskMetrics.car) < 8 && (
            <Alert className="mt-2">
              <AlertDescription>CAR below minimum requirement</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAnalysis;