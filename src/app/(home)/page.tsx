import { SimpleSearchBar } from '@/components/home/SimpleSearchBar';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { QuickFilterSection } from '@/components/home/QuickFilterSection';
import { TodayPickCardContainer } from '@/components/home/TodayPickCard.container';
import { FilteredRecipeListSection } from '@/components/home/FilteredRecipeListSection';
import { LIMIT } from '@/utils/const';
import { getRecipes } from '@/utils/micro-cms/micro-cms';
import { Suspense } from 'react';

// Force dynamic rendering since FilteredRecipeListSection uses useSearchParams
export const dynamic = 'force-dynamic';

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60;

export default async function Home() {
  const { contents, totalCount } = await getRecipes({
    limit: LIMIT,
    orders: '-createdAt',
  });

  return (
    <div className='min-h-screen bg-white max-w-[430px] mx-auto'>
      {/* Search Bar */}
      <SimpleSearchBar />

      {/* Category Grid */}
      <CategoryGrid />

      {/* Quick Filter Section */}
      <QuickFilterSection />

      {/* Today's Pick */}
      <Suspense fallback={<div className='px-5 py-5'>Loading...</div>}>
        <TodayPickCardContainer />
      </Suspense>

      {/* Recipe List with Filtering - Wrapped in Suspense for useSearchParams */}
      <Suspense
        fallback={
          <section className='px-5 py-5'>
            <div className='text-center py-8 text-text-muted'>
              <p className='text-sm'>読み込み中...</p>
            </div>
          </section>
        }
      >
        <FilteredRecipeListSection recipes={contents} totalCount={totalCount} />
      </Suspense>
    </div>
  );
}
