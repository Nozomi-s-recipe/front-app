import { Breadcrumbs } from '@/components/BreadCrumbs';
import { RecipePreviewListContainer } from '@/components/recipe-preview/RecipePreviewList.container';
import { getMainCategoryByMainId } from '@/lib/const';

export default async function MainCategoryPage({
  params,
}: // params,
{
  params: Promise<{ mainCategoryId: string }>;
}) {
  const { mainCategoryId } = await params;
  const mainCategory = getMainCategoryByMainId(mainCategoryId);

  return (
    <div>
      <RecipePreviewListContainer mainCategory={mainCategory!} />
      <Breadcrumbs />
    </div>
  );
}
