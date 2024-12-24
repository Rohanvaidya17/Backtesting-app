import React from 'react';

export const Alert = ({ children, className = "" }) => {
  return (
    <div className={`relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11 ${className}`}>
      {children}
    </div>
  );
};

export const AlertDescription = ({ children, className = "" }) => {
  return (
    <div className={`text-sm [&_p]:leading-relaxed ${className}`}>
      {children}
    </div>
  );
};