import React from 'react';
import { Button } from './ui/button';

const TimeRangeSelector = ({ onRangeChange, currentRange }) => {
  const ranges = [
    { label: '1M', value: 30 },
    { label: '3M', value: 90 },
    { label: '6M', value: 180 },
    { label: 'YTD', value: 'ytd' },
    { label: '1Y', value: 365 },
    { label: 'All', value: 'all' }
  ];

  return (
    <div className="flex gap-2 mb-4">
      {ranges.map(range => (
        <Button
          key={range.label}
          variant={currentRange === range.value ? 'default' : 'outline'}
          onClick={() => onRangeChange(range.value)}
          className="px-3 py-1"
          size="sm"
        >
          {range.label}
        </Button>
      ))}
    </div>
  );
};

export default TimeRangeSelector;