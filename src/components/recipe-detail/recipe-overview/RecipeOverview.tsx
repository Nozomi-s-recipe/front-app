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
    <section className='relative flex flex-col items-center -mb-24'>
      <figure className='flex items-center justify-center'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${image.src}?w=490&h=640&q=80&fit=crop&fm=webp`}
          alt={recipeMetaInfo.recipeName}
          width={490}
          height={640}
          fetchPriority='high'
        />
      </figure>
      {/* <div className='absolute flex justify-end w-full right-2 top-2'>
        <div className='p-1 rounded-lg backdrop-blur-sm bg-white/30'>
          <ShareButton />
        </div>
      </div> */}

      <div className='-translate-y-24 shadow-md'>
        <RecipeMetaInfo {...recipeMetaInfo} />
      </div>
    </section>
  );
};
