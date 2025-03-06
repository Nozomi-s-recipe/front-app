import { isNewRecipe } from '@/utils/recipe/isNewRecipe';
import { Clock, UtensilsCrossed } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { RecipePreviewProps } from './RecipePreview';

export const CarouselRecipePreview = ({
  image,
  recipeName,
  recipeId,
  cookingTime,
  ingredientsCount,
  mainCategory,
  subCategory,
  isPopular,
  createdAt,
}: RecipePreviewProps) => {
  const isNew = isNewRecipe(new Date(createdAt));

  return (
    <Link
      href={`/${mainCategory.id}/${subCategory.id}/${recipeId}`}
      className='block h-full'
      prefetch={true}
    >
      <div className='group relative h-full overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md'>
        <div className='relative aspect-[3/2] w-full'>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className='object-cover transition-transform duration-300 group-hover:scale-105'
            sizes='(min-width: 1024px) 33vw, 50vw'
          />
          <div className='absolute left-2 top-2 flex gap-2'>
            {isPopular && <Badge className='bg-primary'>人気</Badge>}
            {isNew && <Badge className='bg-green-600'>新着</Badge>}
          </div>
        </div>
        <div className='p-3'>
          <div className='flex gap-1 text-xs text-muted-foreground'>
            <Badge variant='outline' className='text-xs'>
              {mainCategory.name}
            </Badge>
            <Badge variant='outline' className='text-xs'>
              {subCategory.name}
            </Badge>
          </div>
          <h3 className='mt-2 line-clamp-2 text-sm font-medium'>
            {recipeName}
          </h3>
          <div className='mt-2 flex items-center gap-4 text-xs text-muted-foreground'>
            <div className='flex items-center gap-1'>
              <Clock className='h-3 w-3' />
              <span>{cookingTime}分</span>
            </div>
            <div className='flex items-center gap-1'>
              <UtensilsCrossed className='h-3 w-3' />
              <span>{ingredientsCount}品</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
