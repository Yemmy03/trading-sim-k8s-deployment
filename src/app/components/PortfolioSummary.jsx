'use client';

import { DollarSign, TrendingUp, BarChart3, PieChart } from 'lucide-react';
import PortfolioCard from './PortfolioCard.jsx';

export function PortfolioSummary({ 
  totalValue, 
  portfolioValue, 
  cash, 
  totalGainLoss, 
  totalGainLossPercent, 
  className = "" 
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      <PortfolioCard
        title="Total Portfolio Value"
        value={totalValue}
        change={totalGainLoss}
        changePercent={totalGainLossPercent}
        icon={DollarSign}
      />
      
      <PortfolioCard
        title="Holdings Value"
        value={portfolioValue}
        change={totalGainLoss}
        changePercent={totalGainLossPercent}
        icon={BarChart3}
      />
      
      <PortfolioCard
        title="Cash Balance"
        value={cash}
        icon={PieChart}
      />
      
      <PortfolioCard
        title="Today's P&L"
        value={Math.abs(totalGainLoss)}
        change={totalGainLoss}
        changePercent={totalGainLossPercent}
        icon={TrendingUp}
      />
    </div>
  );
}