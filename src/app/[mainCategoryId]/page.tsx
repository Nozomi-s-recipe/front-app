import { CategoryHero } from '@/components/category/CategoryHero';
import { CategoryFilterSection } from '@/components/category/CategoryFilterSection';
import { ActiveFiltersBar } from '@/components/category/ActiveFiltersBar';
import { FilteredCategoryRecipeList } from '@/components/category/FilteredCategoryRecipeList';
import { getMainCategoryByMainId } from '@/utils/const';
import { getRecipes } from '@/utils/micro-cms/micro-cms';
import { recipesToMetadata } from '@/lib/filters/recipeAdapter';
import { Suspense } from 'react';

const CATEGORY_EMOJIS: Record<string, string> = {
  mediterranean: '🌊',
  japanese: '🍣',
  chinese: '🥟',
  sweets: '🍰',
};

export default async function MainCategoryPage({
  params,
}: {
  params: Promise<{ mainCategoryId: string }>;
}) {
  const { mainCategoryId } = await params;
  const mainCategory = getMainCategoryByMainId(mainCategoryId);

  if (!mainCategory) {
    return <div>Category not found</div>;
  }

  // Fetch recipes for this category
  const { contents } = await getRecipes({
    filters: `mainCategory[contains]${mainCategory.id}`,
  });

  // Convert recipes to RecipeMetadata format for filtering
  const recipeMeta = recipesToMetadata(contents);

  return (
    <div className='min-h-screen bg-white max-w-[430px] mx-auto'>
      <CategoryHero
        category={mainCategory}
        recipeCount={contents.length}
        emoji={CATEGORY_EMOJIS[mainCategory.id] || '🍽️'}
      />
      <CategoryFilterSection recipes={recipeMeta} />
      <ActiveFiltersBar recipes={recipeMeta} />
      <Suspense
        fallback={
          <section className='px-5 py-5'>
            <div className='text-center py-8 text-muted-foreground'>
              <p className='text-sm'>読み込み中...</p>
            </div>
          </section>
        }
      >
        <FilteredCategoryRecipeList
          recipes={contents}
          totalCount={contents.length}
        />
      </Suspense>
    </div>
  );
}
