import { Breadcrumbs } from '@/components/BreadCrumbs';
import { HeroCarousel } from '@/components/header/HeroCarousel';
import Pagination from '@/components/pagenation/Pagenation';
import { AllRecipePreviewListContainer } from '@/components/recipe-preview/AllRecipePreviewList.container';
import { NewRecipePreviewCarouselContainer } from '@/components/recipe-preview/NewRecipePreviewCarousel.container';
import { PopularRecipePreviewCarouselContainer } from '@/components/recipe-preview/PopularRecipePreviewCarousel.container';
import SearchField from '@/components/search/SearchField';
import { LIMIT } from '@/utils/const';
import { getRecipes } from '@/utils/micro-cms/micro-cms';
import { Suspense } from 'react';

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60;

export default async function Home() {
  const { totalCount } = await getRecipes({
    limit: LIMIT,
  });

  return (
    <>
      {/* <Header /> */}
      <div className='flex flex-col items-center'>
        <HeroCarousel />
      </div>
      <div className='flex flex-col items-center px-8 pb-8'>
        <NewRecipePreviewCarouselContainer />
      </div>
      <div className='flex flex-col items-center px-8 pb-16'>
        <PopularRecipePreviewCarouselContainer />
      </div>

      <div className='flex flex-col items-center'>
        <h2 className='w-full max-w-7xl text-2xl font-bold pb-8'>レシピ一覧</h2>
        <div className='flex flex-col items-center px-8 pb-8'>
          <SearchField />
        </div>

        <Suspense fallback={<div>loading...</div>}>
          <AllRecipePreviewListContainer />
        </Suspense>
      </div>
      {/* </section> */}
      <Pagination totalCount={totalCount} />
      <div className='px-6'>
        <Breadcrumbs />
      </div>
    </>
  );
}
