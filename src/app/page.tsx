import { Breadcrumbs } from '@/components/BreadCrumbs';
import { HeroCarousel } from '@/components/header/HeroCarousel';
import Pagination from '@/components/pagenation/Pagenation';
import { AllRecipePreviewListContainer } from '@/components/recipe-preview/AllRecipePreviewList.container';
import { NewRecipePreviewCarouselContainer } from '@/components/recipe-preview/NewRecipePreviewCarousel.container';
import { PopularRecipePreviewCarouselContainer } from '@/components/recipe-preview/PopularRecipePreviewCarousel.container';
import SearchField from '@/components/search/SearchField';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LIMIT } from '@/utils/const';
import { getRecipes } from '@/utils/micro-cms/micro-cms';
import Link from 'next/link';
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
      <div className='flex flex-col items-center mt-8'>
        <HeroCarousel />
      </div>

      {/* プロフィールカード */}
      <div className='flex flex-col items-center px-8 py-12'>
        <Card className='w-full max-w-3xl'>
          <CardContent className='pt-6'>
            <div className='flex flex-col sm:flex-row items-center'>
              <Avatar className='h-24 w-24 mb-4 sm:mb-0 sm:mr-6'>
                <AvatarImage
                  src='https://images.microcms-assets.io/assets/888d632d12c2409a941139ea8e9d5adc/4b554546c1f24889ad498f79e9fc9730/profile-icon.webp'
                  alt='栄養士のNozomi'
                />
                <AvatarFallback>NZ</AvatarFallback>
              </Avatar>
              <div className='flex-1 text-center sm:text-left'>
                <h2 className='text-xl font-bold mb-2'>Nozomi</h2>
                <p className='text-muted-foreground mb-3'>
                  栄養士で一児の母。ベストセラー「世界一シンプルで科学的に証明された究極の食事」に基づく健康レシピをご紹介。
                  <br />
                  簡単・美味しく・体に優しい料理で、毎日の食事が楽しみになります！
                </p>
                <Button asChild>
                  <Link href='/profile'>プロフィールを詳しく見る</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
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
