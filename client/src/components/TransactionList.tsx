import { ArrowDownRight, ArrowUpRight, Filter, Plus } from 'lucide-react';
import React, { useState } from 'react';
import TransactionForm from './TransactionForm';

interface Transaction {
  id: number;
  title: string;
  description: string;
  amount: number;
  type: string;
  category: string;
  date: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions: initialTransactions }) => {
  const [showForm, setShowForm] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [filter, setFilter] = useState('all');

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
    setShowForm(false);
  };

  const filteredTransactions =
    filter === 'all' ? transactions : transactions.filter(t => t.type === filter);

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h3 className='text-xl font-bold text-gray-900'>Recent Transactions</h3>
        <div className='flex space-x-2'>
          <div className='relative'>
            <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden'>
              <div className='py-1'>
                <button className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left'>
                  All
                </button>
                <button className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left'>
                  Income
                </button>
                <button className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left'>
                  Expense
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className='flex items-center text-sm text-white bg-indigo-600 rounded-md px-3 py-2 hover:bg-indigo-700'>
            <Plus className='h-4 w-4 mr-2' />
            Add Transaction
          </button>
        </div>
      </div>

      <div className='mb-4 flex space-x-2'>
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 text-sm rounded-md ${
            filter === 'all' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
          }`}>
          All
        </button>
        <button
          onClick={() => setFilter('income')}
          className={`px-3 py-1 text-sm rounded-md ${
            filter === 'income' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'
          }`}>
          Income
        </button>
        <button
          onClick={() => setFilter('expense')}
          className={`px-3 py-1 text-sm rounded-md ${
            filter === 'expense' ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:bg-gray-100'
          }`}>
          Expenses
        </button>
      </div>

      {showForm && (
        <div className='mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50'>
          <TransactionForm
            onAddTransaction={handleAddTransaction}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Transaction
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Category
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Date
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Amount
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredTransactions.map(transaction => (
              <tr key={transaction.id} className='hover:bg-gray-50'>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div
                      className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                        transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                      {transaction.type === 'income' ? (
                        <ArrowUpRight className={`h-4 w-4 text-green-600`} />
                      ) : (
                        <ArrowDownRight className={`h-4 w-4 text-red-600`} />
                      )}
                    </div>
                    <div className='ml-4'>
                      <div className='text-sm font-medium text-gray-900'>{transaction.title}</div>
                      <div className='text-sm text-gray-500'>{transaction.description}</div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800'>
                    {transaction.category}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {transaction.date}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredTransactions.length === 0 && (
        <div className='text-center py-8'>
          <p className='text-gray-500'>No transactions found.</p>
        </div>
      )}
    </div>
  );
};

export default TransactionList;

