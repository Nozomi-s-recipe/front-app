import { Breadcrumbs } from '@/components/BreadCrumbs';
import { HeroBanner } from '@/components/HeroBanner';
import { MainCategoryRecipesList } from '@/components/main-category-recipe/MainCategoryRecipesList';

export default function Home() {
  return (
    <>
      <HeroBanner />
      <section className='max-w-sm mx-auto flex flex-col items-center pt-8'>
        <MainCategoryRecipesList />
      </section>
      <div className='px-6'>
        <Breadcrumbs />
      </div>
    </>
  );
}
