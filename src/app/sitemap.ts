import { getRecipes } from '@/utils/micro-cms/micro-cms';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // レシピデータを取得
  const recipes = await getRecipes({
    limit: 100,
  });

  // レシピ詳細ページのURLを生成
  const recipeUrls = recipes.contents.map((recipe) => ({
    url: `https://n-recipes.com/${recipe.mainCategory[0]}/${recipe.subCategory[0]}/${recipe.id}`,
    lastModified: new Date(recipe.updatedAt || recipe.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.95,
  }));

  // 基本ページとレシピページを結合
  return [
    {
      url: 'https://n-recipes.com/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...recipeUrls,
    {
      url: 'https://n-recipes.com/policy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://n-recipes.com/profile',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
