// app/policy/opengraph-image.tsx
import { generateOgpImage } from '@/components/open-graph/OgpImageGenerator';
import { getMainCategoryByMainId } from '@/lib/const';

export const runtime = 'edge';
export const alt = 'Policy Image';
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: { mainCategoryId: string };
}) {
  const menu = getMainCategoryByMainId(params.mainCategoryId)!;

  return generateOgpImage({
    title: `${menu.name}のレシピリスト`,
  });
}
