'use client';

export type TabId = 'all' | 'recommended' | 'categories' | 'favorites';

interface Tab {
  id: TabId;
  label: string;
}

const tabs: Tab[] = [
  { id: 'all', label: 'すべてのレシピ' },
  { id: 'recommended', label: '今日のおすすめ' },
  { id: 'categories', label: 'カテゴリー' },
  { id: 'favorites', label: 'お気に入り' },
];

interface TabNavigationProps {
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
}

export const TabNavigation = ({
  activeTab,
  onTabChange,
}: TabNavigationProps) => {
  return (
    <div className='flex gap-8 border-b-2 border-border-color overflow-x-auto -webkit-overflow-scrolling-touch'>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative px-2 py-4 text-base font-outfit whitespace-nowrap transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            activeTab === tab.id
              ? 'font-semibold text-text-primary'
              : 'font-medium text-text-secondary hover:text-text-primary'
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className='absolute bottom-0 left-0 right-0 h-0.5 rounded-t bg-coral' />
          )}
        </button>
      ))}
    </div>
  );
};
