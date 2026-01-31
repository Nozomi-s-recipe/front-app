import { SimpleSearchBar } from '@/components/home/SimpleSearchBar';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { QuickFilterSection } from '@/components/home/QuickFilterSection';
import { TodayPickCardContainer } from '@/components/home/TodayPickCard.container';
import { RecipeListSection } from '@/components/home/RecipeListSection';
import { LIMIT } from '@/utils/const';
import { getRecipes } from '@/utils/micro-cms/micro-cms';
import { Suspense } from 'react';

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

      {/* Recipe List */}
      <RecipeListSection recipes={contents} totalCount={totalCount} />
    </div>
  );
}
