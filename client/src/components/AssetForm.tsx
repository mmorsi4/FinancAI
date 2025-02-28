import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Asset {
  name: string;
  value: number;
  color: string;
}

interface AssetFormProps {
  onAddAsset: (asset: Asset) => void;
  onCancel: () => void;
}

const AssetForm: React.FC<AssetFormProps> = ({ onAddAsset, onCancel }) => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [color, setColor] = useState('#4F46E5');
  const [assetTypes, setAssetTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const colorOptions = [
    '#4F46E5',
    '#10B981',
    '#F59E0B',
    '#6366F1',
    '#EC4899',
    '#8B5CF6',
    '#EF4444',
    '#14B8A6',
  ];

  useEffect(() => {
    const fetchAssetTypes = async () => {
      try {
        const response = await fetch('/api/assets/types'); // Adjust API endpoint
        if (!response.ok) throw new Error('Failed to fetch asset types');

        const data = await response.json();
        setAssetTypes(data);
      } catch (err) {
        setError('Could not load asset types.');
      } finally {
        setLoading(false);
      }
    };

    fetchAssetTypes();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !value) {
      alert('Please fill in all required fields');
      return;
    }

    onAddAsset({ name, value: parseFloat(value), color });
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-lg font-medium text-gray-900'>Add New Asset</h3>
        <button onClick={onCancel} className='text-gray-400 hover:text-gray-500'>
          <X className='h-5 w-5' />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label htmlFor='asset-type' className='block text-sm font-medium text-gray-700'>
              Asset Type *
            </label>
            {loading ? (
              <p className='text-gray-500'>Loading asset types...</p>
            ) : error ? (
              <p className='text-red-500'>{error}</p>
            ) : (
              <select
                id='asset-type'
                value={name}
                onChange={e => setName(e.target.value)}
                className='mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                required>
                <option value=''>Select asset type</option>
                {assetTypes.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label htmlFor='value' className='block text-sm font-medium text-gray-700'>
              Value *
            </label>
            <div className='mt-1 relative rounded-md shadow-sm'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <span className='text-gray-500 sm:text-sm'>$</span>
              </div>
              <input
                type='number'
                id='value'
                value={value}
                onChange={e => setValue(e.target.value)}
                className='block w-full pl-7 pr-12 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                placeholder='0.00'
                step='0.01'
                min='0'
                required
              />
            </div>
          </div>

          <div className='col-span-2'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Color</label>
            <div className='flex flex-wrap gap-2'>
              {colorOptions.map(colorOption => (
                <button
                  key={colorOption}
                  type='button'
                  onClick={() => setColor(colorOption)}
                  className={`w-8 h-8 rounded-full ${
                    color === colorOption ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
                  }`}
                  style={{ backgroundColor: colorOption }}></button>
              ))}
            </div>
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
            Add Asset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssetForm;

