import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const RecipeOverviewSkeleton = () => {
  return (
    <section className='relative flex flex-col items-center -mb-24'>
      {/* Image skeleton with fixed aspect ratio to prevent CLS */}
      <div className='relative w-full max-w-[490px] aspect-[490/640] bg-muted'>
        <Skeleton className='w-full h-full' />
      </div>

      {/* Meta info card skeleton */}
      <div className='-translate-y-24 shadow-md'>
        <Card className='shadow w-80'>
          <CardHeader>
            <Skeleton className='h-8 w-3/4' />
          </CardHeader>
          <CardContent className='space-y-4 mb-4'>
            <div className='min-h-24 space-y-2'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-2/3' />
            </div>
            <div className='flex flex-wrap gap-2'>
              <Skeleton className='h-6 w-16' />
              <Skeleton className='h-6 w-20' />
              <Skeleton className='h-6 w-16' />
            </div>
          </CardContent>
          <CardFooter className='flex justify-between items-center'>
            <Skeleton className='h-10 w-10 rounded-full' />
            <Skeleton className='h-10 w-10 rounded-full' />
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
