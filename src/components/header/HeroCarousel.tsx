import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export function HeroCarousel() {
  return (
    <Carousel className='w-full max-w-xs'>
      <CarouselContent>
        {Array.from({ length: 1 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className='p-1'>
              <Card className='border-none shadow-none'>
                <CardContent className='flex flex-col items-center justify-center p-6 aspect-square'>
                  <span className='pb-3 text-4xl font-semibold'>
                    Nozomi‘s Recipes
                  </span>
                  <span>赤身肉・加工肉・バターを使わないレシピ</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
