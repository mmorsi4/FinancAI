import React, { useEffect, useState } from 'react';
import AssetList from '../components/AssetList';

const API_URL = 'https://your-api.com/assets';

const Assets: React.FC = () => {
  const [assets, setAssets] = useState<{ name: string; value: number; color: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch assets');
        }
        const data = await response.json();
        setAssets(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  if (loading) return <p>Loading assets...</p>;
  if (error) return <p className='text-red-500'>Error: {error}</p>;

  return <AssetList assets={assets} />;
};

export default Assets;

