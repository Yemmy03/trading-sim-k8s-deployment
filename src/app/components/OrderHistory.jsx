'use client'

import React, { useState } from 'react';
import { Calendar, Filter, Download, Clock, CheckCircle, XCircle, AlertCircle, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';

const OrderHistory = () => {
  const [orders] = useState([
    {
      id: 'ORD-001',
      symbol: 'AAPL',
      company: 'Apple Inc.',
      type: 'BUY',
      orderType: 'Market',
      quantity: 50,
      price: 175.25,
      executedPrice: 175.30,
      status: 'Filled',
      date: '2024-06-08',
      time: '09:32:15',
      total: 8765.00
    },
    {
      id: 'ORD-002',
      symbol: 'GOOGL',
      company: 'Alphabet Inc.',
      type: 'SELL',
      orderType: 'Limit',
      quantity: 25,
      price: 2750.00,
      executedPrice: 2750.00,
      status: 'Filled',
      date: '2024-06-07',
      time: '14:45:22',
      total: 68750.00
    },
    {
      id: 'ORD-003',
      symbol: 'MSFT',
      company: 'Microsoft Corporation',
      type: 'BUY',
      orderType: 'Limit',
      quantity: 30,
      price: 420.00,
      executedPrice: null,
      status: 'Pending',
      date: '2024-06-08',
      time: '11:15:33',
      total: 12600.00
    },
    {
      id: 'ORD-004',
      symbol: 'TSLA',
      company: 'Tesla, Inc.',
      type: 'BUY',
      orderType: 'Stop Loss',
      quantity: 20,
      price: 250.00,
      executedPrice: null,
      status: 'Cancelled',
      date: '2024-06-06',
      time: '16:22:11',
      total: 5000.00
    },
    {
      id: 'ORD-005',
      symbol: 'NVDA',
      company: 'NVIDIA Corporation',
      type: 'SELL',
      orderType: 'Market',
      quantity: 15,
      price: 875.50,
      executedPrice: 874.95,
      status: 'Partially Filled',
      date: '2024-06-05',
      time: '10:18:45',
      total: 13124.25
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [dateRange, setDateRange] = useState('7d');

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Filled':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'Pending':
        return <Clock className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'Cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'Partially Filled':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      default:
        return <Clock className="h-4 w-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Filled':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending':
        return 'bg-blue-50 text-blue-700 border-blue-200 animate-pulse';
      case 'Cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Partially Filled':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const filteredOrders = orders.filter(order => {
    const statusMatch = filterStatus === 'All' || order.status === filterStatus;
    const typeMatch = filterType === 'All' || order.type === filterType;
    return statusMatch && typeMatch;
  });

  const handleExport = () => {
    alert('Order history exported successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-4 sm:space-y-0">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Order History
              </h1>
              <p className="text-lg text-slate-600">View and manage your trading history</p>
            </div>
            <button
              onClick={handleExport}
              className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 min-h-[48px]"
            >
              <Download className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-medium">Export</span>
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 transition-all duration-300 hover:shadow-xl">
            <div className="space-y-4 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-6 sm:items-center">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Filter className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-lg font-semibold text-slate-700">Filters</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border-2 border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-blue-300"
                >
                  <option value="All">All Status</option>
                  <option value="Filled">Filled</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Partially Filled">Partially Filled</option>
                </select>
                
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-3 border-2 border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-blue-300"
                >
                  <option value="All">All Types</option>
                  <option value="BUY">Buy Orders</option>
                  <option value="SELL">Sell Orders</option>
                </select>
                
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-4 py-3 border-2 border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-blue-300"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-3 bg-blue-50 px-4 py-2 rounded-xl">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-700">{filteredOrders.length} orders</span>
              </div>
            </div>
          </div>

          {/* Orders - Desktop Table View */}
          <div className="hidden lg:block bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                  <tr>
                    <th className="text-left p-6 font-semibold">Order ID</th>
                    <th className="text-left p-6 font-semibold">Stock</th>
                    <th className="text-left p-6 font-semibold">Type</th>
                    <th className="text-left p-6 font-semibold">Quantity</th>
                    <th className="text-left p-6 font-semibold">Price</th>
                    <th className="text-left p-6 font-semibold">Total</th>
                    <th className="text-left p-6 font-semibold">Status</th>
                    <th className="text-left p-6 font-semibold">Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-12 text-slate-500">
                        <div className="space-y-2">
                          <div className="text-xl">No orders found</div>
                          <div className="text-sm">Try adjusting your filters</div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order, index) => (
                      <tr 
                        key={order.id} 
                        className="border-b border-slate-100 hover:bg-blue-50/50 transition-all duration-300 group"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <td className="p-6">
                          <div className="font-mono text-sm text-slate-700 group-hover:text-blue-600 transition-colors duration-300">
                            {order.id}
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="space-y-1">
                            <div className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors duration-300">
                              {order.symbol}
                            </div>
                            <div className="text-sm text-slate-500">{order.company}</div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              {order.type === 'BUY' ? (
                                <TrendingUp className="h-4 w-4 text-emerald-500" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-red-500" />
                              )}
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                                order.type === 'BUY' 
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                  : 'bg-red-50 text-red-700 border-red-200'
                              }`}>
                                {order.type}
                              </span>
                            </div>
                            <div className="text-xs text-slate-500 font-medium">{order.orderType}</div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="font-bold text-slate-800 text-lg">{order.quantity}</div>
                        </td>
                        <td className="p-6">
                          <div className="space-y-1">
                            <div className="font-bold text-slate-800">{formatCurrency(order.price)}</div>
                            {order.executedPrice && order.executedPrice !== order.price && (
                              <div className="text-sm text-blue-600 font-medium">
                                Exec: {formatCurrency(order.executedPrice)}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="font-bold text-slate-800 text-lg">{formatCurrency(order.total)}</div>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(order.status)}
                            <span className={`inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold border ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="space-y-1">
                            <div className="text-slate-700 font-medium">{order.date}</div>
                            <div className="text-slate-500 text-sm">{order.time}</div>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Orders - Mobile/Tablet Card View */}
          <div className="lg:hidden space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 p-8 text-center">
                <div className="space-y-2">
                  <div className="text-xl text-slate-700">No orders found</div>
                  <div className="text-slate-500">Try adjusting your filters</div>
                </div>
              </div>
            ) : (
              filteredOrders.map((order, index) => (
                <div 
                  key={order.id} 
                  className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Card Header */}
                  <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl text-white">
                          {order.type === 'BUY' ? (
                            <TrendingUp className="h-6 w-6" />
                          ) : (
                            <TrendingDown className="h-6 w-6" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-xl group-hover:text-blue-600 transition-colors duration-300">
                            {order.symbol}
                          </div>
                          <div className="text-sm text-slate-500">{order.company}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(order.status)}
                        <span className={`inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold border ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-2">Order Type</div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                            order.type === 'BUY' 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                              : 'bg-red-50 text-red-700 border-red-200'
                          }`}>
                            {order.type}
                          </span>
                          <span className="text-sm text-slate-600 font-medium">{order.orderType}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-2">Quantity</div>
                        <div className="font-bold text-slate-800 text-xl">{order.quantity}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-2">Price</div>
                        <div className="font-bold text-slate-800 text-lg">{formatCurrency(order.price)}</div>
                        {order.executedPrice && order.executedPrice !== order.price && (
                          <div className="text-sm text-blue-600 font-medium">
                            Exec: {formatCurrency(order.executedPrice)}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-2">Total</div>
                        <div className="font-bold text-slate-800 text-lg">{formatCurrency(order.total)}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Order ID</div>
                        <div className="font-mono text-sm text-slate-700">{order.id}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Date & Time</div>
                        <div className="text-sm text-slate-700 font-medium">{order.date}</div>
                        <div className="text-sm text-slate-500">{order.time}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: 'Total Orders',
                value: orders.length,
                color: 'from-blue-500 to-indigo-500',
                bgColor: 'bg-blue-50',
                icon: Calendar
              },
              {
                label: 'Filled Orders',
                value: orders.filter(o => o.status === 'Filled').length,
                color: 'from-emerald-500 to-green-500',
                bgColor: 'bg-emerald-50',
                icon: CheckCircle
              },
              {
                label: 'Pending Orders',
                value: orders.filter(o => o.status === 'Pending').length,
                color: 'from-amber-500 to-orange-500',
                bgColor: 'bg-amber-50',
                icon: Clock
              },
              {
                label: 'Total Volume',
                value: formatCurrency(orders.reduce((sum, order) => sum + order.total, 0)),
                color: 'from-purple-500 to-pink-500',
                bgColor: 'bg-purple-50',
                icon: TrendingUp
              }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`h-6 w-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                  <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;