import { Menu, RecipeImage } from '@/types/types';
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
};

export const RecipePreview = ({
  image,
  recipeId,
  recipeName,
  cookingTime,
  ingredientsCount,
  mainCategory,
  subCategory,
}: RecipePreviewProps) => {
  return (
    <Link href={`/${mainCategory.id}/${subCategory.id}/${recipeId}`}>
      <article className='flex p-1 space-x-1 border border-primary'>
        <figure className='relative w-56 h-40'>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            style={{
              objectFit: 'cover',
            }}
          />
        </figure>
        <div className='flex flex-col justify-between w-36'>
          <h2 className='text-xl font-semibold font-mincho'>{recipeName}</h2>
          <ul>
            <li className='flex justify-between font-mincho'>
              <span className='flex'>
                <Image
                  src='/time.svg'
                  alt='time icon'
                  width={20}
                  height={20}
                  unoptimized
                />
                <span className='-translate-y-px'>時間</span>
              </span>
              <span>{cookingTime}分</span>
            </li>
            <li className='flex justify-between font-mincho'>
              <span className='flex'>
                <Image
                  src='/carrot.svg'
                  alt='carrot icon'
                  width={18}
                  height={18}
                  unoptimized
                />
                <span className='-translate-y-px'>材料数</span>
              </span>
              <span>{ingredientsCount}個</span>
            </li>
          </ul>
        </div>
      </article>
    </Link>
  );
};
