import React from 'react';
import { Plus } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-indigo-800 text-white">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" 
          alt="Finance background" 
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
            Smart Financial Management
          </h1>
          <p className="text-xl text-indigo-100 max-w-xl">
            Take control of your finances with AI-powered insights. Track expenses, manage assets, and make informed decisions to achieve your financial goals.
          </p>
          <div className="mt-10">
            <button className="bg-white text-indigo-600 font-medium py-3 px-6 rounded-md shadow hover:bg-indigo-50 transition-colors flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Add Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;