import Image from 'next/image';
import Link from 'next/link';
import { Clock, Package } from 'lucide-react';
import type { Recipe } from '@/utils/micro-cms/types';

interface TodayPickCardProps {
  recipe: Recipe;
}

export const TodayPickCard = ({ recipe }: TodayPickCardProps) => {
  const mainCategoryId = recipe.mainCategory[0];
  const subCategoryId = recipe.subCategory[0];

  return (
    <section className='px-5 py-5 border-b border-border-color'>
      <header className='mb-3.5'>
        <h2 className='text-[15px] font-semibold text-text-primary flex items-center gap-1.5'>
          <span className='text-base'>✨</span>
          今日のおすすめ
        </h2>
      </header>

      <Link
        href={`/${mainCategoryId}/${subCategoryId}/${recipe.id}`}
        className='block relative rounded-[20px] overflow-hidden'
      >
        {/* Image with overlay */}
        <div className='relative w-full aspect-[16/9]'>
          <Image
            src={`${recipe.image.url}?w=600&h=340&fit=crop&fm=webp`}
            alt={recipe.name}
            fill
            className='object-cover'
            priority
            sizes='(max-width: 430px) 100vw, 430px'
          />

          {/* Gradient overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent' />

          {/* Badge */}
          <div className='absolute top-3.5 left-3.5 flex items-center gap-1.5 px-2.5 py-1.5 bg-white/95 backdrop-blur-sm rounded-lg'>
            <span className='text-xs'>🏆</span>
            <span className='text-[11px] font-semibold text-text-primary'>
              本日のピックアップ
            </span>
          </div>

          {/* Content overlay */}
          <div className='absolute bottom-0 left-0 right-0 p-5'>
            <h3 className='text-[17px] font-semibold text-white leading-snug mb-2'>
              {recipe.name}
            </h3>

            <div className='flex items-center gap-3.5'>
              <div className='flex items-center gap-1.5 text-xs text-white/90'>
                <Clock className='w-3.5 h-3.5 stroke-[1.5]' />
                <span>{recipe.cookingTime}分</span>
              </div>
              <div className='flex items-center gap-1.5 text-xs text-white/90'>
                <Package className='w-3.5 h-3.5 stroke-[1.5]' />
                <span>
                  {recipe.ingredients.length + recipe.seasonings.length}個
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};
