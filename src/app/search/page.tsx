import { Breadcrumbs } from '@/components/BreadCrumbs';
import { HeroCarousel } from '@/components/header/HeroCarousel';
import { AllRecipePreviewListContainer } from '@/components/recipe-preview/AllRecipePreviewList.container';
import SearchField from '@/components/search/SearchField';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const q = (await searchParams).q;
  return (
    <>
      <div className='flex flex-col items-center'>
        <HeroCarousel />
      </div>
      <div className='flex flex-col items-center px-8'>
        <SearchField />
      </div>

      <section className='flex flex-col items-center max-w-sm pt-7 mx-auto'>
        <Suspense fallback={<div>loading...</div>}>
          <AllRecipePreviewListContainer q={q} />
        </Suspense>
      </section>
      <div className='px-6'>
        <Breadcrumbs />
      </div>
    </>
  );
}
