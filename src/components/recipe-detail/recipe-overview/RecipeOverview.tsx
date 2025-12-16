import { RecipeImage } from '@/types/types';
import { RecipeMetaInfo } from './RecipeMetaInfo';
import Image from 'next/image';

type RecipeOverviewProps = {
  image: RecipeImage;
  recipeMetaInfo: RecipeMetaInfo;
  recipeId: string;
};

export const RecipeOverview = ({
  image,
  recipeMetaInfo,
  recipeId,
}: RecipeOverviewProps) => {
  return (
    <section className='relative flex flex-col items-center -mb-24'>
      <figure className='relative w-full max-w-[490px] aspect-[490/640]'>
        <Image
          src={`${image.src}?w=490&h=640&q=80&fit=crop&fm=webp`}
          alt={recipeMetaInfo.recipeName}
          fill
          priority
          sizes='(max-width: 768px) 100vw, 490px'
          className='object-cover'
        />
      </figure>
      {/* <div className='absolute flex justify-end w-full right-2 top-2'>
        <div className='p-1 rounded-lg backdrop-blur-sm bg-white/30'>
          <ShareButton />
        </div>
      </div> */}

      <div className='-translate-y-24 shadow-md'>
        <RecipeMetaInfo {...recipeMetaInfo} recipeId={recipeId} />
      </div>
    </section>
  );
};
