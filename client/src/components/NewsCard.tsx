import React from 'react';

interface NewsCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
  source_link: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, description, imageUrl, category, date, source_link }) => {
  return (
    <div className='bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-1'>
      <div className='relative'>
        <a href={source_link} target="_blank">
        <img src={imageUrl} alt={title} className='w-full h-48 object-cover' />
        </a>
        <div className='absolute top-0 right-0 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 m-2 rounded'>
          {category}
        </div>
      </div>
      <div className='p-5'>
        <h3 className='text-xl font-bold text-gray-800 mb-2 line-clamp-2'>{title}</h3>
        <p className='text-gray-600 mb-4 line-clamp-3'>{description}</p>
        <div className='flex justify-between items-center'>
          <span className='text-sm text-gray-500'>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;

