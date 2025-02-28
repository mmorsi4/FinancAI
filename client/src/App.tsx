import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import ChatBot from './components/ChatBot';
import { BarChart3, Wallet, LineChart, PieChart, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Sample transaction data
const transactions = [
  {
    id: 1,
    title: "Salary Deposit",
    description: "Monthly salary payment from TechCorp Inc.",
    amount: 5000.00,
    type: "income",
    category: "Salary",
    date: "May 15, 2025"
  },
  {
    id: 2,
    title: "Rent Payment",
    description: "Monthly rent for apartment",
    amount: 1200.00,
    type: "expense",
    category: "Housing",
    date: "May 12, 2025"
  },
  {
    id: 3,
    title: "Grocery Shopping",
    description: "Weekly grocery shopping at Whole Foods",
    amount: 150.75,
    type: "expense",
    category: "Food",
    date: "May 10, 2025"
  },
  {
    id: 4,
    title: "Freelance Project",
    description: "Website development for client",
    amount: 850.00,
    type: "income",
    category: "Freelance",
    date: "May 8, 2025"
  },
  {
    id: 5,
    title: "Utility Bills",
    description: "Electricity and water bills",
    amount: 210.50,
    type: "expense",
    category: "Utilities",
    date: "May 5, 2025"
  },
  {
    id: 6,
    title: "Stock Dividend",
    description: "Quarterly dividend payment from AAPL shares",
    amount: 320.25,
    type: "income",
    category: "Investment",
    date: "May 3, 2025"
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

function App() {
  const [showChat, setShowChat] = useState(false);

  // Calculate total income and expenses
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const netBalance = totalIncome - totalExpenses;
  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Financial Dashboard</h2>
          <div className="h-1 w-20 bg-indigo-600 mb-8"></div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Balance</p>
                  <p className="text-2xl font-bold text-gray-800">${netBalance.toFixed(2)}</p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm ${netBalance >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                  {netBalance >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                  {Math.abs(((netBalance) / (totalIncome || 1)) * 100).toFixed(1)}%
                </span>
                <span className="text-sm text-gray-500 ml-2">from last month</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Income</p>
                  <p className="text-2xl font-bold text-gray-800">${totalIncome.toFixed(2)}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-sm text-green-500 flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  8.2%
                </span>
                <span className="text-sm text-gray-500 ml-2">from last month</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Expenses</p>
                  <p className="text-2xl font-bold text-gray-800">${totalExpenses.toFixed(2)}</p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <Wallet className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-sm text-red-500 flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  4.3%
                </span>
                <span className="text-sm text-gray-500 ml-2">from last month</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Assets</p>
                  <p className="text-2xl font-bold text-gray-800">${totalAssets.toLocaleString()}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <PieChart className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-sm text-green-500 flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  12.5%
                </span>
                <span className="text-sm text-gray-500 ml-2">from last quarter</span>
              </div>
            </div>
          </div>
          
          {/* Dashboard Components */}
          <Dashboard 
            transactions={transactions} 
            assets={assets} 
            monthlyData={monthlyData}
          />
        </div>
      </div>
      
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setShowChat(!showChat)}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        >
          {showChat ? 'Close Chat' : 'Chat with AI'}
        </button>
      </div>
      
      {/* Chat Window */}
      {showChat && (
        <div className="fixed bottom-24 right-6 w-96 h-96 bg-white rounded-lg shadow-xl z-50 overflow-hidden">
          <ChatBot />
        </div>
      )}
      
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <BarChart3 className="h-8 w-8 text-indigo-400" />
                <span className="ml-2 text-xl font-bold">FinancAI</span>
              </div>
              <p className="text-gray-400">
                Your intelligent financial assistant, helping you make smarter decisions with your money.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Transactions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Assets</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Reports</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 FinancAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;