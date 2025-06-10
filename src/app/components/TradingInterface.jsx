'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import DashboardHeader from './DashboardHeader.jsx';
import { PortfolioSummary } from './PortfolioSummary.jsx';
import StockSearchList from './StockSearchList.jsx';
import Portfolio from './Portfolio.jsx';
import Analytics from './Analytics.jsx';
import OrderHistory from './OrderHistory.jsx';
import Watchlist from './Watchlist.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import { onAuthStateChange, getCurrentUser, getUserData, signOutUser } from './auth.js';

// Mock data - replace with real data later
const mockPortfolio = [
  { symbol: 'AAPL', company: 'Apple Inc.', shares: 10, avgPrice: 150.25, currentPrice: 175.80, value: 1758.00 },
  { symbol: 'GOOGL', company: 'Alphabet Inc.', shares: 5, avgPrice: 2450.00, currentPrice: 2680.50, value: 13402.50 },
  { symbol: 'MSFT', company: 'Microsoft Corp.', shares: 8, avgPrice: 310.75, currentPrice: 335.20, value: 2681.60 },
  { symbol: 'TSLA', company: 'Tesla Inc.', shares: 3, avgPrice: 850.00, currentPrice: 720.30, value: 2160.90 },
];

const mockRecentTrades = [
  { symbol: 'AAPL', type: 'BUY', shares: 5, price: 175.80, date: '2024-06-08', time: '14:30' },
  { symbol: 'GOOGL', type: 'SELL', shares: 2, price: 2680.50, date: '2024-06-08', time: '11:15' },
  { symbol: 'MSFT', type: 'BUY', shares: 3, price: 335.20, date: '2024-06-07', time: '16:45' },
];

// Sample stock data for search
const mockStockData = [
  { symbol: 'AAPL', company: 'Apple Inc.', price: 175.80, change: 2.45, changePercent: 1.41 },
  { symbol: 'GOOGL', company: 'Alphabet Inc.', price: 2680.50, change: -15.30, changePercent: -0.57 },
  { symbol: 'MSFT', company: 'Microsoft Corp.', price: 335.20, change: 5.75, changePercent: 1.75 },
  { symbol: 'TSLA', company: 'Tesla Inc.', price: 720.30, change: -12.50, changePercent: -1.71 },
  { symbol: 'AMZN', company: 'Amazon.com Inc.', price: 3245.67, change: 18.90, changePercent: 0.59 },
  { symbol: 'NVDA', company: 'NVIDIA Corp.', price: 892.15, change: 23.45, changePercent: 2.70 },
];

// Add Position Modal Component
const AddPositionModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    symbol: '',
    company: '',
    shares: '',
    price: '',
    orderType: 'market'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = mockStockData.filter(stock => 
        stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
        stock.company.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const selectStock = (stock) => {
    setFormData(prev => ({
      ...prev,
      symbol: stock.symbol,
      company: stock.company,
      price: formData.orderType === 'market' ? stock.price.toString() : prev.price
    }));
    setSearchQuery(stock.symbol);
    setSearchResults([]);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.symbol.trim()) {
      newErrors.symbol = 'Stock symbol is required';
    }
    
    if (!formData.shares || parseFloat(formData.shares) <= 0) {
      newErrors.shares = 'Valid number of shares is required';
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const positionData = {
        ...formData,
        shares: parseFloat(formData.shares),
        price: parseFloat(formData.price),
        totalValue: parseFloat(formData.shares) * parseFloat(formData.price)
      };
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSubmit(positionData);
      onClose();
      
      // Reset form
      setFormData({
        symbol: '',
        company: '',
        shares: '',
        price: '',
        orderType: 'market'
      });
      setSearchQuery('');
      setSearchResults([]);
    } catch (error) {
      console.error('Error adding position:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const totalValue = formData.shares && formData.price ? 
    parseFloat(formData.shares) * parseFloat(formData.price) : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Add New Position</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Stock Search */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Symbol
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search by symbol or company name"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.symbol ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              {errors.symbol && (
                <p className="text-red-500 text-xs mt-1">{errors.symbol}</p>
              )}
              
              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {searchResults.map((stock, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => selectStock(stock)}
                      className="w-full px-3 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-medium text-gray-900">{stock.symbol}</div>
                      <div className="text-sm text-gray-600">{stock.company}</div>
                      <div className="text-sm text-gray-900">{formatCurrency(stock.price)}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Order Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order Type
              </label>
              <select
                value={formData.orderType}
                onChange={(e) => handleInputChange('orderType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="market">Market Order</option>
                <option value="limit">Limit Order</option>
              </select>
            </div>

            {/* Shares */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Shares
              </label>
              <input
                type="number"
                value={formData.shares}
                onChange={(e) => handleInputChange('shares', e.target.value)}
                placeholder="Enter number of shares"
                min="1"
                step="1"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.shares ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.shares && (
                <p className="text-red-500 text-xs mt-1">{errors.shares}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formData.orderType === 'market' ? 'Current Price' : 'Limit Price'}
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="Enter price per share"
                min="0.01"
                step="0.01"
                disabled={formData.orderType === 'market' && formData.symbol}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.price ? 'border-red-300' : 'border-gray-300'
                } ${formData.orderType === 'market' && formData.symbol ? 'bg-gray-50' : ''}`}
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price}</p>
              )}
            </div>

            {/* Total Value */}
            {totalValue > 0 && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Value:</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(totalValue)}</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Adding...' : 'Add Position'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Trade Modal Component
const TradeModal = ({ isOpen, onClose, onSubmit, symbol, currentPrice, availableShares }) => {
  const [formData, setFormData] = useState({
    action: 'buy',
    orderType: 'market',
    shares: '',
    price: currentPrice?.toString() || '',
    timeInForce: 'day'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentPrice) {
      setFormData(prev => ({
        ...prev,
        price: prev.orderType === 'market' ? currentPrice.toString() : prev.price
      }));
    }
  }, [currentPrice]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Auto-update price for market orders
    if (field === 'orderType' && value === 'market' && currentPrice) {
      setFormData(prev => ({ ...prev, price: currentPrice.toString() }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.shares || parseFloat(formData.shares) <= 0) {
      newErrors.shares = 'Valid number of shares is required';
    }
    
    if (formData.action === 'sell' && availableShares && parseFloat(formData.shares) > availableShares) {
      newErrors.shares = `Cannot sell more than ${availableShares} shares`;
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const tradeData = {
        symbol,
        action: formData.action,
        orderType: formData.orderType,
        shares: parseFloat(formData.shares),
        price: parseFloat(formData.price),
        timeInForce: formData.timeInForce,
        totalValue: parseFloat(formData.shares) * parseFloat(formData.price),
        timestamp: new Date().toISOString()
      };
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSubmit(tradeData);
      onClose();
      
      // Reset form
      setFormData({
        action: 'buy',
        orderType: 'market',
        shares: '',
        price: currentPrice?.toString() || '',
        timeInForce: 'day'
      });
    } catch (error) {
      console.error('Error executing trade:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const totalValue = formData.shares && formData.price ? 
    parseFloat(formData.shares) * parseFloat(formData.price) : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Trade {symbol}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {currentPrice && (
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <div className="text-sm text-gray-600">Current Price</div>
              <div className="text-lg font-semibold text-gray-900">{formatCurrency(currentPrice)}</div>
              {availableShares && (
                <div className="text-sm text-gray-600 mt-1">Available: {availableShares} shares</div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Buy/Sell Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Action
              </label>
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleInputChange('action', 'buy')}
                  className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                    formData.action === 'buy'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Buy
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('action', 'sell')}
                  className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                    formData.action === 'sell'
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Sell
                </button>
              </div>
            </div>

            {/* Order Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order Type
              </label>
              <select
                value={formData.orderType}
                onChange={(e) => handleInputChange('orderType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="market">Market Order</option>
                <option value="limit">Limit Order</option>
                <option value="stop">Stop Order</option>
                <option value="stop-limit">Stop-Limit Order</option>
              </select>
            </div>

            {/* Shares */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Shares
              </label>
              <input
                type="number"
                value={formData.shares}
                onChange={(e) => handleInputChange('shares', e.target.value)}
                placeholder="Enter number of shares"
                min="1"
                step="1"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.shares ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.shares && (
                <p className="text-red-500 text-xs mt-1">{errors.shares}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formData.orderType === 'market' ? 'Market Price' : 'Limit Price'}
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="Enter price per share"
                min="0.01"
                step="0.01"
                disabled={formData.orderType === 'market'}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.price ? 'border-red-300' : 'border-gray-300'
                } ${formData.orderType === 'market' ? 'bg-gray-50' : ''}`}
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price}</p>
              )}
            </div>

            {/* Time in Force */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time in Force
              </label>
              <select
                value={formData.timeInForce}
                onChange={(e) => handleInputChange('timeInForce', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="day">Day</option>
                <option value="gtc">Good Till Canceled</option>
                <option value="ioc">Immediate or Cancel</option>
                <option value="fok">Fill or Kill</option>
              </select>
            </div>

            {/* Order Summary */}
            {totalValue > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="text-sm font-medium text-gray-700 mb-2">Order Summary</div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Action:</span>
                  <span className={`font-medium ${formData.action === 'buy' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {formData.action.toUpperCase()} {formData.shares} shares
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Estimated Total:</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(totalValue)}</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  formData.action === 'buy'
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isSubmitting 
                  ? 'Processing...' 
                  : `${formData.action === 'buy' ? 'Buy' : 'Sell'} ${symbol}`
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
// RecentTradesList Component (keep this here or move to separate file)
const RecentTradesList = ({ trades, onViewAllTrades, className = "", maxTrades }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const displayedTrades = maxTrades ? trades.slice(0, maxTrades) : trades;

  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Trades</h3>
      
      {displayedTrades.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No recent trades</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayedTrades.map((trade, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900">{trade.symbol}</span>
                  <span className={`text-xs px-2 py-1 rounded font-medium ${
                    trade.type === 'BUY' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {trade.type}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {trade.shares} shares @ {formatCurrency(trade.price)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {trade.date} {trade.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {trades.length > 0 && (
        <button onClick={onViewAllTrades} className="w-full mt-4 text-emerald-600 hover:text-emerald-700 text-sm font-medium">
          View All Trades
        </button>
      )}
    </div>
  );
};

export default function TradingInterface() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);
  const [totalGainLoss, setTotalGainLoss] = useState(0);
  const [totalGainLossPercent, setTotalGainLossPercent] = useState(0);
  const [cash, setCash] = useState(50000);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeView, setActiveView] = useState('Portfolio');
  const [showAddPositionModal, setShowAddPositionModal] = useState(false);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');


  useEffect(() => {

    const unsubscribe = onAuthStateChange(async (authUser) => {
      if (authUser) {
        setUser(authUser);
        // Get additional user data from Firestore
        const result = await getUserData(authUser.uid);
        if (result.success) {
          setUserData(result.data);
        }
        setAuthLoading(false);
      } else {
        // User is not authenticated, redirect to landing page
        setUser(null);
        setUserData(null);
        router.push('/');
      }
    });

    return unsubscribe;
  }, [router]);

  // Check for existing user on mount
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/');
    } else {
      setAuthLoading(false);
    }
  }, [router]);

  // Function to get display name for the user
  const getDisplayName = () => {
    if (userData?.name) {
      return userData.name;
    }
    if (user?.displayName) {
      return user.displayName;
    }
    if (user?.email) {
      // Extract name from email (before @)
      return user.email.split('@')[0];
    }
    return 'User';
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOutUser();
      // The onAuthStateChange listener will handle the redirect
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Calculate portfolio totals
  useEffect(() => {
    const portfolioValue = mockPortfolio.reduce((sum, stock) => sum + stock.value, 0);
    const totalCost = mockPortfolio.reduce((sum, stock) => sum + (stock.shares * stock.avgPrice), 0);
    const gainLoss = portfolioValue - totalCost;
    const gainLossPercent = totalCost > 0 ? (gainLoss / totalCost) * 100 : 0;

    setTotalValue(portfolioValue);
    setTotalGainLoss(gainLoss);
    setTotalGainLossPercent(gainLossPercent);

    // Placeholder values - replace with actual calculations
    setTotalValue(75000);
    setTotalGainLoss(5000);
    setTotalGainLossPercent(7.14);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Add your refresh logic here
      // For example, refetch user data, portfolio data, etc.
      if (user) {
        const result = await getUserData(user.uid);
        if (result.success) {
          setUserData(result.data);
        }
      }
      // Refresh portfolio data
      // await fetchPortfolioData();
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercent = (percent) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Implement search functionality
  };

  const handleTrade = (symbol) => {
    console.log('Trading:', symbol);
    // Replace mockPortfolio and mockStockData with your actual data
    // const stock = mockPortfolio.find(s => s.symbol === symbol) || 
    //               mockStockData.find(s => s.symbol === symbol);
    
    // Placeholder logic - replace with actual implementation
    const stock = { symbol, currentPrice: 150, shares: 10 };
    
    if (stock) {
      setSelectedStock({
        symbol: stock.symbol,
        currentPrice: stock.currentPrice || stock.price,
        availableShares: stock.shares || 0
      });
      setShowTradeModal(true);
    }
  };

  const handleViewAllTrades = () => {
    console.log('View all trades');
    // Implement navigation to trades page
  };

  const handleAddPosition = () => {
    console.log('Adding new position');
    setShowAddPositionModal(true);
  };

  const handleAddPositionSubmit = (positionData) => {
    console.log('New position added:', positionData);
    // Add logic to update portfolio state
    // This would typically involve API calls and state updates
  };

  const handleTradeSubmit = (tradeData) => {
    console.log('Trade executed:', tradeData);
    // Add logic to execute trade and update portfolio
    // This would typically involve API calls and state updates
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600 text-xl">Loading dashboard...</div>
      </div>
    );
  }

  // If no user, don't render (will be redirected)
  if (!user) {
    return null;
  }

  const handleTabChange = (tab) => {
    if (tab === activeView) return; // Don't reload if same tab
    
    setIsLoading(true);
    
    // Set custom loading message for each tab
    const messages = {
      'Portfolio': 'Loading your portfolio...',
      'Watchlist': 'Loading your watchlist...',
      'Orders': 'Loading your orders...',
      'Analytics': 'Loading analytics dashboard...'
    };
    
    setLoadingMessage(messages[tab] || 'Loading...');
    
    // Simulate 3-second loading
    setTimeout(() => {
      setActiveView(tab);
      setIsLoading(false);
    }, 2500);
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner message={loadingMessage} />;
    }

    switch(activeView) {
      case 'Portfolio':
        return (
          <Portfolio
            getDisplayName={getDisplayName}
            totalValue={totalValue}
            cash={cash}
            totalGainLoss={totalGainLoss}
            totalGainLossPercent={totalGainLossPercent}
            mockPortfolio={mockPortfolio}
            mockRecentTrades={mockRecentTrades}
            handleAddPosition={handleAddPosition}
            handleSearch={handleSearch}
            handleTrade={handleTrade}
            handleViewAllTrades={handleViewAllTrades}
            formatCurrency={formatCurrency}
            formatPercent={formatPercent}
            PortfolioSummary={PortfolioSummary}
            StockSearchList={StockSearchList}
            RecentTradesList={RecentTradesList}
          />
        );
      case 'Watchlist':
        return <Watchlist />;
      case 'Orders':
        return <OrderHistory />;
      case 'Analytics':
        return <Analytics />;
      default:
        return <Portfolio /* props */ />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <DashboardHeader
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        userName={getDisplayName()}
        activeTab={activeView}
        onTabChange={handleTabChange}
        onSignOut={handleSignOut} // Optional: add sign out functionality
        userEmail={user?.email}
      />
      
      <div className="content-area">
        {renderContent()}
      </div>
      
        {/* Modals */}
        {showAddPositionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Position</h3>
              <p className="text-gray-600 mb-4">Add position modal content...</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowAddPositionModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleAddPositionSubmit({});
                    setShowAddPositionModal(false);
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                >
                  Add Position
                </button>
              </div>
            </div>
          </div>
        )}

        {showTradeModal && selectedStock && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Trade {selectedStock.symbol}
              </h3>
              <p className="text-gray-600 mb-4">
                Current Price: {formatCurrency(selectedStock.currentPrice)}
              </p>
              <p className="text-gray-600 mb-4">
                Available Shares: {selectedStock.availableShares}
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setShowTradeModal(false);
                    setSelectedStock(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleTradeSubmit({ symbol: selectedStock.symbol });
                    setShowTradeModal(false);
                    setSelectedStock(null);
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                >
                  Execute Trade
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}