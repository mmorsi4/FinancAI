import { Plus } from 'lucide-react';
import React from 'react';
import NewsCard from '../components/NewsCard';

const newsItems = [
  {
    id: 1,
    title: 'Scientists Discover New Species in Amazon Rainforest',
    description:
      'Researchers have identified a previously unknown species of frog in the depths of the Amazon rainforest, highlighting the incredible biodiversity of the region and the importance of conservation efforts.',
    imageUrl:
      'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    category: 'Science',
    date: 'May 15, 2025',
  },
  {
    id: 2,
    title: 'Global Tech Conference Announces Revolutionary AI Developments',
    description:
      'The annual Global Tech Summit revealed groundbreaking advancements in artificial intelligence that promise to transform industries from healthcare to transportation in the coming years.',
    imageUrl:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Technology',
    date: 'May 12, 2025',
  },
  {
    id: 3,
    title: 'Historic Climate Agreement Reached at International Summit',
    description:
      'World leaders have signed a landmark climate accord that sets ambitious targets for carbon reduction and provides substantial funding for renewable energy initiatives in developing nations.',
    imageUrl:
      'https://images.unsplash.com/photo-1470723710355-95304d8aece4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Politics',
    date: 'May 10, 2025',
  },
  {
    id: 4,
    title: 'New Study Reveals Benefits of Mediterranean Diet for Longevity',
    description:
      'A comprehensive 20-year study has confirmed that adherence to a traditional Mediterranean diet significantly reduces the risk of heart disease and may extend lifespan by up to seven years.',
    imageUrl:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Health',
    date: 'May 8, 2025',
  },
  {
    id: 5,
    title: 'Major Sports League Announces Expansion to International Markets',
    description:
      "In a historic move, one of the world's premier sports leagues has announced plans to establish new teams across Europe and Asia, marking a significant step in the globalization of the sport.",
    imageUrl:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Sports',
    date: 'May 5, 2025',
  },
  {
    id: 6,
    title: 'Renowned Artist Unveils Controversial Exhibition at National Gallery',
    description:
      'The art world is abuzz with discussion following the opening of a provocative new exhibition that challenges conventional perspectives on history and cultural identity.',
    imageUrl:
      'https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Arts',
    date: 'May 3, 2025',
  },
];

const Home: React.FC = () => {
  return (
    <div className='relative bg-indigo-800 text-white'>
      <div className='absolute inset-0'>
        <img
          src='https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80'
          alt='Finance background'
          className='w-full h-full object-cover opacity-30'
        />
      </div>
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24'>
        <div className='max-w-3xl'>
          <h1 className='text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6'>
            Smart Financial Management
          </h1>
          <p className='text-xl text-indigo-100 max-w-xl'>
            Take control of your finances with AI-powered insights. Track expenses, manage assets,
            and make informed decisions to achieve your financial goals.
          </p>
          <div className='mt-10'>
            <button className='bg-white text-indigo-600 font-medium py-3 px-6 rounded-md shadow hover:bg-indigo-50 transition-colors flex items-center'>
              <Plus className='h-5 w-5 mr-2' />
              Add Transaction
            </button>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {newsItems.map(item => (
          <NewsCard
            key={item.id}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            category={item.category}
            date={item.date}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

