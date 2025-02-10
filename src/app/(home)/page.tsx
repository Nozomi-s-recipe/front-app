import { Breadcrumbs } from '@/components/BreadCrumbs';
import { HeroCarousel } from '@/components/header/HeroCarousel';
import { AllRecipePreviewListContainer } from '@/components/recipe-preview/AllRecipePreviewList.container';

export default function Home() {
  return (
    <>
      <div className='flex flex-col items-center'>
        <HeroCarousel />
      </div>
      <h1 className='max-w-sm pt-8 mx-auto text-2xl font-bold'>レシピ一覧</h1>
      <section className='flex flex-col items-center max-w-sm pt-8 mx-auto'>
        <AllRecipePreviewListContainer />
      </section>
      <div className='px-6'>
        <Breadcrumbs />
      </div>
    </>
  );
}
