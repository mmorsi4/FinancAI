import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';

interface Transaction {
  id: number;
  title: string;
  description: string;
  amount: number;
  type: string;
  category: string;
  date: string;
}

interface Asset {
  name: string;
  value: number;
  color: string;
}

interface MonthlyData {
  name: string;
  income: number;
  expenses: number;
}

interface DashboardProps {
  transactions: Transaction[];
  assets: Asset[];
  monthlyData: MonthlyData[];
}

const Dashboard: React.FC<DashboardProps> = ({ transactions, assets, monthlyData }) => {
  // Get recent transactions (last 5)
  const recentTransactions = [...transactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }).slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Income vs Expenses Chart */}
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Income vs Expenses</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={monthlyData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="income" stackId="1" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.6} />
              <Area type="monotone" dataKey="expenses" stackId="2" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Asset Allocation */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Asset Allocation</h3>
        <div className="h-80 flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie
                data={assets}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {assets.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 w-full mt-2">
            {assets.map((asset, index) => (
              <div key={index} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: asset.color }}></div>
                <span className="text-xs text-gray-600">{asset.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spending by Category */}
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Spending by Category</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { name: 'Housing', amount: 1200 },
                { name: 'Food', amount: 450 },
                { name: 'Transport', amount: 300 },
                { name: 'Utilities', amount: 210 },
                { name: 'Entertainment', amount: 180 },
                { name: 'Healthcare', amount: 120 },
              ]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value}`} />
              <Bar dataKey="amount" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h3>
        <div className="overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {recentTransactions.map((transaction) => (
              <li key={transaction.id} className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{transaction.title}</p>
                    <p className="text-xs text-gray-500 truncate">{transaction.date}</p>
                  </div>
                  <div className={`inline-flex text-sm font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-center">
            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all transactions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;