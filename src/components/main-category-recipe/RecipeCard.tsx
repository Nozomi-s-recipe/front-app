import { Menu, RecipeImage } from '@/types/types';
import { RECIPE_BLUR } from '@/utils/const';
import Image from 'next/image';
import Link from 'next/link';

export type RecipeCardProps = {
  image: RecipeImage;
  recipeId: string;
  recipeName: string;
  mainCategory: Menu;
  subCategory: Menu;
  width?: number;
  height?: number;
  captionSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  isPriority?: boolean;
};

export const RecipeCard = ({
  image,
  recipeName,
  recipeId,
  mainCategory,
  subCategory,
  width = 224,
  height = 160,
  captionSize = 'lg',
  isPriority = false,
}: RecipeCardProps) => {
  const captionClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  };

  return (
    <Link
      href={`/${mainCategory.id}/${subCategory.id}/${recipeId}`}
      className='block'
      style={{ width: `${width}px` }}
      prefetch={true}
    >
      <figure className='relative' style={{ height: `${height}px` }}>
        <Image
          src={`${image.src}?w=${width}&h=${height}&q=60&fit=crop?fm=webp`}
          alt={image.alt}
          style={{
            objectFit: 'cover',
          }}
          priority={isPriority}
          quality={60}
          fill
          placeholder='blur'
          blurDataURL={RECIPE_BLUR}
          sizes={`${width}px`}
          decoding={isPriority ? 'sync' : 'async'}
          fetchPriority={isPriority ? 'high' : 'auto'}
          loading={isPriority ? 'eager' : 'lazy'}
        />
        <figcaption
          className={`absolute flex items-center w-full p-1 ${captionClasses[captionSize]} bottom-2 bg-base-white opacity-80 font-mincho`}
        >
          <div className='truncate'>{recipeName}</div>
        </figcaption>
      </figure>
    </Link>
  );
};
