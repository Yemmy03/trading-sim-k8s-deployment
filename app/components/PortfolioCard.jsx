'use client';

import { TrendingUp, TrendingDown, Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PortfolioCard({
  title,
  value,
  change,
  changePercent,
  icon: Icon,
  className = ''
}) {
  const storageKey = `portfolio-card-visibility-${title}`;
  const [isVisible, setIsVisible] = useState(true);
  const isPositive = change >= 0;

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored !== null) {
      setIsVisible(stored === 'true');
    }
  }, [storageKey]);

  const toggleVisibility = () => {
    const newState = !isVisible;
    setIsVisible(newState);
    localStorage.setItem(storageKey, newState);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercent = (percent) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-md border border-blue-100 transition-all duration-300 hover:shadow-lg ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-blue-600">{title}</h3>
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 text-blue-400" />}
          <button
            onClick={toggleVisibility}
            className="text-blue-400 hover:text-blue-600 transition-colors"
            aria-label="Toggle visibility"
          >
            {isVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="space-y-2 transition-all duration-300">
        <div className="text-2xl font-bold text-blue-900">
          {isVisible ? formatCurrency(value) : '****'}
        </div>

        {change !== undefined && (
          <div
            className={`flex items-center space-x-1 text-sm ${
              isPositive ? 'text-emerald-600' : 'text-red-600'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span className="font-medium">
              {isVisible ? formatCurrency(Math.abs(change)) : '****'}
            </span>
            {changePercent !== undefined && (
              <span className="text-gray-500">
                ({isVisible ? formatPercent(changePercent) : '****'})
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
