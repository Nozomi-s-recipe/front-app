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
                <CardContent className='flex flex-col items-center justify-center p-4 h-48'>
                  <span className='pb-2 text-4xl font-semibold'>
                    Nozomi&apos;s Recipes
                  </span>
                  <div className='flex items-start w-full space-x-1'>
                    <div className='flex flex-col'>
                      <span>赤身肉</span>
                      <span>加工肉</span>
                      <span>バター</span>
                    </div>
                    <span className='justify-items-end'>を使わないレシピ</span>
                  </div>
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
