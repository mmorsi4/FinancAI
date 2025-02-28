import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import AssetForm from './AssetForm';

interface Asset {
  name: string;
  value: number;
  color: string;
}

interface AssetListProps {
  assets: Asset[];
}

const AssetList: React.FC<AssetListProps> = ({ assets: initialAssets }) => {
  const [showForm, setShowForm] = useState(false);
  const [assets, setAssets] = useState<Asset[]>(initialAssets);

  const handleAddAsset = (asset: Asset) => {
    setAssets([...assets, asset]);
    setShowForm(false);
  };

  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h3 className='text-xl font-bold text-gray-900'>Your Assets</h3>
        <button
          onClick={() => setShowForm(true)}
          className='flex items-center text-sm text-white bg-indigo-600 rounded-md px-3 py-2 hover:bg-indigo-700'>
          <Plus className='h-4 w-4 mr-2' />
          Add Asset
        </button>
      </div>

      {showForm && (
        <div className='mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50'>
          <AssetForm onAddAsset={handleAddAsset} onCancel={() => setShowForm(false)} />
        </div>
      )}

      <div className='space-y-4'>
        {assets.map((asset, index) => (
          <div
            key={index}
            className='flex items-center justify-between p-3 border border-gray-200 rounded-lg'>
            <div className='flex items-center'>
              <div
                className='w-4 h-4 rounded-full mr-3'
                style={{ backgroundColor: asset.color }}></div>
              <span className='font-medium'>{asset.name}</span>
            </div>
            <div className='flex flex-col items-end'>
              <span className='font-semibold'>${asset.value.toLocaleString()}</span>
              <span className='text-xs text-gray-500'>
                {((asset.value / totalAssets) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {assets.length === 0 && (
        <div className='text-center py-8'>
          <p className='text-gray-500'>No assets found.</p>
        </div>
      )}

      <div className='mt-6 pt-4 border-t border-gray-200'>
        <div className='flex justify-between items-center'>
          <span className='font-medium text-gray-700'>Total Assets</span>
          <span className='text-xl font-bold'>${totalAssets.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default AssetList;

