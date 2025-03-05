import { Breadcrumbs } from '@/components/BreadCrumbs';
import { HeroCarousel } from '@/components/header/HeroCarousel';
import Pagination from '@/components/pagenation/Pagenation';
import { AllRecipePreviewListContainer } from '@/components/recipe-preview/AllRecipePreviewList.container';
import SearchField from '@/components/search/SearchField';
import { LIMIT } from '@/utils/const';
import { getRecipes } from '@/utils/micro-cms/micro-cms';
import { Suspense } from 'react';

type Props = {
  params: Promise<{
    current: string;
  }>;
};

export default async function Page(props: Props) {
  const params = await props.params;
  const current = Number(params.current);

  const { totalCount } = await getRecipes({
    limit: LIMIT,
    offset: LIMIT * (current - 1),
  });
  return (
    <>
      {/* <Header /> */}
      <div className='flex flex-col items-center'>
        <HeroCarousel />
      </div>
      <div className='flex flex-col items-center px-8'>
        <SearchField />
      </div>
      <section className='flex flex-col items-center max-w-sm pt-7 mx-auto'>
        <Suspense fallback={<div>loading...</div>}>
          <AllRecipePreviewListContainer offset={LIMIT * (current - 1)} />
        </Suspense>
      </section>
      <Pagination totalCount={totalCount} current={current} />
      <div className='px-6'>
        <Breadcrumbs />
      </div>
    </>
  );
}
