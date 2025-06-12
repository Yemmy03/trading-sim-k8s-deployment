'use client';

import React, { useState } from 'react';
import { Plus, Activity, X } from 'lucide-react';

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
  RecentTradesList,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-blue-50 min-h-screen py-8">
      {/* Welcome Header */}
      <div className="mb-8 bg-white rounded-2xl shadow-md p-6 mx-4 animate-fade-in relative">
        <h3 className="text-2xl font-bold text-blue-700 text-center">
          Welcome, {getDisplayName()}!
        </h3>
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded-md transition"
          >
            Things to do?
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-fade-in">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-blue-700 mb-4 text-center">
              Functional Components of This Site
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
              <li>Search and trade</li>
              <li>Search, delete, and add stocks to watchlist</li>
              <li>Filter orders</li>
            </ul>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Summary */}
        <PortfolioSummary
          totalValue={totalValue + cash}
          portfolioValue={totalValue}
          cash={cash}
          totalGainLoss={totalGainLoss}
          totalGainLossPercent={totalGainLossPercent}
          className="mb-10"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Holdings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 transition-transform hover:scale-[1.01] duration-300">
              <div className="p-6 border-b border-blue-100 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-blue-800">Your Holdings</h2>
                <button
                  onClick={handleAddPosition}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Position</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-blue-600 bg-blue-50">
                      <th className="p-4">Symbol</th>
                      <th className="p-4">Shares</th>
                      <th className="p-4">Avg Price</th>
                      <th className="p-4">Current Price</th>
                      <th className="p-4">Value</th>
                      <th className="p-4">P&L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPortfolio?.map((stock, index) => {
                      const gainLoss = (stock.currentPrice - stock.avgPrice) * stock.shares;
                      const gainLossPercent = ((stock.currentPrice - stock.avgPrice) / stock.avgPrice) * 100;

                      return (
                        <tr
                          key={index}
                          className="border-b border-gray-100 hover:bg-blue-50 transition-all duration-200"
                        >
                          <td className="p-4">
                            <div>
                              <div className="font-semibold text-blue-900">{stock.symbol}</div>
                              <div className="text-xs text-gray-500">{stock.company}</div>
                            </div>
                          </td>
                          <td className="p-4 text-blue-900">{stock.shares}</td>
                          <td className="p-4 text-blue-900">{formatCurrency(stock.avgPrice)}</td>
                          <td className="p-4 text-blue-900">{formatCurrency(stock.currentPrice)}</td>
                          <td className="p-4 font-semibold text-blue-900">{formatCurrency(stock.value)}</td>
                          <td className="p-4">
                            <div className={gainLoss >= 0 ? 'text-emerald-600' : 'text-red-600'}>
                              <div className="font-semibold">{formatCurrency(gainLoss)}</div>
                              <div className="text-xs">{formatPercent(gainLossPercent)}</div>
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
            <StockSearchList onSearch={handleSearch} onTrade={handleTrade} />

            <RecentTradesList
              trades={mockRecentTrades}
              onViewAllTrades={handleViewAllTrades}
              maxTrades={5}
            />

            {/* Performance Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Portfolio Performance</h3>
              <div className="h-32 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <div className="text-center text-blue-500">
                  <Activity className="h-8 w-8 mx-auto mb-2 animate-pulse" />
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
