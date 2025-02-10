import {
  RecipeCard,
  RecipeCardProps,
} from '@/components/main-category-recipe/RecipeCard';
import { Menu } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';

type RecommendedRecipesProps = {
  recipes: RecipeCardProps[];
  mainCategory: Menu;
};

export const RecommendedRecipes = ({
  recipes,
  mainCategory,
}: RecommendedRecipesProps) => {
  return (
    <div className='w-full'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg '>{mainCategory.name}</h2>
        <Link
          href={`/${mainCategory.id}`}
          className='flex items-center text-sm '
          prefetch={true}
        >
          <span className='translate-x-1 -translate-y-px'>もっとみる</span>
          <Image
            className='-rotate-90'
            src='/chevron-down-black.svg'
            alt='chevron right icon'
            width={20}
            height={20}
            unoptimized
          />
        </Link>
      </div>

      {/* スクロール可能なコンテナ */}
      <div className='relative'>
        <div className='overflow-x-auto scrollbar-hide'>
          <div className='flex gap-2 w-max'>
            {recipes.map((recipe, i) => (
              <div className='flex-none' key={`RecommendedRecipeList-${i}`}>
                <RecipeCard {...recipe} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
