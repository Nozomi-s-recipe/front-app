'use client';

import { useState, ReactNode } from 'react';
import {
  TabNavigation,
  type TabId,
} from '@/components/navigation/TabNavigation';

interface HomeContentProps {
  allRecipes: ReactNode;
  recommendedRecipes: ReactNode;
}

export const HomeContent = ({
  allRecipes,
  recommendedRecipes,
}: HomeContentProps) => {
  const [activeTab, setActiveTab] = useState<TabId>('all');

  return (
    <>
      {/* Tab Navigation */}
      <div className='w-full max-w-7xl mx-auto'>
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Main recipe list */}
      <div className='flex flex-col items-center pt-6 md:pt-8'>
        {activeTab === 'recommended' ? recommendedRecipes : allRecipes}
      </div>
    </>
  );
};
