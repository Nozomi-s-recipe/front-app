'use client';
import { Button } from '@/components/ui/button';
import { useFavoriteRecipe } from '@/hooks/useFavoriteRecipe';
import { Heart, Loader2 } from 'lucide-react';

type FavoriteButtonProps = {
  recipeId: string;
};

export const FavoriteButton = ({ recipeId }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite, isLoading } = useFavoriteRecipe(recipeId);

  return (
    <div className='flex flex-col items-center gap-1'>
      <p className='text-xs text-gray-500 pb-2'>\ レシピを保存 /</p>
      <Button
        variant='ghost'
        size='icon'
        onClick={toggleFavorite}
        disabled={isLoading}
        className={`hover:bg-transparent p-0 h-auto [&_svg]:!w-8 [&_svg]:!h-8 ${
          isFavorite ? 'text-red-500' : 'text-gray-500'
        }`}
      >
        {isLoading ? (
          <Loader2 className='animate-spin' />
        ) : (
          <Heart className={isFavorite ? 'fill-current' : ''} />
        )}
      </Button>
    </div>
  );
};
