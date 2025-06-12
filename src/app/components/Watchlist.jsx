'use client';

import React, { useState } from 'react';
import { Plus, Star, TrendingUp, TrendingDown, Search, X } from 'lucide-react';

const Watchlist = () => {
  const [watchlistItems, setWatchlistItems] = useState([
    {
      id: 1,
      symbol: 'NVDA',
      company: 'NVIDIA Corporation',
      currentPrice: 875.30,
      change: 12.45,
      changePercent: 1.44,
      volume: '28.5M',
      marketCap: '$2.15T'
    },
    {
      id: 2,
      symbol: 'TSLA',
      company: 'Tesla, Inc.',
      currentPrice: 248.50,
      change: -5.20,
      changePercent: -2.05,
      volume: '45.2M',
      marketCap: '$789.2B'
    },
    {
      id: 3,
      symbol: 'AMZN',
      company: 'Amazon.com, Inc.',
      currentPrice: 3340.88,
      change: 28.75,
      changePercent: 0.87,
      volume: '31.8M',
      marketCap: '$3.45T'
    },
    {
      id: 4,
      symbol: 'META',
      company: 'Meta Platforms, Inc.',
      currentPrice: 485.20,
      change: -8.30,
      changePercent: -1.68,
      volume: '22.1M',
      marketCap: '$1.23T'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newSymbol, setNewSymbol] = useState('');

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatPercent = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const formatNumber = (value) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return value;
  };

  const handleAddToWatchlist = () => {
    if (newSymbol.trim()) {
      const newItem = {
        id: Date.now(),
        symbol: newSymbol.toUpperCase(),
        company: `${newSymbol.toUpperCase()} Company`,
        currentPrice: Math.random() * 1000 + 100,
        change: (Math.random() - 0.5) * 20,
        changePercent: (Math.random() - 0.5) * 5,
        volume: `${(Math.random() * 50 + 10).toFixed(1)}M`,
        marketCap: `$${(Math.random() * 2000 + 100).toFixed(0)}B`
      };
      setWatchlistItems([...watchlistItems, newItem]);
      setNewSymbol('');
      setShowAddModal(false);
    }
  };

  const handleRemoveFromWatchlist = (id) => {
    setWatchlistItems(watchlistItems.filter(item => item.id !== id));
  };

  const filteredItems = watchlistItems.filter(item =>
    item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Watchlist</h2>
          <p className="text-sm sm:text-base text-gray-600">Track your favorite stocks</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add Stock</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search watchlist..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
        />
      </div>

      {/* Desktop/Tablet Table View */}
      <div className="hidden sm:block bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 md:p-4 font-semibold text-gray-700 text-sm md:text-base">Stock</th>
                <th className="text-left p-3 md:p-4 font-semibold text-gray-700 text-sm md:text-base">Price</th>
                <th className="text-left p-3 md:p-4 font-semibold text-gray-700 text-sm md:text-base">Change</th>
                <th className="text-left p-3 md:p-4 font-semibold text-gray-700 text-sm md:text-base hidden lg:table-cell">Volume</th>
                <th className="text-left p-3 md:p-4 font-semibold text-gray-700 text-sm md:text-base hidden lg:table-cell">Market Cap</th>
                <th className="text-left p-3 md:p-4 font-semibold text-gray-700 text-sm md:text-base">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500 text-sm sm:text-base">
                    {searchTerm ? 'No stocks found matching your search' : 'Your watchlist is empty'}
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 md:p-4">
                      <div className="flex items-center space-x-2 md:space-x-3">
                        <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-500 fill-current flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-900 text-sm md:text-base truncate">{item.symbol}</div>
                          <div className="text-xs md:text-sm text-gray-600 truncate">{item.company}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 md:p-4">
                      <div className="font-semibold text-gray-900 text-sm md:text-base">{formatCurrency(item.currentPrice)}</div>
                    </td>
                    <td className="p-3 md:p-4">
                      <div className={`flex items-center space-x-1 ${item.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {item.change >= 0 ? (
                          <TrendingUp className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                        ) : (
                          <TrendingDown className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                        )}
                        <div className="min-w-0">
                          <div className="font-semibold text-xs md:text-sm">{formatCurrency(Math.abs(item.change))}</div>
                          <div className="text-xs">{formatPercent(item.changePercent)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 md:p-4 text-gray-900 text-sm md:text-base hidden lg:table-cell">{item.volume}</td>
                    <td className="p-3 md:p-4 text-gray-900 text-sm md:text-base hidden lg:table-cell">{item.marketCap}</td>
                    <td className="p-3 md:p-4">
                      <button
                        onClick={() => handleRemoveFromWatchlist(item.id)}
                        className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block sm:hidden space-y-3">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-lg p-6 text-center text-gray-500">
            {searchTerm ? 'No stocks found matching your search' : 'Your watchlist is empty'}
          </div>
        ) : (
          filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <Star className="h-4 w-4 text-yellow-500 fill-current flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 text-base">{item.symbol}</div>
                    <div className="text-sm text-gray-600 truncate">{item.company}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFromWatchlist(item.id)}
                  className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 ml-2 flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Price</div>
                  <div className="font-semibold text-gray-900">{formatCurrency(item.currentPrice)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Change</div>
                  <div className={`flex items-center space-x-1 ${item.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {item.change >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <div>
                      <span className="font-semibold text-sm">{formatCurrency(Math.abs(item.change))}</span>
                      <span className="text-xs ml-1">{formatPercent(item.changePercent)}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Volume</div>
                  <div className="text-sm text-gray-900">{item.volume}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Market Cap</div>
                  <div className="text-sm text-gray-900">{item.marketCap}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Stock Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Stock to Watchlist</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Symbol
                </label>
                <input
                  type="text"
                  value={newSymbol}
                  onChange={(e) => setNewSymbol(e.target.value)}
                  placeholder="e.g., AAPL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                />
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddToWatchlist}
                  disabled={!newSymbol.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlist;