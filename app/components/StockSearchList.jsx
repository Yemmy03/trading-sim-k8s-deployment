'use client';

import { useState, useMemo } from 'react';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';

// Mock watchlist data
const mockWatchlist = [
  { symbol: 'AMZN', company: 'Amazon.com Inc.', price: 3234.56, change: 45.23, changePercent: 1.42 },
  { symbol: 'NFLX', company: 'Netflix Inc.', price: 456.78, change: -12.34, changePercent: -2.63 },
  { symbol: 'NVDA', company: 'NVIDIA Corp.', price: 892.45, change: 23.67, changePercent: 2.73 },
  { symbol: 'META', company: 'Meta Platforms Inc.', price: 312.89, change: 8.45, changePercent: 2.78 },
];

export default function StockSearchList({ onSearch, onTrade }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const formatCurrency = useMemo(() => (amount) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount), []);

  const formatPercent = useMemo(() => (percent) =>
    `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      setIsSearching(true);
      setTimeout(() => {
        const results = mockWatchlist.filter((stock) =>
          stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
          stock.company.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
        setIsSearching(false);
      }, 400);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const handleTradeClick = (symbol) => onTrade(symbol);

  const StockItem = ({ stock }) => {
    const isPositive = stock.change >= 0;

    return (
      <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition duration-200">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-gray-800">{stock.symbol}</span>
            <span className="font-semibold text-gray-900">{formatCurrency(stock.price)}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 truncate max-w-[150px]">{stock.company}</span>
            <div className={`flex items-center space-x-1 ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>{formatPercent(stock.changePercent)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => handleTradeClick(stock.symbol)}
          className="ml-3 px-3 py-1 text-xs bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          Trade
        </button>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Search & Trade</h3>

      {/* Search Input */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search stocks..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
        />
      </div>

      {/* Results */}
      <div className="space-y-3">
        {isSearching ? (
          <div className="text-center py-6 text-gray-500">
            <div className="animate-spin h-6 w-6 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-sm">Searching...</p>
          </div>
        ) : searchQuery ? (
          searchResults.length > 0 ? (
            searchResults.map((stock, idx) => <StockItem key={idx} stock={stock} />)
          ) : (
            <div className="text-center py-4 text-gray-500 text-sm">No results found</div>
          )
        ) : (
          <>
            <div className="text-sm font-medium text-gray-600 mb-2">Watchlist</div>
            {mockWatchlist.map((stock, idx) => (
              <StockItem key={idx} stock={stock} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
