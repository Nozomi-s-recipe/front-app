import { RECIPE_BLUR } from '@/lib/const';
import { RecipeImage } from '@/types/types';
import Image from 'next/image';
import { RecipeMetaInfo } from './RecipeMetaInfo';

type RecipeOverviewProps = {
  image: RecipeImage;
  recipeMetaInfo: RecipeMetaInfo;
};

export const RecipeOverview = ({
  image,
  recipeMetaInfo,
}: RecipeOverviewProps) => {
  return (
    <header className='relative w-full pb-32'>
      <figure className='relative h-[34rem] shadow-md'>
        <Image
          src={`${image.src}?w=720&h=544&q=75&fit=crop&fm=webp`}
          alt={recipeMetaInfo.recipeName}
          fill
          priority
          quality={75}
          style={{
            objectFit: 'cover',
          }}
          sizes='100vw'
          placeholder='blur'
          blurDataURL={RECIPE_BLUR}
          decoding='sync'
          fetchPriority='high'
          loading='eager'
        />
      </figure>
      <div className='absolute bottom-0 -translate-x-1/2 shadow-md left-1/2'>
        <RecipeMetaInfo {...recipeMetaInfo} />
      </div>
    </header>
  );
};
