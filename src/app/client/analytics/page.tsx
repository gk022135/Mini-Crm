"use client"


import React from 'react'; 
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, Target, Phone, Mail, Calendar, Award, AlertCircle } from 'lucide-react';

const CRMAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Sample data for different charts
  const revenueData = [
    { month: 'Jan', revenue: 45000, leads: 120, deals: 25 },
    { month: 'Feb', revenue: 52000, leads: 145, deals: 32 },
    { month: 'Mar', revenue: 48000, leads: 135, deals: 28 },
    { month: 'Apr', revenue: 61000, leads: 160, deals: 38 },
    { month: 'May', revenue: 55000, leads: 148, deals: 34 },
    { month: 'Jun', revenue: 67000, leads: 175, deals: 42 },
  ];

  const conversionData = [
    { stage: 'Leads', value: 1250, color: '#3B82F6' },
    { stage: 'Qualified', value: 875, color: '#8B5CF6' },
    { stage: 'Proposal', value: 425, color: '#F59E0B' },
    { stage: 'Negotiation', value: 180, color: '#EF4444' },
    { stage: 'Closed Won', value: 125, color: '#10B981' },
  ];

  const leadSourceData = [
    { name: 'Website', value: 35, color: '#3B82F6' },
    { name: 'Social Media', value: 25, color: '#8B5CF6' },
    { name: 'Email Campaign', value: 20, color: '#F59E0B' },
    { name: 'Referral', value: 15, color: '#10B981' },
    { name: 'Cold Calling', value: 5, color: '#EF4444' },
  ];

  const teamPerformanceData = [
    { name: 'Alice Johnson', deals: 28, revenue: 145000, conversion: 22 },
    { name: 'Bob Smith', deals: 24, revenue: 132000, conversion: 18 },
    { name: 'Carol Davis', deals: 31, revenue: 167000, conversion: 25 },
    { name: 'David Wilson', deals: 19, revenue: 98000, conversion: 15 },
    { name: 'Eva Brown', deals: 26, revenue: 141000, conversion: 21 },
  ];

  const activityData = [
    { day: 'Mon', calls: 45, emails: 78, meetings: 12 },
    { day: 'Tue', calls: 52, emails: 85, meetings: 15 },
    { day: 'Wed', calls: 48, emails: 72, meetings: 18 },
    { day: 'Thu', calls: 61, emails: 92, meetings: 14 },
    { day: 'Fri', calls: 38, emails: 65, meetings: 16 },
    { day: 'Sat', calls: 25, emails: 45, meetings: 8 },
    { day: 'Sun', calls: 18, emails: 32, meetings: 5 },
  ];

  type MetricCardProps = {
    title: string;
    value: string | number;
    change: string;
    icon: React.ElementType;
    trend: 'up' | 'down';
  };

  const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon: Icon, trend }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          <div className="flex items-center mt-2">
            {trend === 'up' ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {change}
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
        <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
    </div>
  );

  type ChartContainerProps = {
    title: string;
    children: React.ReactNode;
    className?: string;
  };

  const ChartContainer: React.FC<ChartContainerProps> = ({ title, children, className = "" }) => (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CRM Analytics</h1>
              <p className="text-gray-600 mt-1">Track your sales performance and customer insights</p>
            </div>
            <div className="flex items-center space-x-3">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value="$328K"
            change="+12.5%"
            icon={DollarSign}
            trend="up"
          />
          <MetricCard
            title="Active Leads"
            value="1,247"
            change="+8.2%"
            icon={Users}
            trend="up"
          />
          <MetricCard
            title="Conversion Rate"
            value="18.4%"
            change="-2.1%"
            icon={Target}
            trend="down"
          />
          <MetricCard
            title="Closed Deals"
            value="156"
            change="+15.3%"
            icon={Award}
            trend="up"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ChartContainer title="Revenue & Deals Trend">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }} />
                <Line type="monotone" dataKey="deals" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer title="Lead Sources Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadSourceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {leadSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <ChartContainer title="Sales Funnel Conversion" className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis dataKey="stage" type="category" stroke="#6b7280" width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer title="Weekly Activity">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area type="monotone" dataKey="calls" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="emails" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="meetings" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Team Performance Table */}
        <ChartContainer title="Team Performance">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Sales Rep</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Deals Closed</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Revenue Generated</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Conversion Rate</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Performance</th>
                </tr>
              </thead>
              <tbody>
                {teamPerformanceData.map((rep, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-medium text-blue-600">
                            {rep.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{rep.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-900">{rep.deals}</td>
                    <td className="py-3 px-4 text-gray-900">${rep.revenue.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-900">{rep.conversion}%</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(rep.conversion / 25) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{rep.conversion > 20 ? 'Excellent' : rep.conversion > 15 ? 'Good' : 'Needs Improvement'}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartContainer>
      </div>
    </div>
  );
};

export default CRMAnalytics;