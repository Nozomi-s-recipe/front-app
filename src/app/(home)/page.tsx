import { Breadcrumbs } from '@/components/BreadCrumbs';
import { HeroBanner } from '@/components/HeroBanner';
import { MainCategoryRecipesList } from '@/components/main-category-recipe/MainCategoryRecipesList';

export default function Home() {
  return (
    <>
      <HeroBanner />
      <div className='mx-auto font-serif max-w-sm pt-10 pb-6 text-center flex flex-col space-y-2'>
        <p>
          このサイトでは、赤身肉、加工肉、バターを使わないレシピを発信してます
        </p>
        <p>皆さんの毎日の健康に役に立つと嬉しいです◎</p>
      </div>
      <section className='max-w-sm mx-auto flex flex-col items-center pt-8'>
        <MainCategoryRecipesList />
      </section>
      <div className='px-6'>
        <Breadcrumbs />
      </div>
    </>
  );
}
