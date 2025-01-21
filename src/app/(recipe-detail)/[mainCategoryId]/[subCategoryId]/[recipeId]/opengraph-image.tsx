// app/policy/opengraph-image.tsx
import { generateOgpImage } from '@/components/open-graph/OgpImageGenerator';
import { getRecipeById } from '@/utils/micro-cms/micro-cms';

export const runtime = 'edge';
export const alt = 'Policy Image';
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: { recipeId: string };
}) {
  const recipe = await getRecipeById(params.recipeId);

  return generateOgpImage({
    title: recipe.name,
    imageUrl: recipe.image.url,
  });
}
