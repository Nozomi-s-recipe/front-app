import { Breadcrumbs } from '@/components/BreadCrumbs';
import { RecipePreviewListContainer } from '@/components/recipe-preview/RecipePreviewList.container';
import { getMainCategoryByMainId } from '@/utils/const';
import { getRecipes } from '@/utils/micro-cms/micro-cms';

export async function generateStaticParams() {
  const res = await getRecipes();

  return res.contents.map((recipe) => ({
    mainCategoryId: recipe.mainCategory[0],
  }));
}

export default async function MainCategoryPage({
  params,
}: {
  params: Promise<{ mainCategoryId: string }>;
}) {
  const { mainCategoryId } = await params;
  const mainCategory = getMainCategoryByMainId(mainCategoryId);

  return (
    <>
      <h1 className='max-w-sm py-8 mx-auto text-2xl font-bold'>
        {mainCategory?.name}
      </h1>
      <div className='flex-1'>
        <RecipePreviewListContainer mainCategory={mainCategory!} />
      </div>
      <Breadcrumbs />
    </>
  );
}
