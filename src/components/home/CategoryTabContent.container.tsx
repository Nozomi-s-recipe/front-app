import { SIDE_MENUS } from '@/utils/const';
import { getRecipes } from '@/utils/micro-cms/micro-cms';
import { formatRecipePreview } from '@/utils/recipe/formatRecipePreview';
import { RecipePreviewList } from '@/components/recipe-preview/RecipePreviewList';
import { SectionHeader } from '@/components/sections/SectionHeader';

export const CategoryTabContentContainer = async () => {
  // 各カテゴリーのレシピを並列で取得
  const categoryRecipes = await Promise.all(
    SIDE_MENUS.map(async (menu) => {
      const { contents } = await getRecipes({
        orders: '-createdAt',
        limit: 8,
        filters: `mainCategory[contains]${menu.mainCategory.id}`,
      });

      if (contents.length === 0) return null;

      const recipePreviewList = contents.map(formatRecipePreview);

      return {
        mainCategory: menu.mainCategory,
        recipes: recipePreviewList,
      };
    }),
  );

  // nullを除外
  const validCategories = categoryRecipes.filter(
    (category) => category !== null,
  );

  return (
    <div className='w-full max-w-7xl mx-auto space-y-16 px-4 md:px-6'>
      {validCategories.map((category) => (
        <section key={category.mainCategory.id}>
          <SectionHeader
            title={category.mainCategory.name}
            viewAllHref={`/${category.mainCategory.id}`}
          />
          <RecipePreviewList recipePreviews={category.recipes} />
        </section>
      ))}
    </div>
  );
};
