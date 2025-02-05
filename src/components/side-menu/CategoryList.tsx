'use client';
import Image from 'next/image';
import { useState } from 'react';
import { SubCategoryItem, SubCategoryItemProps } from './SubCategoryItem';

type CategoryListProps = {
  mainCategoryName: string;
  subCategories: SubCategoryItemProps[];
};

export const CategoryList = ({
  mainCategoryName,
  subCategories,
}: CategoryListProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className='flex flex-col space-y-2'>
      <button
        onClick={toggleExpanded}
        className='flex items-center justify-between w-full'
        aria-expanded={isExpanded}
        aria-controls='category-content'
      >
        <h2 className='text-2xl font-extrabold font-serif text-base-white'>
          {mainCategoryName}
        </h2>
        <figure className='flex items-center justify-center'>
          <Image
            src='/chevron-down.svg'
            alt={isExpanded ? 'カテゴリーを閉じる' : 'カテゴリーを開く'}
            width={32}
            height={32}
            className={`
              transition-all duration-300 ease-in-out transform
              ${isExpanded ? 'rotate-180' : 'rotate-0'}
            `}
            unoptimized
          />
        </figure>
      </button>

      <div
        id='category-content'
        role='region'
        aria-labelledby='category-header'
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <nav className='flex flex-col space-y-2'>
          {subCategories.map((subCategory, i) => (
            <SubCategoryItem {...subCategory} key={`SubCategoryItem-${i}`} />
          ))}
        </nav>
      </div>
    </section>
  );
};

export default CategoryList;
