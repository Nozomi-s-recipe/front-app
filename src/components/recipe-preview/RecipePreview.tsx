import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Menu, RecipeImage } from '@/types/types';
import { RECIPE_BLUR } from '@/utils/const';
import { Clock, UtensilsCrossed } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export type RecipePreviewProps = {
  image: RecipeImage;
  recipeName: string;
  recipeId: string;
  cookingTime: number;
  ingredientsCount: number;
  mainCategory: Menu;
  subCategory: Menu;
  isPriority?: boolean;
};

export const RecipePreview = ({
  image,
  recipeId,
  recipeName,
  cookingTime,
  ingredientsCount,
  mainCategory,
  subCategory,
  isPriority = false,
}: RecipePreviewProps) => {
  return (
    <Link
      href={`/${mainCategory.id}/${subCategory.id}/${recipeId}`}
      className='block transition-opacity hover:opacity-80'
      prefetch={true}
    >
      <Card className='overflow-hidden'>
        <CardContent className='flex flex-col p-1 space-x-2'>
          <figure className='relative flex-shrink-0'>
            <Image
              src={`${image.src}?w=180&h=224&q=80&fit=crop&fm=webp`}
              width={160}
              height={224}
              alt={image.alt}
              priority={isPriority}
              placeholder='blur'
              blurDataURL={RECIPE_BLUR}
              className='rounded-sm'
              fetchPriority={isPriority ? 'high' : 'auto'}
            />
          </figure>
          <div className='flex flex-col justify-between w-36'>
            <h2 className='font-mono tracking-tight text-md'>{recipeName}</h2>
            <CardFooter className='p-0'>
              <ul className='flex justify-between w-full'>
                <li className='flex items-center space-x-1'>
                  <Clock className='w-4 h-4' />
                  <span className='text-sm'>{cookingTime}分</span>
                </li>
                <li className='flex items-center space-x-1'>
                  <UtensilsCrossed className='w-4 h-4' />
                  <span className='text-sm'>{ingredientsCount}個</span>
                </li>
              </ul>
            </CardFooter>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
