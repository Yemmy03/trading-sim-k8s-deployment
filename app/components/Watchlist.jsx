'use client';

import React, { useState } from 'react';
import { Plus, Star, TrendingUp, TrendingDown, Search, X, BarChart3, Activity } from 'lucide-react';

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

  const totalValue = watchlistItems.reduce((sum, item) => sum + item.currentPrice, 0);
  const totalGain = watchlistItems.reduce((sum, item) => sum + item.change, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative space-y-4 sm:space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="animate-fade-in-up">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-900 to-indigo-800 bg-clip-text text-transparent">
                    Portfolio Watchlist
                  </h2>
                  <p className="text-slate-600">Track and monitor your favorite stocks</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 transition-transform group-hover:rotate-90 duration-300" />
                <span className="font-medium">Add Stock</span>
              </button>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Stocks</p>
                    <p className="text-2xl font-bold">{watchlistItems.length}</p>
                  </div>
                  <Activity className="h-8 w-8 text-blue-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-4 rounded-xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-indigo-100 text-sm">Portfolio Value</p>
                    <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-indigo-200" />
                </div>
              </div>
              <div className={`bg-gradient-to-r ${totalGain >= 0 ? 'from-emerald-500 to-emerald-600' : 'from-red-500 to-red-600'} p-4 rounded-xl text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`${totalGain >= 0 ? 'text-emerald-100' : 'text-red-100'} text-sm`}>Total Change</p>
                    <p className="text-2xl font-bold">{formatCurrency(Math.abs(totalGain))}</p>
                  </div>
                  {totalGain >= 0 ? 
                    <TrendingUp className="h-8 w-8 text-emerald-200" /> : 
                    <TrendingDown className="h-8 w-8 text-red-200" />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="animate-fade-in-up animation-delay-200">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5 transition-colors group-focus-within:text-blue-600" />
            <input
              type="text"
              placeholder="Search your watchlist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-slate-700 placeholder-slate-400 shadow-lg hover:shadow-xl"
            />
          </div>
        </div>

        {/* Desktop/Tablet Table View */}
        <div className="hidden sm:block animate-fade-in-up animation-delay-300">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-blue-50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-slate-700 border-b border-blue-100">Stock</th>
                    <th className="text-left p-4 font-semibold text-slate-700 border-b border-blue-100">Price</th>
                    <th className="text-left p-4 font-semibold text-slate-700 border-b border-blue-100">Change</th>
                    <th className="text-left p-4 font-semibold text-slate-700 border-b border-blue-100 hidden lg:table-cell">Volume</th>
                    <th className="text-left p-4 font-semibold text-slate-700 border-b border-blue-100 hidden lg:table-cell">Market Cap</th>
                    <th className="text-left p-4 font-semibold text-slate-700 border-b border-blue-100">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-slate-500">
                        <div className="flex flex-col items-center space-y-3">
                          <Activity className="h-12 w-12 text-blue-300" />
                          <p className="text-lg font-medium">
                            {searchTerm ? 'No stocks found matching your search' : 'Your watchlist is empty'}
                          </p>
                          <p className="text-sm text-slate-400">
                            {!searchTerm && 'Add your first stock to get started'}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredItems.map((item, index) => (
                      <tr 
                        key={item.id} 
                        className="border-b border-blue-50 hover:bg-blue-50/50 transition-all duration-300 animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-2 rounded-lg">
                              <Star className="h-4 w-4 text-white" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-slate-900 text-lg">{item.symbol}</div>
                              <div className="text-sm text-slate-600 truncate">{item.company}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-slate-900 text-lg">{formatCurrency(item.currentPrice)}</div>
                        </td>
                        <td className="p-4">
                          <div className={`flex items-center space-x-2 ${item.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            <div className={`p-1 rounded-full ${item.change >= 0 ? 'bg-emerald-100' : 'bg-red-100'}`}>
                              {item.change >= 0 ? (
                                <TrendingUp className="h-4 w-4" />
                              ) : (
                                <TrendingDown className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <div className="font-bold">{formatCurrency(Math.abs(item.change))}</div>
                              <div className="text-sm">{formatPercent(item.changePercent)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-slate-700 font-medium hidden lg:table-cell">{item.volume}</td>
                        <td className="p-4 text-slate-700 font-medium hidden lg:table-cell">{item.marketCap}</td>
                        <td className="p-4">
                          <button
                            onClick={() => handleRemoveFromWatchlist(item.id)}
                            className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:scale-110"
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
        </div>

        {/* Mobile Card View */}
        <div className="block sm:hidden space-y-4 animate-fade-in-up animation-delay-300">
          {filteredItems.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center border border-blue-100 shadow-lg">
              <Activity className="h-16 w-16 text-blue-300 mx-auto mb-4" />
              <p className="text-lg font-medium text-slate-700 mb-2">
                {searchTerm ? 'No stocks found matching your search' : 'Your watchlist is empty'}
              </p>
              <p className="text-sm text-slate-500">
                {!searchTerm && 'Add your first stock to get started'}
              </p>
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <div 
                key={item.id} 
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-2 rounded-lg">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-900 text-xl">{item.symbol}</div>
                      <div className="text-sm text-slate-600 truncate">{item.company}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFromWatchlist(item.id)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all duration-300 ml-2 flex-shrink-0"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg">
                    <div className="text-xs text-blue-600 uppercase tracking-wide font-semibold mb-1">Price</div>
                    <div className="font-bold text-slate-900 text-lg">{formatCurrency(item.currentPrice)}</div>
                  </div>
                  <div className={`bg-gradient-to-r ${item.change >= 0 ? 'from-emerald-50 to-green-50' : 'from-red-50 to-pink-50'} p-3 rounded-lg`}>
                    <div className={`text-xs ${item.change >= 0 ? 'text-emerald-600' : 'text-red-600'} uppercase tracking-wide font-semibold mb-1`}>Change</div>
                    <div className={`flex items-center space-x-2 ${item.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {item.change >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <div>
                        <span className="font-bold">{formatCurrency(Math.abs(item.change))}</span>
                        <span className="text-sm ml-1">{formatPercent(item.changePercent)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-slate-600 uppercase tracking-wide font-semibold mb-1">Volume</div>
                    <div className="text-slate-900 font-medium">{item.volume}</div>
                  </div>
                  <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-slate-600 uppercase tracking-wide font-semibold mb-1">Market Cap</div>
                    <div className="text-slate-900 font-medium">{item.marketCap}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Stock Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-blue-100 animate-scale-in">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                  <Plus className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Add Stock to Watchlist</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Stock Symbol
                  </label>
                  <input
                    type="text"
                    value={newSymbol}
                    onChange={(e) => setNewSymbol(e.target.value)}
                    placeholder="e.g., AAPL, GOOGL, MSFT"
                    className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-slate-700"
                  />
                </div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-3 text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all duration-300 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddToWatchlist}
                    disabled={!newSymbol.trim()}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 font-medium shadow-lg hover:shadow-xl"
                  >
                    Add to Watchlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  );
};

export default Watchlist;