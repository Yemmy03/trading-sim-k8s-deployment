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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Watchlist</h2>
          <p className="text-gray-600">Track your favorite stocks</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Watchlist Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700">Stock</th>
                <th className="text-left p-4 font-semibold text-gray-700">Price</th>
                <th className="text-left p-4 font-semibold text-gray-700">Change</th>
                <th className="text-left p-4 font-semibold text-gray-700">Volume</th>
                <th className="text-left p-4 font-semibold text-gray-700">Market Cap</th>
                <th className="text-left p-4 font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    {searchTerm ? 'No stocks found matching your search' : 'Your watchlist is empty'}
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <div>
                          <div className="font-semibold text-gray-900">{item.symbol}</div>
                          <div className="text-sm text-gray-600">{item.company}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-gray-900">{formatCurrency(item.currentPrice)}</div>
                    </td>
                    <td className="p-4">
                      <div className={`flex items-center space-x-1 ${item.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {item.change >= 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <div>
                          <div className="font-semibold">{formatCurrency(Math.abs(item.change))}</div>
                          <div className="text-sm">{formatPercent(item.changePercent)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-900">{item.volume}</td>
                    <td className="p-4 text-gray-900">{item.marketCap}</td>
                    <td className="p-4">
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

      {/* Add Stock Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-4">
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