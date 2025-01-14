import { getRecipes } from '@/lib/micro-cms';
import { Menu } from '@/types/types';
import CategoryList from './CategoryList';

type CategoryListContainerProps = {
  mainCategory: Menu;
  subCategories: Menu[];
};

export const CategoryListContainer = async ({
  mainCategory,
  subCategories,
}: CategoryListContainerProps) => {
  // Promise.allを使用して全てのPromiseを解決
  const subCategoriesWithCount = await Promise.all(
    subCategories.map(async (subCategory) => {
      const res = await getRecipes({
        filters: `mainCategory[contains]${mainCategory.id}[and]subCategory[contains]${subCategory.id}`,
        fields: 'id',
      });
      return {
        name: subCategory.name,
        totalCount: res.totalCount,
        urlPath: {
          mainCategory: mainCategory.id,
          subCategory: subCategory.id,
        },
      };
    })
  );

  return (
    <CategoryList
      mainCategoryName={mainCategory.name}
      subCategories={subCategoriesWithCount}
    />
  );
};
