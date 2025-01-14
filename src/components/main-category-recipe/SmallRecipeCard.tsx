import { Menu, RecipeImage } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';

export type SmallRecipeCardProps = {
  image: RecipeImage;
  recipeId: string;
  mainCategory: Menu;
  subCategory: Menu;
};

export const SmallRecipeCard = ({
  image,
  recipeId,
  mainCategory,
  subCategory,
}: SmallRecipeCardProps) => {
  return (
    <Link
      href={`/${mainCategory.id}/${subCategory.id}/${recipeId}`}
      className='block w-28'
    >
      <figure className='relative h-20'>
        <Image
          src={image.src}
          alt={image.alt}
          style={{
            objectFit: 'cover',
          }}
          sizes='112px'
          fill
        />
      </figure>
    </Link>
  );
};
