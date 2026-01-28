'use client';

import { useState, ReactNode } from 'react';
import {
  TabNavigation,
  type TabId,
} from '@/components/navigation/TabNavigation';

interface HomeContentProps {
  allRecipes: ReactNode;
  recommendedRecipes: ReactNode;
  categoryRecipes: ReactNode;
}

export const HomeContent = ({
  allRecipes,
  recommendedRecipes,
  categoryRecipes,
}: HomeContentProps) => {
  const [activeTab, setActiveTab] = useState<TabId>('all');

  const renderContent = () => {
    switch (activeTab) {
      case 'recommended':
        return recommendedRecipes;
      case 'categories':
        return categoryRecipes;
      case 'favorites':
        return (
          <div className='w-full max-w-7xl mx-auto px-4 md:px-6 text-center py-12'>
            <p className='text-text-secondary'>
              お気に入り機能は近日公開予定です
            </p>
          </div>
        );
      case 'all':
      default:
        return allRecipes;
    }
  };

  return (
    <>
      {/* Tab Navigation */}
      <div className='w-full max-w-7xl mx-auto'>
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Main recipe list */}
      <div className='flex flex-col items-center pt-6 md:pt-8'>
        {renderContent()}
      </div>
    </>
  );
};
