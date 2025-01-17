import { Breadcrumbs } from '@/components/BreadCrumbs';
import { RecipePreviewListContainer } from '@/components/recipe-preview/RecipePreviewList.container';
import { getSubCategoryById } from '@/lib/const';

export default async function SubCategoryPage({
  params,
}: {
  params: Promise<{ mainCategoryId: string; subCategoryId: string }>;
}) {
  const { subCategoryId } = await params;

  return (
    <>
      <div className='flex-1'>
        <RecipePreviewListContainer
          subCategory={getSubCategoryById(subCategoryId)!}
        />
      </div>
      <Breadcrumbs />
    </>
  );
}
