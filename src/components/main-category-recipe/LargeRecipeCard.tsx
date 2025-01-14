import { Menu, RecipeImage } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';

export type LargeRecipeCardProps = {
  image: RecipeImage;
  recipeId: string;
  recipeName: string;
  mainCategory: Menu;
  subCategory: Menu;
};

export const LargeRecipeCard = ({
  image,
  recipeName,
  recipeId,
  mainCategory,
  subCategory,
}: LargeRecipeCardProps) => {
  return (
    <Link
      href={`/${mainCategory.id}/${subCategory.id}/${recipeId}`}
      className='block w-56'
    >
      <figure className='relative h-40'>
        <Image
          src={image.src}
          alt={image.alt}
          style={{
            objectFit: 'cover',
          }}
          priority
          fill
          sizes='224px'
        />
        <figcaption className='absolute flex items-center w-full p-1 text-lg bottom-2 bg-base-white opacity-80 font-mincho'>
          <div className='truncate'>{recipeName}</div>
        </figcaption>
      </figure>
    </Link>
  );
};
