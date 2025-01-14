import { Breadcrumbs } from '@/components/BreadCrumbs';
import { Header } from '@/components/header/Header';
import { HeroBanner } from '@/components/HeroBanner';
import { MainCategoryRecipesList } from '@/components/main-category-recipe/MainCategoryRecipesList';

export default function Home() {
  return (
    <div className=''>
      <section className='relative mb-4'>
        <div className='absolute top-0 z-10 w-full'>
          <Header />
        </div>
        <HeroBanner />
      </section>
      <section className='flex justify-center'>
        <MainCategoryRecipesList />
      </section>
      <Breadcrumbs />
    </div>
  );
}
