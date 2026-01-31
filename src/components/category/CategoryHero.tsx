import { Menu } from '@/types/types';

interface CategoryHeroProps {
  category: Menu;
  recipeCount: number;
  emoji?: string;
}

export function CategoryHero({
  category,
  recipeCount,
  emoji = '🍽️',
}: CategoryHeroProps) {
  return (
    <section className='px-5 py-6 border-b border-md-outline'>
      <h1 className='flex items-center gap-3 mb-1.5'>
        <span className='text-[32px] leading-none'>{emoji}</span>
        <span className='font-crimson text-[28px] font-semibold text-md-on-surface'>
          {category.name}
        </span>
      </h1>
      <p className='text-[13px] text-muted-foreground ml-11'>
        {category.name} · {recipeCount} レシピ
      </p>
    </section>
  );
}
