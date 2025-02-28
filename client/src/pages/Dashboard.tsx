import { ArrowDownRight, ArrowUpRight, DollarSign, TrendingUp, Wallet } from 'lucide-react';
import React from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Sample transaction data
const transactions = [
  {
    id: 1,
    title: 'Salary Deposit',
    description: 'Monthly salary payment from TechCorp Inc.',
    amount: 5000.0,
    type: 'income',
    category: 'Salary',
    date: 'May 15, 2025',
  },
  {
    id: 2,
    title: 'Rent Payment',
    description: 'Monthly rent for apartment',
    amount: 1200.0,
    type: 'expense',
    category: 'Housing',
    date: 'May 12, 2025',
  },
  {
    id: 3,
    title: 'Grocery Shopping',
    description: 'Weekly grocery shopping at Whole Foods',
    amount: 150.75,
    type: 'expense',
    category: 'Food',
    date: 'May 10, 2025',
  },
  {
    id: 4,
    title: 'Freelance Project',
    description: 'Website development for client',
    amount: 850.0,
    type: 'income',
    category: 'Freelance',
    date: 'May 8, 2025',
  },
  {
    id: 5,
    title: 'Utility Bills',
    description: 'Electricity and water bills',
    amount: 210.5,
    type: 'expense',
    category: 'Utilities',
    date: 'May 5, 2025',
  },
  {
    id: 6,
    title: 'Stock Dividend',
    description: 'Quarterly dividend payment from AAPL shares',
    amount: 320.25,
    type: 'income',
    category: 'Investment',
    date: 'May 3, 2025',
  },
];

// Sample asset data
const assets = [
  { name: 'Stocks', value: 45000, color: '#4F46E5' },
  { name: 'Real Estate', value: 120000, color: '#10B981' },
  { name: 'Crypto', value: 15000, color: '#F59E0B' },
  { name: 'Cash', value: 25000, color: '#6366F1' },
];

// Sample monthly income data
const monthlyData = [
  { name: 'Jan', income: 4200, expenses: 3100 },
  { name: 'Feb', income: 4500, expenses: 3300 },
  { name: 'Mar', income: 4800, expenses: 3200 },
  { name: 'Apr', income: 4700, expenses: 3400 },
  { name: 'May', income: 5200, expenses: 3500 },
  { name: 'Jun', income: 5500, expenses: 3600 },
];

// Calculate total income and expenses
const totalIncome = transactions
  .filter(t => t.type === 'income')
  .reduce((sum, t) => sum + t.amount, 0);

const totalExpenses = transactions
  .filter(t => t.type === 'expense')
  .reduce((sum, t) => sum + t.amount, 0);

const netBalance = totalIncome - totalExpenses;
const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);

const Dashboard: React.FC = () => {
  // Get recent transactions (last 5)
  const recentTransactions = [...transactions]
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 5);

  return (
    <>
      <div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <div className='mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-6'>Financial Dashboard</h2>
            <div className='h-1 w-20 bg-indigo-600 mb-8'></div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
              <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500'>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='text-sm text-gray-500 mb-1'>Total Balance</p>
                    <p className='text-2xl font-bold text-gray-800'>${netBalance.toFixed(2)}</p>
                  </div>
                  <div className='bg-indigo-100 p-3 rounded-full'>
                    <DollarSign className='h-6 w-6 text-indigo-600' />
                  </div>
                </div>
                <div className='mt-4 flex items-center'>
                  <span
                    className={`text-sm ${
                      netBalance >= 0 ? 'text-green-500' : 'text-red-500'
                    } flex items-center`}>
                    {netBalance >= 0 ? (
                      <ArrowUpRight className='h-4 w-4 mr-1' />
                    ) : (
                      <ArrowDownRight className='h-4 w-4 mr-1' />
                    )}
                    {Math.abs((netBalance / (totalIncome || 1)) * 100).toFixed(1)}%
                  </span>
                  <span className='text-sm text-gray-500 ml-2'>from last month</span>
                </div>
              </div>

              <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500'>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='text-sm text-gray-500 mb-1'>Total Income</p>
                    <p className='text-2xl font-bold text-gray-800'>${totalIncome.toFixed(2)}</p>
                  </div>
                  <div className='bg-green-100 p-3 rounded-full'>
                    <TrendingUp className='h-6 w-6 text-green-600' />
                  </div>
                </div>
                <div className='mt-4 flex items-center'>
                  <span className='text-sm text-green-500 flex items-center'>
                    <ArrowUpRight className='h-4 w-4 mr-1' />
                    8.2%
                  </span>
                  <span className='text-sm text-gray-500 ml-2'>from last month</span>
                </div>
              </div>

              <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500'>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='text-sm text-gray-500 mb-1'>Total Expenses</p>
                    <p className='text-2xl font-bold text-gray-800'>${totalExpenses.toFixed(2)}</p>
                  </div>
                  <div className='bg-red-100 p-3 rounded-full'>
                    <Wallet className='h-6 w-6 text-red-600' />
                  </div>
                </div>
                <div className='mt-4 flex items-center'>
                  <span className='text-sm text-red-500 flex items-center'>
                    <ArrowUpRight className='h-4 w-4 mr-1' />
                    4.3%
                  </span>
                  <span className='text-sm text-gray-500 ml-2'>from last month</span>
                </div>
              </div>

              <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500'>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='text-sm text-gray-500 mb-1'>Total Assets</p>
                    <p className='text-2xl font-bold text-gray-800'>
                      ${totalAssets.toLocaleString()}
                    </p>
                  </div>
                  <div className='bg-blue-100 p-3 rounded-full'>
                    <PieChart className='h-6 w-6 text-blue-600' />
                  </div>
                </div>
                <div className='mt-4 flex items-center'>
                  <span className='text-sm text-green-500 flex items-center'>
                    <ArrowUpRight className='h-4 w-4 mr-1' />
                    12.5%
                  </span>
                  <span className='text-sm text-gray-500 ml-2'>from last quarter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Income vs Expenses Chart */}
          <div className='lg:col-span-2 bg-white p-6 rounded-lg shadow-md'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>Income vs Expenses</h3>
            <div className='h-80'>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type='monotone'
                    dataKey='income'
                    stackId='1'
                    stroke='#4F46E5'
                    fill='#4F46E5'
                    fillOpacity={0.6}
                  />
                  <Area
                    type='monotone'
                    dataKey='expenses'
                    stackId='2'
                    stroke='#EF4444'
                    fill='#EF4444'
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Asset Allocation */}
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>Asset Allocation</h3>
            <div className='h-80 flex flex-col items-center justify-center'>
              <ResponsiveContainer width='100%' height='80%'>
                <PieChart>
                  <Pie
                    data={assets}
                    cx='50%'
                    cy='50%'
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey='value'
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {assets.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={value => `$${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
              <div className='grid grid-cols-2 gap-2 w-full mt-2'>
                {assets.map((asset, index) => (
                  <div key={index} className='flex items-center'>
                    <div
                      className='w-3 h-3 rounded-full mr-2'
                      style={{ backgroundColor: asset.color }}></div>
                    <span className='text-xs text-gray-600'>{asset.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Spending by Category */}
          <div className='lg:col-span-2 bg-white p-6 rounded-lg shadow-md'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>Spending by Category</h3>
            <div className='h-80'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart
                  data={[
                    { name: 'Housing', amount: 1200 },
                    { name: 'Food', amount: 450 },
                    { name: 'Transport', amount: 300 },
                    { name: 'Utilities', amount: 210 },
                    { name: 'Entertainment', amount: 180 },
                    { name: 'Healthcare', amount: 120 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip formatter={value => `$${value}`} />
                  <Bar dataKey='amount' fill='#6366F1' />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>Recent Transactions</h3>
            <div className='overflow-hidden'>
              <ul className='divide-y divide-gray-200'>
                {recentTransactions.map(transaction => (
                  <li key={transaction.id} className='py-3'>
                    <div className='flex items-center justify-between'>
                      <div className='flex-1 min-w-0'>
                        <p className='text-sm font-medium text-gray-900 truncate'>
                          {transaction.title}
                        </p>
                        <p className='text-xs text-gray-500 truncate'>{transaction.date}</p>
                      </div>
                      <div
                        className={`inline-flex text-sm font-semibold ${
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className='mt-4 text-center'>
                <a href='#' className='text-sm font-medium text-indigo-600 hover:text-indigo-500'>
                  View all transactions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

