'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Menu, RecipeImage } from '@/types/types';
import { RECIPE_BLUR } from '@/utils/const';
import { isNewRecipe } from '@/utils/recipe/isNewRecipe';
import { Clock, UtensilsCrossed, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useFavorites } from '@/hooks/useFavorites';
import { NewBadge, PopularBadge } from './RecipeBadges';

// Type definitions
type RecipeStatus = {
  isNew: boolean;
  isPopular: boolean;
};

type RecipeStats = {
  cookingTime: number;
  ingredientsCount: number;
  likes?: number;
};

export interface RecipePreviewProps {
  image: RecipeImage;
  recipeName: string;
  recipeId: string;
  cookingTime: number;
  ingredientsCount: number;
  mainCategory: Menu;
  subCategory: Menu;
  isPriority?: boolean;
  createdAt: string;
  isPopular?: boolean;
  likes?: number;
  description?: string;
}

// Category badge component
const CategoryBadge = ({ category }: { category: string }) => (
  <div className='absolute top-4 left-4 z-10 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm bg-white/95 text-text-primary'>
    {category}
  </div>
);

// Favorite button component
const FavoriteButton = ({
  recipeId,
  onClick,
}: {
  recipeId: string;
  onClick: (e: React.MouseEvent) => void;
}) => {
  const { isFavorite } = useFavorites();
  const favorited = isFavorite(recipeId);

  return (
    <button
      onClick={onClick}
      className='absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-110 bg-white/95 shadow-sm'
      aria-label={favorited ? 'お気に入りから削除' : 'お気に入りに追加'}
    >
      <Heart
        className={`w-5 h-5 transition-all stroke-coral stroke-2 ${favorited ? 'fill-coral' : 'fill-none'}`}
      />
    </button>
  );
};

// Recipe statistics component
const RecipeStatsComponent = ({
  cookingTime,
  ingredientsCount,
  likes,
}: RecipeStats) => (
  <div className='flex items-center gap-5 pt-4 border-t border-border-color'>
    {likes !== undefined && (
      <div className='flex items-center gap-2 text-sm text-text-secondary'>
        <Heart className='w-4 h-4 text-text-muted' />
        <span>{likes}</span>
      </div>
    )}
    <div className='flex items-center gap-2 text-sm text-text-secondary'>
      <Clock className='w-4 h-4 text-text-muted' />
      <span>{cookingTime}分</span>
    </div>
    <div className='flex items-center gap-2 text-sm text-text-secondary'>
      <UtensilsCrossed className='w-4 h-4 text-text-muted' />
      <span>{ingredientsCount}個</span>
    </div>
  </div>
);

export const RecipePreview = ({
  image,
  recipeId,
  recipeName,
  cookingTime,
  ingredientsCount,
  mainCategory,
  subCategory,
  isPriority = false,
  createdAt,
  isPopular = false,
  likes,
  description,
}: RecipePreviewProps) => {
  const isNew = isNewRecipe(new Date(createdAt));
  const { toggleFavorite } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipeId);
  };

  const categoryName = subCategory?.name || mainCategory?.name || '和食';

  return (
    <Link
      href={`/${mainCategory.id}/${subCategory.id}/${recipeId}`}
      className='block group cursor-pointer'
      prefetch={true}
    >
      <article className='rounded-[20px] overflow-hidden transition-all duration-[400ms] hover:-translate-y-2 w-full bg-white shadow-sm hover:shadow-lg ease-[cubic-bezier(0.4,0,0.2,1)]'>
        {/* Image container with 75% aspect ratio */}
        <div className='relative w-full overflow-hidden rounded-t-[20px] pt-[75%]'>
          {/* Background gradient placeholder */}
          <div className='absolute inset-0 bg-gradient-to-br from-[#f5f5f5] to-[#e8e6e1]' />

          {/* Recipe image */}
          <Image
            src={`${image.src}?w=400&h=300&q=80&fit=crop&fm=webp`}
            fill
            alt={image.alt}
            priority={isPriority}
            placeholder='blur'
            blurDataURL={RECIPE_BLUR}
            className='object-cover transition-transform duration-[600ms] group-hover:scale-108 ease-[cubic-bezier(0.4,0,0.2,1)]'
            fetchPriority={isPriority ? 'high' : 'auto'}
            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw'
          />

          {/* Category badge */}
          <CategoryBadge category={categoryName} />

          {/* Favorite button */}
          <FavoriteButton recipeId={recipeId} onClick={handleFavoriteClick} />
        </div>

        {/* Content */}
        <div className='p-6 flex flex-col min-h-[160px]'>
          <h3 className='font-crimson text-[1.35rem] font-semibold mb-2 leading-tight line-clamp-2 text-text-primary tracking-[-0.02em]'>
            {recipeName}
          </h3>

          {description && (
            <p className='text-sm mb-4 line-clamp-2 text-text-secondary'>
              {description}
            </p>
          )}

          {/* Metadata */}
          <div className='mt-auto'>
            <RecipeStatsComponent
              cookingTime={cookingTime}
              ingredientsCount={ingredientsCount}
              likes={likes}
            />
          </div>
        </div>
      </article>
    </Link>
  );
};
