import Link from 'next/link';

interface Category {
  id: string;
  emoji: string;
  label: string;
  href: string;
}

const categories: Category[] = [
  { id: 'japanese', emoji: '🍣', label: '和食', href: '/japanese' },
  { id: 'chinese', emoji: '🥟', label: '中華', href: '/chinese' },
  { id: 'mediterranean', emoji: '🌊', label: '地中海', href: '/mediterranean' },
  { id: 'sweets', emoji: '🍰', label: 'スイーツ', href: '/sweets' },
];

export const CategoryGrid = () => {
  return (
    <section className='px-5 py-5 pb-6 border-b border-border-color'>
      <header className='flex justify-between items-center mb-3.5'>
        <h2 className='text-[15px] font-semibold text-text-primary flex items-center gap-1.5'>
          <span className='text-base'>📂</span>
          カテゴリから探す
        </h2>
        <Link
          href='/categories'
          className='text-xs font-medium text-text-muted hover:text-text-secondary flex items-center gap-0.5 transition-colors'
        >
          すべて
          <svg
            viewBox='0 0 24 24'
            className='w-3.5 h-3.5 stroke-current stroke-2 fill-none'
          >
            <polyline
              points='9 18 15 12 9 6'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </Link>
      </header>

      <div className='grid grid-cols-4 gap-2'>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className='flex flex-col items-center gap-1.5 py-3.5 px-1.5 bg-cream border-[1.5px] border-transparent rounded-[14px] transition-all duration-200 hover:bg-white hover:border-border-color hover:-translate-y-0.5 hover:shadow-sm'
          >
            <span className='text-[26px] leading-none'>{category.emoji}</span>
            <span className='text-[11px] font-medium text-text-secondary text-center'>
              {category.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};
