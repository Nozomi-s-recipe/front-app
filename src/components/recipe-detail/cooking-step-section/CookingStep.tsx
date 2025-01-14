import { RecipeImage } from '@/types/types';
import Image from 'next/image';

export type CookingStepProps = {
  index: number;
  title: string;
  image: RecipeImage;
  description: string;
  point?: string;
};

export const CookingStep = ({
  index,
  title,
  image,
  description,
  point,
}: CookingStepProps) => {
  return (
    <article className='cooking-step w-80 flex flex-col space-y-2'>
      <header>
        <h2 className='text-xl font-mincho font-semibold'>
          {index}.{title}
        </h2>
      </header>
      <figure className='w-80 flex flex-col space-y-2'>
        <div className='h-60 relative'>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <figcaption className='font-mincho font-semibold leading-6'>
          {description}
        </figcaption>
      </figure>
      {point && (
        <aside className='flex flex-col space-y-1'>
          <h3 className='font-mincho font-semibold'>
            <span className='flex border-b-2 border-secondary-A w-fit'>
              <Image
                src='/lightbulb.svg'
                alt='light bulb icon'
                width={24}
                height={24}
                unoptimized
              />
              <span>ポイント</span>
            </span>
          </h3>
          <p className='font-mincho font-semibold'>{point}</p>
        </aside>
      )}
    </article>
  );
};
