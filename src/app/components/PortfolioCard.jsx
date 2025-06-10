'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

export default function PortfolioCard({ 
  title, 
  value, 
  change, 
  changePercent, 
  icon: Icon, 
  className = "" 
}) {
  const isPositive = change >= 0;
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercent = (percent) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {Icon && <Icon className="h-5 w-5 text-gray-400" />}
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-bold text-gray-900">
          {formatCurrency(value)}
        </div>
        
        {change !== undefined && (
          <div className={`flex items-center space-x-1 text-sm ${
            isPositive ? 'text-emerald-600' : 'text-red-600'
          }`}>
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span className="font-medium">
              {formatCurrency(Math.abs(change))}
            </span>
            {changePercent !== undefined && (
              <span className="text-gray-500">
                ({formatPercent(changePercent)})
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}