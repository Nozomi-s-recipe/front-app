import { RecipeImage } from '@/types/types';
import { RECIPE_BLUR } from '@/utils/const';
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
          src={`${image.src}?w=720&h=544&q=60&fit=crop&fm=webp`}
          alt={recipeMetaInfo.recipeName}
          fill
          priority
          quality={60}
          style={{
            objectFit: 'cover',
          }}
          sizes='(max-width: 480px) 480px, (max-width: 720px) 720px, (max-width: 1080px) 1080px, 1440px'
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
