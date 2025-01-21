// SideMenuWrapper.tsx
'use client';
import { SIDE_MENUS } from '@/utils/const';
import { CategoryListContainer } from './CategoryList.container';

export const SideMenuContent = () => {
  return (
    <div className='h-full p-4 bg-primary'>
      {SIDE_MENUS.map((menu, i) => {
        return (
          <CategoryListContainer
            key={`CategoryList-${i}`}
            mainCategory={menu.mainCategory}
            subCategories={menu.subCategories}
          />
        );
      })}
    </div>
  );
};
