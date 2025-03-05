import { Breadcrumbs } from '@/components/BreadCrumbs';
import { HeroCarousel } from '@/components/header/HeroCarousel';
import { AllRecipePreviewListContainer } from '@/components/recipe-preview/AllRecipePreviewList.container';
import SearchField from '@/components/search/SearchField';
import { Suspense } from 'react';

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60;

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <div className='flex flex-col items-center'>
        <HeroCarousel />
      </div>
      <div className='flex flex-col items-center px-8'>
        <SearchField />
      </div>

      <h1 className='max-w-sm pt-8 mx-auto text-2xl font-bold'>レシピ一覧</h1>
      <section className='flex flex-col items-center max-w-sm pt-7 mx-auto'>
        <Suspense fallback={<div>loading...</div>}>
          <AllRecipePreviewListContainer />
        </Suspense>
      </section>
      <div className='px-6'>
        <Breadcrumbs />
      </div>
    </>
  );
}
