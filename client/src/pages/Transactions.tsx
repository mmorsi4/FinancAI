import { Plus } from 'lucide-react';
import React from 'react';
import TransactionList from '../components/TransactionList';

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

const Transactions: React.FC = () => {
  return (
    <div className='relative bg-indigo-800 text-white'>
      <TransactionList transactions={transactions} />
    </div>
  );
};

export default Transactions;

