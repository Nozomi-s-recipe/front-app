import { Heart, Clock, Users } from 'lucide-react';

type RecipeHeaderProps = {
  title: string;
  subtitle?: string;
  likes?: number;
  time: string;
  servings: number;
};

export const RecipeHeader = ({
  title,
  subtitle,
  likes = 0,
  time,
  servings,
}: RecipeHeaderProps) => {
  return (
    <header className='mb-6'>
      <h1 className='text-[22px] font-crimson font-semibold text-[#1a2e28] leading-tight mb-2'>
        {title}
      </h1>
      {subtitle && (
        <p className='text-sm text-[#5a6e68] font-normal'>{subtitle}</p>
      )}

      <div className='flex items-center gap-5 mt-4'>
        <div className='flex items-center gap-1.5 text-sm text-[#5a6e68]'>
          <Heart
            className='w-[18px] h-[18px] stroke-[#8a9e98]'
            strokeWidth={1.5}
          />
          <span>{likes}</span>
        </div>
        <div className='flex items-center gap-1.5 text-sm text-[#5a6e68]'>
          <Clock
            className='w-[18px] h-[18px] stroke-[#8a9e98]'
            strokeWidth={1.5}
          />
          <span>{time}</span>
        </div>
        <div className='flex items-center gap-1.5 text-sm text-[#5a6e68]'>
          <span>{servings}人分</span>
        </div>
      </div>
    </header>
  );
};
