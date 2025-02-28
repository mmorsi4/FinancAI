import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  DollarSign,
  LineChart,
  PieChart,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatBot from './components/ChatBot';
import Navbar from './components/Navbar';
import NewsCard from './components/NewsCard';
import Assets from './pages/Assets';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Transactions from './pages/Transactions';

function App() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/assets' element={<Assets />} />
        <Route path='/transactions' element={<Transactions />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      {/* Chat Button */}
      <div className='fixed bottom-6 right-6 z-50'>
        <button
          onClick={() => setShowChat(!showChat)}
          className='bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors'>
          {showChat ? 'Close Chat' : 'Chat with AI'}
        </button>
      </div>

      {/* Chat Window */}
      {showChat && (
        <div className='fixed bottom-24 right-6 w-96 h-96 bg-white rounded-lg shadow-xl z-50 overflow-hidden'>
          <ChatBot />
        </div>
      )}

      <footer className='bg-gray-800 text-white py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div>
              <div className='flex items-center mb-4'>
                <BarChart3 className='h-8 w-8 text-indigo-400' />
                <span className='ml-2 text-xl font-bold'>FinancAI</span>
              </div>
              <p className='text-gray-400'>
                Your intelligent financial assistant, helping you make smarter decisions with your
                money.
              </p>
            </div>
            <div>
              <h4 className='text-lg font-semibold mb-4'>Features</h4>
              <ul className='space-y-2'>
                <li>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                    Transactions
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                    Assets
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                    Reports
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='text-lg font-semibold mb-4'>Company</h4>
              <ul className='space-y-2'>
                <li>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                    About Us
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                    Contact
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                    Careers
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='text-lg font-semibold mb-4'>Connect</h4>
              <ul className='space-y-2'>
                <li>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                    Twitter
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                    Facebook
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='border-t border-gray-700 mt-8 pt-8 text-center text-gray-400'>
            <p>© 2025 FinancAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

