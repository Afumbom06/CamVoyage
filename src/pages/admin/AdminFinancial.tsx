import { useState } from 'react';
import { Download, TrendingUp, DollarSign, TrendingDown, Plus, Edit, Trash2, FileText } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import AdminLayout from '../../components/AdminLayout';
import { useT } from '../../lib/translationStore';
import { toast } from 'sonner@2.0.3';

export default function AdminFinancial() {
  const t = useT();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income');
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const financialSummary = {
    totalRevenue: 12450000,
    totalExpenses: 8320000,
    profit: 4130000,
    monthlyGrowth: 15.3,
  };

  const transactions = [
    {
      id: '1',
      type: 'income',
      amount: 150000,
      category: 'Tour Booking',
      description: 'Mount Cameroon Tour - Group of 5',
      date: '2025-11-15',
    },
    {
      id: '2',
      type: 'expense',
      amount: 75000,
      category: 'Marketing',
      description: 'Facebook Ads Campaign',
      date: '2025-11-14',
    },
    {
      id: '3',
      type: 'income',
      amount: 200000,
      category: 'Entry Fees',
      description: 'Waza National Park - 10 visitors',
      date: '2025-11-13',
    },
    {
      id: '4',
      type: 'expense',
      amount: 120000,
      category: 'Operations',
      description: 'Vehicle Maintenance',
      date: '2025-11-12',
    },
    {
      id: '5',
      type: 'income',
      amount: 300000,
      category: 'Tour Booking',
      description: 'Kribi Beach Package - 8 people',
      date: '2025-11-11',
    },
    {
      id: '6',
      type: 'expense',
      amount: 50000,
      category: 'Staff',
      description: 'Guide Salaries',
      date: '2025-11-10',
    },
  ];

  // Chart data
  const monthlyData = [
    { month: 'Jan', revenue: 1850000, expenses: 1200000, profit: 650000 },
    { month: 'Feb', revenue: 2100000, expenses: 1350000, profit: 750000 },
    { month: 'Mar', revenue: 1950000, expenses: 1280000, profit: 670000 },
    { month: 'Apr', revenue: 2350000, expenses: 1500000, profit: 850000 },
    { month: 'May', revenue: 2650000, expenses: 1650000, profit: 1000000 },
    { month: 'Jun', revenue: 2450000, expenses: 1580000, profit: 870000 },
  ];

  const categoryData = [
    { name: 'Tour Bookings', value: 5500000 },
    { name: 'Entry Fees', value: 3200000 },
    { name: 'Accommodations', value: 2800000 },
    { name: 'Transport', value: 950000 },
  ];

  const expenseCategoryData = [
    { name: 'Marketing', value: 2200000 },
    { name: 'Operations', value: 3100000 },
    { name: 'Staff', value: 2500000 },
    { name: 'Maintenance', value: 520000 },
  ];

  const COLORS = ['#059669', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`${transactionType === 'income' ? 'Revenue' : 'Expense'} added successfully!`);
    setIsDialogOpen(false);
    setFormData({
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const handleExport = (format: string) => {
    toast.success(`Exporting financial data to ${format.toUpperCase()}...`);
    // In a real app, this would trigger actual file download
  };

  const openAddDialog = (type: 'income' | 'expense') => {
    setTransactionType(type);
    setIsDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="p-8 bg-gray-50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl text-gray-900 mb-1">Financial Management</h1>
            <p className="text-sm text-gray-600">Track revenue, expenses, and profitability</p>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
              <FileText className="size-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport('excel')}>
              <Download className="size-4 mr-2" />
              Export Excel
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
              <Download className="size-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-green-50 p-2 rounded">
                  <TrendingUp className="size-4 text-green-600" />
                </div>
                <Badge className="bg-green-100 text-green-700 text-xs">
                  +{financialSummary.monthlyGrowth}%
                </Badge>
              </div>
              <div className="text-2xl text-gray-900 mb-1">
                {financialSummary.totalRevenue.toLocaleString()} XAF
              </div>
              <p className="text-xs text-gray-600">Total Revenue</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-red-50 p-2 rounded">
                  <TrendingDown className="size-4 text-red-600" />
                </div>
                <Badge className="bg-red-100 text-red-700 text-xs">+15%</Badge>
              </div>
              <div className="text-2xl text-gray-900 mb-1">
                {financialSummary.totalExpenses.toLocaleString()} XAF
              </div>
              <p className="text-xs text-gray-600">Total Expenses</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-emerald-50 p-2 rounded">
                  <DollarSign className="size-4 text-emerald-600" />
                </div>
              </div>
              <div className="text-2xl text-gray-900 mb-1">
                {financialSummary.profit.toLocaleString()} XAF
              </div>
              <p className="text-xs text-gray-600">Net Profit</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-purple-50 p-2 rounded">
                  <TrendingUp className="size-4 text-purple-600" />
                </div>
                <Badge className="bg-green-100 text-green-700 text-xs">Healthy</Badge>
              </div>
              <div className="text-2xl text-gray-900 mb-1">
                {((financialSummary.profit / financialSummary.totalRevenue) * 100).toFixed(1)}%
              </div>
              <p className="text-xs text-gray-600">Profit Margin</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Revenue vs Expenses Line Chart */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Monthly Revenue vs Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyData}>
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
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="Expenses"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Profit Bar Chart */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Monthly Profit Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
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
                  <Bar dataKey="profit" fill="#3b82f6" name="Profit" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue Category Pie Chart */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Revenue by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value.toLocaleString()} XAF`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Expense Category Pie Chart */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Expenses by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={expenseCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expenseCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value.toLocaleString()} XAF`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Transactions Table with Tabs */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Transactions</CardTitle>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => openAddDialog('income')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="size-4 mr-1" />
                  Add Income
                </Button>
                <Button
                  size="sm"
                  onClick={() => openAddDialog('expense')}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Plus className="size-4 mr-1" />
                  Add Expense
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Transactions</TabsTrigger>
                <TabsTrigger value="income">Income Only</TabsTrigger>
                <TabsTrigger value="expense">Expenses Only</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Amount (XAF)</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="text-sm">
                          {new Date(transaction.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-sm">{transaction.description}</TableCell>
                        <TableCell className="text-sm">{transaction.category}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              transaction.type === 'income'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }
                          >
                            {transaction.type === 'income' ? 'Income' : 'Expense'}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className={`text-right text-sm ${
                            transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {transaction.type === 'income' ? '+' : '-'}
                          {transaction.amount.toLocaleString()} XAF
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="icon" className="size-8">
                              <Edit className="size-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="size-8">
                              <Trash2 className="size-3 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="income" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Amount (XAF)</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions
                      .filter((t) => t.type === 'income')
                      .map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="text-sm">
                            {new Date(transaction.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-sm">{transaction.description}</TableCell>
                          <TableCell className="text-sm">{transaction.category}</TableCell>
                          <TableCell className="text-right text-sm text-green-600">
                            +{transaction.amount.toLocaleString()} XAF
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="icon" className="size-8">
                                <Edit className="size-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="size-8">
                                <Trash2 className="size-3 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="expense" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Amount (XAF)</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions
                      .filter((t) => t.type === 'expense')
                      .map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="text-sm">
                            {new Date(transaction.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-sm">{transaction.description}</TableCell>
                          <TableCell className="text-sm">{transaction.category}</TableCell>
                          <TableCell className="text-right text-sm text-red-600">
                            -{transaction.amount.toLocaleString()} XAF
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="icon" className="size-8">
                                <Edit className="size-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="size-8">
                                <Trash2 className="size-3 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Add Transaction Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Add New {transactionType === 'income' ? 'Income' : 'Expense'}
              </DialogTitle>
              <DialogDescription>
                Enter the transaction details below
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Amount (XAF)</label>
                <Input
                  required
                  type="number"
                  placeholder="0"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm text-gray-700 mb-2 block">Category</label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {transactionType === 'income' ? (
                      <>
                        <SelectItem value="Tour Booking">Tour Booking</SelectItem>
                        <SelectItem value="Entry Fees">Entry Fees</SelectItem>
                        <SelectItem value="Accommodation">Accommodation</SelectItem>
                        <SelectItem value="Transport">Transport</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                        <SelectItem value="Staff">Staff</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-700 mb-2 block">Date</label>
                <Input
                  required
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm text-gray-700 mb-2 block">Description</label>
                <Textarea
                  required
                  placeholder="Enter transaction details"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className={transactionType === 'income' ? 'bg-green-600' : 'bg-red-600'}
                >
                  Add {transactionType === 'income' ? 'Income' : 'Expense'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}