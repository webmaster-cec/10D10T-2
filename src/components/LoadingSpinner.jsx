import React from 'react';

export const TaskSkeleton = () => (
  <div className="p-6 bg-muted border border-border rounded-xl animate-pulse flex flex-col gap-4">
    <div className="flex justify-between">
      <div className="w-16 h-4 bg-secondary/10 rounded"></div>
      <div className="w-20 h-4 bg-secondary/10 rounded-full"></div>
    </div>
    <div className="w-3/4 h-6 bg-secondary/10 rounded"></div>
    <div className="space-y-2">
      <div className="w-full h-4 bg-secondary/10 rounded"></div>
      <div className="w-5/6 h-4 bg-secondary/10 rounded"></div>
    </div>
    <div className="pt-4 border-t border-border flex gap-2">
      <div className="w-24 h-3 bg-secondary/10 rounded"></div>
    </div>
  </div>
);

export const TableSkeleton = () => (
  <div className="w-full space-y-4 animate-pulse">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-12 bg-muted border border-border rounded-lg"></div>
    ))}
  </div>
);

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center p-20 gap-4">
    <div className="w-10 h-10 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
    <p className="font-body text-sm text-secondary/50">Fetching data from Google Sheets...</p>
  </div>
);

export default LoadingSpinner;
