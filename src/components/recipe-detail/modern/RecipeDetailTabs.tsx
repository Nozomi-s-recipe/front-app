'use client';

import { useState } from 'react';

type Tab = 'ingredients' | 'preparations' | 'nutrition' | 'reviews';

type RecipeDetailTabsProps = {
  ingredientsContent: React.ReactNode;
  preparationsContent: React.ReactNode;
  nutritionContent?: React.ReactNode;
  reviewsContent?: React.ReactNode;
};

export const RecipeDetailTabs = ({
  ingredientsContent,
  preparationsContent,
  nutritionContent,
  reviewsContent,
}: RecipeDetailTabsProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('ingredients');

  const tabs = [
    { id: 'ingredients' as Tab, label: '材料' },
    { id: 'preparations' as Tab, label: '作り方' },
    ...(nutritionContent ? [{ id: 'nutrition' as Tab, label: '栄養素' }] : []),
    ...(reviewsContent ? [{ id: 'reviews' as Tab, label: 'レビュー' }] : []),
  ];

  return (
    <div>
      {/* Tab Navigation */}
      <nav className='flex gap-8 mb-6'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative bg-none border-none py-2 px-0 text-[15px] font-medium cursor-pointer transition-all duration-200 ${
              activeTab === tab.id
                ? 'text-[#1a2e28] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1a2e28] after:rounded-sm'
                : 'text-[#8a9e98] hover:text-[#5a6e68]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <div className='animate-fadeIn'>
        {activeTab === 'ingredients' && (
          <div className='block'>{ingredientsContent}</div>
        )}
        {activeTab === 'preparations' && (
          <div className='block'>{preparationsContent}</div>
        )}
        {activeTab === 'nutrition' && nutritionContent && (
          <div className='block'>{nutritionContent}</div>
        )}
        {activeTab === 'reviews' && reviewsContent && (
          <div className='block'>{reviewsContent}</div>
        )}
      </div>
    </div>
  );
};
