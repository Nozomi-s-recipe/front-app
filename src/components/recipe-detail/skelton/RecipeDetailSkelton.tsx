import { Skeleton } from '@/components/ui/skeleton';

export const RecipeDetailSkelton = () => {
  return (
    <section className='flex flex-col items-center gap-6'>
      <Skeleton className='w-96 h-96' />
      <div className='flex gap-4'>
        <Skeleton className='w-20 h-20' />
        <Skeleton className='w-20 h-20' />
        <Skeleton className='w-20 h-20' />
      </div>
      <Skeleton className='h-4 w-72' />
      <Skeleton className='h-4 w-72' />
      <Skeleton className='h-4 w-72' />
    </section>
  );
};
