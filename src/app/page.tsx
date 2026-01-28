import { Breadcrumbs } from '@/components/BreadCrumbs';
import Pagination from '@/components/pagenation/Pagenation';
import { ProfileCard } from '@/components/profile/ProfileCard';
import SearchField from '@/components/search/SearchField';
import { HomeContent } from '@/components/home/HomeContent';
import { AllRecipePreviewListContainer } from '@/components/recipe-preview/AllRecipePreviewList.container';
import { RandomRecipePreviewListContainer } from '@/components/recipe-preview/RandomRecipePreviewList.container';
import { CategoryTabContentContainer } from '@/components/home/CategoryTabContent.container';
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
      {/* Hero section with search */}
      <div className='w-full max-w-7xl mx-auto py-8 md:py-12'>
        <div className='flex flex-col items-center mb-6 md:mb-8'>
          <SearchField />
        </div>
      </div>

      {/* Tab navigation and recipe list */}
      <HomeContent
        allRecipes={
          <Suspense fallback={<div>loading...</div>}>
            <AllRecipePreviewListContainer />
          </Suspense>
        }
        recommendedRecipes={
          <Suspense fallback={<div>loading...</div>}>
            <RandomRecipePreviewListContainer />
          </Suspense>
        }
        categoryRecipes={
          <Suspense fallback={<div>loading...</div>}>
            <CategoryTabContentContainer />
          </Suspense>
        }
      />

      <Pagination totalCount={totalCount} />

      {/* プロフィールカード */}
      <div className='flex flex-col items-center py-8 md:py-12'>
        <ProfileCard />
      </div>

      <div>
        <Breadcrumbs />
      </div>
    </>
  );
}
