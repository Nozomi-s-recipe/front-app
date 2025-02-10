import { Menu, RecipeImage } from '@/types/types';
import { RECIPE_BLUR } from '@/utils/const';
import Image from 'next/image';
import Link from 'next/link';

export type ShowMoreColor = 'secondary-B' | 'secondary-A';

export type ShowMoreProps = {
  image: RecipeImage;
  mainCategory: Menu;
  color: ShowMoreColor;
};

export const ShowMore = ({ image, mainCategory, color }: ShowMoreProps) => {
  return (
    <Link href={`/${mainCategory.id}`} className='block w-28' prefetch={true}>
      <figure className='relative h-20'>
        <Image
          src={`${image.src}?w=112&h=80&q=60&fit=crop&fm=webp`}
          alt={image.alt}
          style={{
            objectFit: 'cover',
          }}
          fill
          quality={60}
          placeholder='blur'
          blurDataURL={RECIPE_BLUR}
          sizes='112px'
        />
        <figcaption
          className={`absolute inset-0 flex items-center justify-center text-lg font-extrabold opacity-90  text-base-white ${
            color === 'secondary-A' ? 'bg-secondary-A' : 'bg-secondary-B'
          }`}
        >
          もっとみる
        </figcaption>
      </figure>
    </Link>
  );
};
