'use client';

import React from 'react';
import { Plus, Activity } from 'lucide-react';

const Portfolio = ({ 
  getDisplayName,
  totalValue,
  cash,
  totalGainLoss,
  totalGainLossPercent,
  mockPortfolio,
  mockRecentTrades,
  handleAddPosition,
  handleSearch,
  handleTrade,
  handleViewAllTrades,
  formatCurrency,
  formatPercent,
  PortfolioSummary,
  StockSearchList,
  RecentTradesList
}) => {
  return (
    <div>
      <div className="mb-8 bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
           Welcome, {getDisplayName()}!
        </h3>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Summary Cards */}
        <PortfolioSummary
          totalValue={totalValue + cash}
          portfolioValue={totalValue}
          cash={cash}
          totalGainLoss={totalGainLoss}
          totalGainLossPercent={totalGainLossPercent}
          className="mb-8"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Holdings Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Your Holdings</h2>
                  <button 
                    onClick={handleAddPosition}
                    className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Position</span>
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left p-4 font-medium text-gray-600">Symbol</th>
                      <th className="text-left p-4 font-medium text-gray-600">Shares</th>
                      <th className="text-left p-4 font-medium text-gray-600">Avg Price</th>
                      <th className="text-left p-4 font-medium text-gray-600">Current Price</th>
                      <th className="text-left p-4 font-medium text-gray-600">Value</th>
                      <th className="text-left p-4 font-medium text-gray-600">P&L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPortfolio?.map((stock, index) => {
                      const gainLoss = (stock.currentPrice - stock.avgPrice) * stock.shares;
                      const gainLossPercent = ((stock.currentPrice - stock.avgPrice) / stock.avgPrice) * 100;
                      
                      return (
                        <tr key={index} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="p-4">
                            <div>
                              <div className="font-semibold text-gray-900">{stock.symbol}</div>
                              <div className="text-sm text-gray-600">{stock.company}</div>
                            </div>
                          </td>
                          <td className="p-4 text-gray-900">{stock.shares}</td>
                          <td className="p-4 text-gray-900">{formatCurrency(stock.avgPrice)}</td>
                          <td className="p-4 text-gray-900">{formatCurrency(stock.currentPrice)}</td>
                          <td className="p-4 text-gray-900 font-semibold">{formatCurrency(stock.value)}</td>
                          <td className="p-4">
                            <div className={`${gainLoss >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                              <div className="font-semibold">{formatCurrency(gainLoss)}</div>
                              <div className="text-sm">{formatPercent(gainLossPercent)}</div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <StockSearchList 
              onSearch={handleSearch} 
              onTrade={handleTrade} 
            />
            
            <RecentTradesList 
              trades={mockRecentTrades} 
              onViewAllTrades={handleViewAllTrades}
              maxTrades={5}
            />

            {/* Performance Chart Placeholder */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Performance</h3>
              <div className="h-32 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Activity className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Chart coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;