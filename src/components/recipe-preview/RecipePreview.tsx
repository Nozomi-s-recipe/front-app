import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Menu, RecipeImage } from '@/types/types';
import { RECIPE_BLUR } from '@/utils/const';
import { isNewRecipe } from '@/utils/recipe/isNewRecipe';
import { Clock, Flame, Sparkles, UtensilsCrossed } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// 型定義を分離
type RecipeStatus = {
  isNew: boolean;
  isPopular: boolean;
};

type RecipeStats = {
  cookingTime: number;
  ingredientsCount: number;
};

export interface RecipePreviewProps {
  image: RecipeImage;
  recipeName: string;
  recipeId: string;
  cookingTime: number;
  ingredientsCount: number;
  mainCategory: Menu;
  subCategory: Menu;
  isPriority?: boolean;
  createdAt: string;
  isPopular?: boolean;
}

// ステータスバッジのコンポーネント
const StatusBadge = ({ isNew, isPopular }: RecipeStatus) => {
  if (!isNew && !isPopular) return null;

  return (
    <div className='absolute left-1 top-1 z-10 flex items-center gap-1 rounded bg-white/90 px-2 py-1 text-sm font-bold shadow-md'>
      {isPopular ? (
        <>
          <Flame className='h-4 w-4 text-red-500' aria-hidden='true' />
          <span className='text-red-500'>人気</span>
        </>
      ) : (
        <>
          <Sparkles className='h-4 w-4 text-yellow-500' aria-hidden='true' />
          <span className='text-yellow-500'>NEW</span>
        </>
      )}
    </div>
  );
};

// レシピの統計情報コンポーネント
const RecipeStats = ({ cookingTime, ingredientsCount }: RecipeStats) => (
  <ul className='flex justify-between w-full'>
    <li className='flex items-center gap-1'>
      <Clock className='h-4 w-4' aria-hidden='true' />
      <span className='text-sm md:text-base'>{cookingTime}分</span>
    </li>
    <li className='flex items-center gap-1'>
      <UtensilsCrossed className='h-4 w-4' aria-hidden='true' />
      <span className='text-sm md:text-base'>{ingredientsCount}個</span>
    </li>
  </ul>
);

export const RecipePreview = ({
  image,
  recipeId,
  recipeName,
  cookingTime,
  ingredientsCount,
  mainCategory,
  subCategory,
  isPriority = false,
  createdAt,
  isPopular = false,
}: RecipePreviewProps) => {
  const isNew = isNewRecipe(new Date(createdAt));

  return (
    <Link
      href={`/${mainCategory.id}/${subCategory.id}/${recipeId}`}
      className='block transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
      prefetch={true}
    >
      <Card className='overflow-hidden'>
        <CardContent className='flex flex-col p-2 space-y-2'>
          <figure className='relative'>
            <StatusBadge isNew={isNew} isPopular={isPopular} />
            <Image
              src={`${image.src}?w=180&h=224&q=80&fit=crop&fm=webp`}
              width={160}
              height={224}
              alt={image.alt}
              priority={isPriority}
              placeholder='blur'
              blurDataURL={RECIPE_BLUR}
              className='w-full h-[180px] md:h-[200px] lg:h-[224px] rounded-sm object-cover'
              fetchPriority={isPriority ? 'high' : 'auto'}
            />
          </figure>
          <div className='flex flex-col justify-between space-y-2'>
            <h2 className='font-mono text-base line-clamp-2 md:text-lg'>
              {recipeName}
            </h2>
            <CardFooter className='p-0'>
              <RecipeStats
                cookingTime={cookingTime}
                ingredientsCount={ingredientsCount}
              />
            </CardFooter>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
