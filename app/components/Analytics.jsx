'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Activity, Calendar, ArrowUp, ArrowDown } from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('6M');

  // Mock data for charts
  const portfolioPerformanceData = [
    { month: 'Jan', value: 50000, benchmark: 48000 },
    { month: 'Feb', value: 52000, benchmark: 49500 },
    { month: 'Mar', value: 48000, benchmark: 47000 },
    { month: 'Apr', value: 55000, benchmark: 51000 },
    { month: 'May', value: 58000, benchmark: 53500 },
    { month: 'Jun', value: 62000, benchmark: 56000 }
  ];

  const sectorAllocationData = [
    { name: 'Technology', value: 35, color: '#3B82F6' },
    { name: 'Healthcare', value: 20, color: '#60A5FA' },
    { name: 'Finance', value: 15, color: '#93C5FD' },
    { name: 'Consumer', value: 12, color: '#DBEAFE' },
    { name: 'Energy', value: 10, color: '#1E40AF' },
    { name: 'Others', value: 8, color: '#1E3A8A' }
  ];

  const monthlyPnLData = [
    { month: 'Jan', pnl: 2000 },
    { month: 'Feb', pnl: 2500 },
    { month: 'Mar', pnl: -1500 },
    { month: 'Apr', pnl: 3500 },
    { month: 'May', pnl: 4200 },
    { month: 'Jun', pnl: 3800 }
  ];

  const topPerformers = [
    { symbol: 'NVDA', name: 'NVIDIA Corp', return: 45.2, value: 12500 },
    { symbol: 'AAPL', name: 'Apple Inc', return: 28.7, value: 8900 },
    { symbol: 'MSFT', name: 'Microsoft', return: 22.1, value: 7600 },
    { symbol: 'GOOGL', name: 'Alphabet', return: 18.9, value: 6400 },
    { symbol: 'AMZN', name: 'Amazon', return: 15.3, value: 5200 }
  ];

  const metricsData = [
    {
      title: 'Total Return',
      value: '$12,450',
      change: '+24.5%',
      changeType: 'positive',
      icon: DollarSign
    },
    {
      title: 'Sharpe Ratio',
      value: '1.45',
      change: '+0.12',
      changeType: 'positive',
      icon: Activity
    },
    {
      title: 'Beta',
      value: '0.89',
      change: '-0.05',
      changeType: 'negative',
      icon: TrendingUp
    },
    {
      title: 'Max Drawdown',
      value: '-8.2%',
      change: '+2.3%',
      changeType: 'positive',
      icon: TrendingDown
    }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 border border-blue-200 rounded-xl shadow-2xl">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          {payload.map((item, index) => (
            <p key={index} style={{ color: item.color }} className="text-sm font-medium">
              {item.name}: {formatCurrency(item.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PnLTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 border border-blue-200 rounded-xl shadow-2xl">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          <p style={{ color: payload[0].value >= 0 ? '#10B981' : '#EF4444' }} className="text-sm font-medium">
            P&L: {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Portfolio Analytics
            </h1>
            <p className="text-gray-600 text-lg">Advanced insights into your investment performance</p>
          </div>
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:shadow-md appearance-none cursor-pointer"
            >
              <option value="1M">1 Month</option>
              <option value="3M">3 Months</option>
              <option value="6M">6 Months</option>
              <option value="1Y">1 Year</option>
              <option value="ALL">All Time</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <ArrowDown className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsData.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div
                key={index}
                className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-blue-100 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    </div>
                  </div>
                  <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    metric.changeType === 'positive' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {metric.changeType === 'positive' ? (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    )}
                    <span>{metric.change}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Portfolio Performance Chart */}
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-blue-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Portfolio vs Benchmark</h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Portfolio</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Benchmark</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={portfolioPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                <YAxis tickFormatter={(value) => formatCurrency(value)} stroke="#6B7280" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  strokeWidth={4}
                  name="Portfolio"
                  dot={{ fill: '#3B82F6', strokeWidth: 3, r: 6 }}
                  activeDot={{ r: 8, fill: '#1E40AF' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="benchmark" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  strokeDasharray="8 8"
                  name="Benchmark"
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Sector Allocation Pie Chart */}
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-blue-100 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Sector Allocation</h3>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={sectorAllocationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="#ffffff"
                  strokeWidth={2}
                >
                  {sectorAllocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly P&L and Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly P&L Bar Chart */}
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-blue-100 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Monthly P&L</h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={monthlyPnLData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                <YAxis tickFormatter={(value) => formatCurrency(value)} stroke="#6B7280" fontSize={12} />
                <Tooltip content={<PnLTooltip />} />
                <Bar 
                  dataKey="pnl" 
                  radius={[8, 8, 0, 0]}
                >
                  {monthlyPnLData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.pnl >= 0 ? '#10B981' : '#EF4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Performers */}
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-blue-100 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Top Performers</h3>
            <div className="space-y-4">
              {topPerformers.map((stock, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl border border-blue-100 hover:shadow-md hover:scale-102 transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">{stock.symbol.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{stock.symbol}</p>
                      <p className="text-sm text-gray-600">{stock.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center bg-green-100 px-3 py-1 rounded-full mb-1">
                      <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                      <span className="font-bold text-green-700">{stock.return}%</span>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">{formatCurrency(stock.value)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-2xl shadow-lg text-white">
          <h3 className="text-2xl font-bold mb-8 text-center">Portfolio Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105">
                <p className="text-4xl font-bold mb-2">$62,000</p>
                <p className="text-blue-100 font-medium">Current Value</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105">
                <p className="text-4xl font-bold mb-2">+24.0%</p>
                <p className="text-blue-100 font-medium">Total Return</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105">
                <p className="text-4xl font-bold mb-2">15</p>
                <p className="text-blue-100 font-medium">Holdings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
        
        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }
        
        .hover\\:scale-110:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default Analytics;