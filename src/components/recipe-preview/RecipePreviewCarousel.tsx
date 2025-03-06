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
      <h2 className='text-xl font-bold tracking-tight md:text-2xl'>{title}</h2>
      <div className='-mx-4 md:-mx-6 lg:-mx-8'>
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
                className='basis-[85%] md:basis-1/2 lg:basis-1/3 pl-4'
              >
                <CarouselRecipePreview {...preview} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='hidden md:flex left-4' />
          <CarouselNext className='hidden md:flex right-4' />
        </Carousel>
      </div>
    </div>
  );
};
