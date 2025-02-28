import { Plus } from 'lucide-react';
import React from 'react';
import AssetList from '../components/AssetList';

const assets = [
  { name: 'Stocks', value: 45000, color: '#4F46E5' },
  { name: 'Real Estate', value: 120000, color: '#10B981' },
  { name: 'Crypto', value: 15000, color: '#F59E0B' },
  { name: 'Cash', value: 25000, color: '#6366F1' },
];

const Assets: React.FC = () => {
  return <AssetList assets={assets} />;
};

export default Assets;

