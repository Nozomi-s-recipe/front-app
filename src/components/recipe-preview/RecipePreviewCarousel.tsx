import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { CarouselRecipePreview } from './CarouselRecipePreview';
import { RecipePreviewProps } from './RecipePreview';

type Props = {
  recipePreviews: RecipePreviewProps[];
  title: string;
};

export const RecipePreviewCarousel = ({ recipePreviews, title }: Props) => {
  return (
    <div className='w-full space-y-4'>
      <h2 className='text-2xl font-bold tracking-tight'>{title}</h2>
      <div className='-mr-4 md:mx-0'>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className='w-full'
        >
          <CarouselContent>
            {recipePreviews.map((preview) => (
              <CarouselItem
                key={preview.recipeId}
                className='basis-[80%] pr-4 md:basis-1/2 lg:basis-1/3'
              >
                <CarouselRecipePreview {...preview} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='hidden md:flex' />
          <CarouselNext className='hidden md:flex' />
        </Carousel>
      </div>
    </div>
  );
};
