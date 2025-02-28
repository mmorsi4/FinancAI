import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white'>
      <h1 className='text-6xl font-bold'>404</h1>
      <p className='text-xl mt-2'>Page Not Found</p>
      <Link
        to='/'
        className='mt-6 flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-500 transition'>
        <ArrowLeft size={20} />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
