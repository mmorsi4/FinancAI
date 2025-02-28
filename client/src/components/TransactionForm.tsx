import { X } from 'lucide-react';
import React, { useState } from 'react';

interface Transaction {
  id: number;
  title: string;
  description: string;
  amount: number;
  type: string;
  category: string;
  date: string;
}

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void;
  onCancel: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const categories = {
    income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
    expense: [
      'Housing',
      'Food',
      'Transportation',
      'Entertainment',
      'Utilities',
      'Healthcare',
      'Education',
      'Shopping',
      'Other',
    ],
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!title || !amount || !category || !date) {
  //     alert('Please fill in all required fields');
  //     return;
  //   }

  //   const newTransaction: Transaction = {
  //     id: Date.now(),
  //     title,
  //     description,
  //     amount: parseFloat(amount),
  //     type,
  //     category,
  //     date: new Date(date).toLocaleDateString('en-US', {
  //       year: 'numeric',
  //       month: 'long',
  //       day: 'numeric',
  //     }),
  //   };

  //   onAddTransaction(newTransaction);
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!title || !amount || !category || !date) {
      alert('Please fill in all required fields');
      return;
    }
  
    const newTransaction = {
      title,
      description,
      amount: parseFloat(amount),
      type,
      category,
      date,
    };
  
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add transaction');
      }
  
      const data = await response.json();
      onAddTransaction(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding transaction');
    }
  };
  
  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-lg font-medium text-gray-900'>Add New Transaction</h3>
        <button onClick={onCancel} className='text-gray-400 hover:text-gray-500'>
          <X className='h-5 w-5' />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='col-span-2'>
            <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
              Title *
            </label>
            <input
              type='text'
              id='title'
              value={title}
              onChange={e => setTitle(e.target.value)}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>

          <div className='col-span-2'>
            <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
              Description
            </label>
            <textarea
              id='description'
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={2}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
          </div>

          <div>
            <label htmlFor='amount' className='block text-sm font-medium text-gray-700'>
              Amount *
            </label>
            <div className='mt-1 relative rounded-md shadow-sm'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <span className='text-gray-500 sm:text-sm'>$</span>
              </div>
              <input
                type='number'
                id='amount'
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className='block w-full pl-7 pr-12 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                placeholder='0.00'
                step='0.01'
                min='0'
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor='date' className='block text-sm font-medium text-gray-700'>
              Date *
            </label>
            <input
              type='date'
              id='date'
              value={date}
              onChange={e => setDate(e.target.value)}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Type *</label>
            <div className='mt-1 flex space-x-4'>
              <div className='flex items-center'>
                <input
                  id='type-expense'
                  name='type'
                  type='radio'
                  checked={type === 'expense'}
                  onChange={() => setType('expense')}
                  className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300'
                />
                <label htmlFor='type-expense' className='ml-2 block text-sm text-gray-700'>
                  Expense
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  id='type-income'
                  name='type'
                  type='radio'
                  checked={type === 'income'}
                  onChange={() => setType('income')}
                  className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300'
                />
                <label htmlFor='type-income' className='ml-2 block text-sm text-gray-700'>
                  Income
                </label>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor='category' className='block text-sm font-medium text-gray-700'>
              Category *
            </label>
            <select
              id='category'
              value={category}
              onChange={e => setCategory(e.target.value)}
              className='mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required>
              <option value=''>Select a category</option>
              {type === 'income'
                ? categories.income.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))
                : categories.expense.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
            </select>
          </div>
        </div>

        <div className='mt-6 flex justify-end space-x-3'>
          <button
            type='button'
            onClick={onCancel}
            className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            Cancel
          </button>
          <button
            type='submit'
            className='bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;

