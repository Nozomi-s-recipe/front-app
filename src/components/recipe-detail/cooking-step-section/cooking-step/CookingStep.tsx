import { RECIPE_BLUR } from '@/lib/const';
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
    <article className='flex flex-col space-y-2 cooking-step'>
      <header>
        <h2 className='text-xl font-semibold font-mincho'>
          {index}.{title}
        </h2>
      </header>
      <figure className='flex flex-col space-y-2'>
        <div className='relative h-60'>
          <Image
            src={`${image.src}?w=352&h=240&q=70&fit=crop`}
            alt={image.alt}
            fill
            quality={70}
            placeholder='blur'
            blurDataURL={RECIPE_BLUR}
            style={{
              objectFit: 'cover',
            }}
            // sizes='(max-width: 768px) 100vw, 800px'
          />
        </div>
        <figcaption className='font-semibold leading-6 font-mincho'>
          {description}
        </figcaption>
      </figure>
      {point && (
        <aside className='flex flex-col space-y-1'>
          <h3 className='font-semibold font-mincho'>
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
          <p className='font-semibold font-mincho'>{point}</p>
        </aside>
      )}
    </article>
  );
};
