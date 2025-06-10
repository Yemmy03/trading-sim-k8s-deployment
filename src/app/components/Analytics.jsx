'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Activity, Calendar } from 'lucide-react';

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
    { name: 'Healthcare', value: 20, color: '#10B981' },
    { name: 'Finance', value: 15, color: '#F59E0B' },
    { name: 'Consumer', value: 12, color: '#EF4444' },
    { name: 'Energy', value: 10, color: '#8B5CF6' },
    { name: 'Others', value: 8, color: '#6B7280' }
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
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((item, index) => (
            <p key={index} style={{ color: item.color }}>
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
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          <p style={{ color: payload[0].value >= 0 ? '#10B981' : '#EF4444' }}>
            P&L: {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Portfolio Analytics</h2>
          <p className="text-gray-600">Deep insights into your investment performance</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="1M">1 Month</option>
          <option value="3M">3 Months</option>
          <option value="6M">6 Months</option>
          <option value="1Y">1 Year</option>
          <option value="ALL">All Time</option>
        </select>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  </div>
                </div>
                <div className={`flex items-center ${
                  metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.changeType === 'positive' ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">{metric.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Performance Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio vs Benchmark</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={portfolioPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={3}
                name="Portfolio"
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="benchmark" 
                stroke="#10B981" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Benchmark"
                dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sector Allocation Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sector Allocation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sectorAllocationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly P&L Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly P&L</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyPnLData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip content={<PnLTooltip />} />
              <Bar 
                dataKey="pnl" 
                fill={(entry) => entry >= 0 ? '#10B981' : '#EF4444'}
                radius={[4, 4, 0, 0]}
              >
                {monthlyPnLData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.pnl >= 0 ? '#10B981' : '#EF4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performers */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
          <div className="space-y-4">
            {topPerformers.map((stock, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">{stock.symbol.charAt(0)}</span>
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900">{stock.symbol}</p>
                    <p className="text-sm text-gray-600">{stock.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">+{stock.return}%</p>
                  <p className="text-sm text-gray-600">{formatCurrency(stock.value)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">$62,000</p>
            <p className="text-sm text-gray-600">Current Value</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">+24.0%</p>
            <p className="text-sm text-gray-600">Total Return</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">15</p>
            <p className="text-sm text-gray-600">Holdings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;