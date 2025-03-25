import { Breadcrumbs } from '@/components/BreadCrumbs';
import { HeroCarousel } from '@/components/header/HeroCarousel';
import Pagination from '@/components/pagenation/Pagenation';
import { AllRecipePreviewListContainer } from '@/components/recipe-preview/AllRecipePreviewList.container';
import SearchField from '@/components/search/SearchField';
import { LIMIT } from '@/utils/const';
import { getRecipes } from '@/utils/micro-cms/micro-cms';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{
    current: string;
  }>;
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage(props: Props) {
  const params = await props.params;
  const current = parseInt(params.current as string, 10);
  const q = (await props.searchParams).q;

  const { totalCount } = await getRecipes({
    limit: LIMIT,
    offset: LIMIT * (current - 1),
    q,
  });

  return (
    <>
      <div className='flex flex-col items-center'>
        <HeroCarousel />
      </div>
      <div className='flex flex-col items-center px-8'>
        <SearchField />
      </div>
      <div className='flex flex-col items-center'>
        <h2 className='w-full max-w-7xl text-2xl font-bold pb-8'>検索結果</h2>
        <Suspense fallback={<div>loading...</div>}>
          <AllRecipePreviewListContainer q={q} offset={LIMIT * (current - 1)} />
        </Suspense>
      </div>
      <Pagination
        totalCount={totalCount}
        current={current}
        basePath='/search'
        q={q}
      />
      <div className='px-6'>
        <Breadcrumbs />
      </div>
    </>
  );
}
