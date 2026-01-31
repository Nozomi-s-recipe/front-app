import { CategoryHero } from '@/components/category/CategoryHero';
import { CategoryFilterSection } from '@/components/category/CategoryFilterSection';
import { ActiveFiltersBar } from '@/components/category/ActiveFiltersBar';
import { CategoryRecipeList } from '@/components/category/CategoryRecipeList';
import { getMainCategoryByMainId } from '@/utils/const';
import { getRecipes } from '@/utils/micro-cms/micro-cms';
import type { RecipeMetadata } from '@/lib/filters/filterTypes';

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
  const recipeMeta: RecipeMetadata[] = contents.map((recipe) => ({
    id: recipe.id,
    cookingTime: recipe.cookingTime,
    genres: recipe.subCategory,
    ingredientCount: recipe.ingredients.length + recipe.seasonings.length,
  }));

  return (
    <>
      <CategoryHero
        category={mainCategory}
        recipeCount={contents.length}
        emoji={CATEGORY_EMOJIS[mainCategory.id] || '🍽️'}
      />
      <CategoryFilterSection recipes={recipeMeta} />
      <ActiveFiltersBar recipes={recipeMeta} />
      <CategoryRecipeList recipes={contents} totalCount={contents.length} />
    </>
  );
}
