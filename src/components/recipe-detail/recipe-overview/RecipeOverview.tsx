import { RecipeImage } from '@/types/types';
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
      <figure className='shadow-md flex items-center justify-center bg-primary/5'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${image.src}?w=490&h=544&q=80&fit=crop&fm=webp`}
          alt={recipeMetaInfo.recipeName}
          width={490}
          height={544}
          fetchPriority='high'
        />
      </figure>
      <div className='absolute bottom-0 -translate-x-1/2 shadow-md left-1/2'>
        <RecipeMetaInfo {...recipeMetaInfo} />
      </div>
    </header>
  );
};
