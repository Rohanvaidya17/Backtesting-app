import React from 'react';
import { TrendingUp, TrendingDown, MinusIcon } from 'lucide-react';

const TrendIndicator = ({ currentValue, previousValue, prefix = '', suffix = '' }) => {
  const difference = currentValue - previousValue;
  const percentageChange = ((difference / Math.abs(previousValue)) * 100).toFixed(1);
  
  const getColor = () => {
    if (Math.abs(difference) < 0.1) return 'text-gray-500';
    return difference > 0 ? 'text-green-500' : 'text-red-500';
  };

  const getIcon = () => {
    if (Math.abs(difference) < 0.1) return <MinusIcon className="h-4 w-4" />;
    return difference > 0 ? 
      <TrendingUp className="h-4 w-4" /> : 
      <TrendingDown className="h-4 w-4" />;
  };

  return (
    <div className={`flex items-center gap-1 ${getColor()}`}>
      {getIcon()}
      <span className="text-sm">
        {difference > 0 ? '+' : ''}{prefix}{percentageChange}{suffix}
      </span>
    </div>
  );
};

export default TrendIndicator;