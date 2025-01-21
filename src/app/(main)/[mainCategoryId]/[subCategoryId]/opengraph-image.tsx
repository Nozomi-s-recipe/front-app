// app/policy/opengraph-image.tsx
import { generateOgpImage } from '@/components/open-graph/OgpImageGenerator';
import { getSubCategoryById } from '@/utils/const';

export const runtime = 'edge';
export const alt = 'Policy Image';
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: { subCategoryId: string };
}) {
  const menu = getSubCategoryById(params.subCategoryId)!;

  return generateOgpImage({
    title: `${menu.name}のレシピリスト`,
  });
}
