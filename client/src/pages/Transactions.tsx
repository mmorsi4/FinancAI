import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import TransactionList from '../components/TransactionList';

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/users/<int:user_id>/transactions');
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className='relative bg-indigo-800 text-white'>
      <TransactionList transactions={transactions} />
    </div>
  );
};

export default Transactions;