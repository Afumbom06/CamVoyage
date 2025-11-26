import {
  Users,
  MapPin,
  TrendingUp,
  DollarSign,
  Eye,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import AdminLayout from '../../components/AdminLayout';
import { mockDestinations } from '../../lib/mockData';
import { useT } from '../../lib/translationStore';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

export default function AdminDashboard() {
  const t = useT();
  
  const stats = [
    {
      icon: MapPin,
      color: 'emerald',
      value: mockDestinations.length,
      title: t('totalDestinations'),
      change: '12%',
      changeType: 'increase',
    },
    {
      icon: Users,
      color: 'blue',
      value: '1,847',
      title: t('totalUsers'),
      change: '8%',
      changeType: 'increase',
    },
    {
      icon: Eye,
      color: 'purple',
      value: '15,432',
      title: t('monthlyVisits'),
      change: '24%',
      changeType: 'increase',
    },
    {
      icon: DollarSign,
      color: 'yellow',
      value: '2.45M XAF',
      title: t('monthlyRevenue'),
      change: '3%',
      changeType: 'decrease',
    },
  ];

  const recentActivity = [
    { type: 'new_user', user: 'John Doe', action: 'registered', time: '2 hours ago' },
    {
      type: 'destination',
      user: 'Admin',
      action: 'added Mount Cameroon',
      time: '5 hours ago',
    },
    { type: 'booking', user: 'Jane Smith', action: 'booked a tour', time: '1 day ago' },
  ];

  // Revenue data for chart
  const revenueData = [
    { month: 'Jan', revenue: 1850000, expenses: 1200000, profit: 650000 },
    { month: 'Feb', revenue: 2100000, expenses: 1350000, profit: 750000 },
    { month: 'Mar', revenue: 1950000, expenses: 1280000, profit: 670000 },
    { month: 'Apr', revenue: 2350000, expenses: 1500000, profit: 850000 },
    { month: 'May', revenue: 2650000, expenses: 1650000, profit: 1000000 },
    { month: 'Jun', revenue: 2450000, expenses: 1580000, profit: 870000 },
    { month: 'Jul', revenue: 2800000, expenses: 1720000, profit: 1080000 },
    { month: 'Aug', revenue: 2950000, expenses: 1850000, profit: 1100000 },
    { month: 'Sep', revenue: 2700000, expenses: 1690000, profit: 1010000 },
    { month: 'Oct', revenue: 2850000, expenses: 1750000, profit: 1100000 },
    { month: 'Nov', revenue: 3100000, expenses: 1900000, profit: 1200000 },
    { month: 'Dec', revenue: 3450000, expenses: 2100000, profit: 1350000 },
  ];

  return (
    <AdminLayout>
      <div className="p-8 bg-gray-50">
        <div className="mb-6">
          <h1 className="text-2xl text-gray-900 mb-1">{t('dashboardOverview')}</h1>
          <p className="text-sm text-gray-600">{t('welcomeBack')}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`bg-${stat.color}-50 p-2 rounded`}>
                      <Icon className={`size-4 text-${stat.color}-600`} />
                    </div>
                    {stat.change && (
                      <span
                        className={`text-xs ${
                          stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {stat.change}{' '}
                        {stat.changeType === 'increase' ? (
                          <ArrowUp className="inline size-3" />
                        ) : (
                          <ArrowDown className="inline size-3" />
                        )}
                      </span>
                    )}
                  </div>
                  <div className="text-2xl text-gray-900 mb-1">{stat.value}</div>
                  <p className="text-xs text-gray-600">{stat.title}</p>
                  {stat.subtitle && <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Recent Activity */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{t('recentActivity')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 pb-4 border-b last:border-0">
                    <div className="bg-emerald-100 p-2 rounded">
                      <TrendingUp className="size-4 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        <span>{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Popular Destinations */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{t('topDestinations')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockDestinations.slice(0, 5).map((dest) => (
                  <div key={dest.id} className="flex items-center space-x-3 pb-3 border-b last:border-0">
                    <img
                      src={dest.images[0]}
                      alt={dest.name}
                      className="size-12 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{dest.name}</p>
                      <p className="text-xs text-gray-500">{dest.region}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-gray-900">{dest.rating}</span>
                        <span className="text-yellow-500">⭐</span>
                      </div>
                      <Badge variant="outline" className="text-xs mt-1">{dest.category}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Stats Graph Placeholder */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{t('monthlyStatistics')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => `${value.toLocaleString()} XAF`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#059669"
                  strokeWidth={2}
                  name="Revenue"
                  dot={{ fill: '#059669', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Expenses"
                  dot={{ fill: '#ef4444', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Profit"
                  dot={{ fill: '#3b82f6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}