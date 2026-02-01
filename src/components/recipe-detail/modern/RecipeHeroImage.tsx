'use client';

import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

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

      <nav className='absolute top-0 left-0 right-0 p-4 flex justify-start items-center z-10'>
        <button
          onClick={() => router.back()}
          className='w-11 h-11 bg-white/85 backdrop-blur-md border-none rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 shadow-sm hover:bg-white hover:scale-105'
          aria-label='戻る'
        >
          <ChevronLeft className='w-5 h-5 stroke-[#1a2e28]' strokeWidth={2} />
        </button>
      </nav>
    </section>
  );
};
