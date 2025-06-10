'use client'

import React, { useState } from 'react';
import { Calendar, Filter, Download, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

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
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case 'Pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'Partially Filled':
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Filled':
        return 'bg-emerald-100 text-emerald-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Partially Filled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    const statusMatch = filterStatus === 'All' || order.status === filterStatus;
    const typeMatch = filterType === 'All' || order.type === filterType;
    return statusMatch && typeMatch;
  });

  const handleExport = () => {
    // Mock export functionality
    alert('Order history exported successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
          <p className="text-gray-600">View and manage your trading history</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Types</option>
            <option value="BUY">Buy Orders</option>
            <option value="SELL">Sell Orders</option>
          </select>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{filteredOrders.length} orders found</span>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700">Order ID</th>
                <th className="text-left p-4 font-semibold text-gray-700">Stock</th>
                <th className="text-left p-4 font-semibold text-gray-700">Type</th>
                <th className="text-left p-4 font-semibold text-gray-700">Quantity</th>
                <th className="text-left p-4 font-semibold text-gray-700">Price</th>
                <th className="text-left p-4 font-semibold text-gray-700">Total</th>
                <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                <th className="text-left p-4 font-semibold text-gray-700">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-500">
                    No orders found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-mono text-sm text-gray-900">{order.id}</div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-semibold text-gray-900">{order.symbol}</div>
                        <div className="text-sm text-gray-600">{order.company}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          order.type === 'BUY' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {order.type}
                        </span>
                        <div className="text-xs text-gray-600">{order.orderType}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-gray-900">{order.quantity}</div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-semibold text-gray-900">{formatCurrency(order.price)}</div>
                        {order.executedPrice && order.executedPrice !== order.price && (
                          <div className="text-sm text-gray-600">
                            Exec: {formatCurrency(order.executedPrice)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-gray-900">{formatCurrency(order.total)}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <div className="text-gray-900">{order.date}</div>
                        <div className="text-gray-600">{order.time}</div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-sm text-gray-600">Total Orders</div>
          <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-sm text-gray-600">Filled Orders</div>
          <div className="text-2xl font-bold text-emerald-600">
            {orders.filter(o => o.status === 'Filled').length}
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-sm text-gray-600">Pending Orders</div>
          <div className="text-2xl font-bold text-yellow-600">
            {orders.filter(o => o.status === 'Pending').length}
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-sm text-gray-600">Total Volume</div>
          <div className="text-2xl font-bold text-blue-600">
            {formatCurrency(orders.reduce((sum, order) => sum + order.total, 0))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;