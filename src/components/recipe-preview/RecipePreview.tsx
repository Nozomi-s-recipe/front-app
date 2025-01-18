import { RECIPE_BLUR } from '@/lib/const';
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
      className='block'
      prefetch={true}
    >
      <article className='flex p-1 space-x-1 border border-primary'>
        <figure>
          <Image
            src={image.src}
            alt={image.alt}
            width={224}
            height={160}
            sizes='224px'
            priority={isPriority}
            quality={60}
            placeholder='blur'
            blurDataURL={RECIPE_BLUR}
            className='object-cover'
            style={{
              objectFit: 'cover',
            }}
          />
        </figure>
        <div className='flex flex-col justify-between w-36'>
          <h2 className='text-xl font-semibold font-mincho line-clamp-2'>
            {recipeName}
          </h2>
          <ul>
            <li className='flex justify-between font-mincho'>
              <span className='flex'>
                <Image
                  src='/time.svg'
                  alt=''
                  width={20}
                  height={20}
                  aria-hidden='true'
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
                  alt=''
                  width={18}
                  height={18}
                  aria-hidden='true'
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
