'use client';

import Image from 'next/image';
import { ChevronLeft, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFavorites } from '@/hooks/useFavorites';

type RecipeHeroImageProps = {
  imageUrl: string;
  recipeName: string;
  recipeId: string;
};

export const RecipeHeroImage = ({
  imageUrl,
  recipeName,
  recipeId,
}: RecipeHeroImageProps) => {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(recipeId);

  return (
    <section className='relative h-[420px] bg-gradient-to-b from-[#e8edeb] to-[#d8e0dd] rounded-b-[28px] overflow-hidden'>
      <Image
        src={`${imageUrl}?w=800&h=800&q=85&fit=crop&fm=webp`}
        alt={recipeName}
        fill
        priority
        sizes='(max-width: 430px) 100vw, 430px'
        className='object-cover'
      />

      <nav className='absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10'>
        <button
          onClick={() => router.back()}
          className='w-11 h-11 bg-white/85 backdrop-blur-md border-none rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 shadow-sm hover:bg-white hover:scale-105'
          aria-label='戻る'
        >
          <ChevronLeft className='w-5 h-5 stroke-[#1a2e28]' strokeWidth={2} />
        </button>

        <button
          onClick={() => toggleFavorite(recipeId)}
          className={`w-11 h-11 backdrop-blur-md border-none rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 shadow-sm hover:bg-white hover:scale-105 ${
            favorite ? 'bg-white/85' : 'bg-white/85'
          }`}
          aria-label={favorite ? 'お気に入りから削除' : 'お気に入りに追加'}
        >
          <Heart
            className={`w-5 h-5 transition-all duration-200 ${
              favorite
                ? 'fill-[#e74c3c] stroke-[#e74c3c]'
                : 'stroke-[#8a9e98] fill-none'
            }`}
            strokeWidth={2}
          />
        </button>
      </nav>
    </section>
  );
};
