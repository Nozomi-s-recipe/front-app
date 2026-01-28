import { Badge } from '@/components/ui/badge';
import { Flame, Sparkles } from 'lucide-react';

// 標準バッジコンポーネント
export const NewBadge = () => (
  <div className='flex items-center gap-0.5 sm:gap-1'>
    <Sparkles
      className='h-3 w-3 sm:h-4 sm:w-4 text-coral-tertiary'
      aria-hidden='true'
    />
    <span className='text-xs sm:text-sm font-medium sm:font-semibold px-0.5 py-0.5 text-coral-tertiary'>
      NEW
    </span>
  </div>
);

export const PopularBadge = () => (
  <div className='flex items-center gap-0.5 sm:gap-1'>
    <Flame className='h-3 w-3 sm:h-4 sm:w-4 text-coral' aria-hidden='true' />
    <span className='text-xs sm:text-sm font-medium sm:font-semibold text-coral'>
      人気
    </span>
  </div>
);

// カルーセル用バッジコンポーネント
export const CarouselPopularBadge = () => (
  <Badge className='text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 sm:text-sm bg-coral text-white'>
    人気
  </Badge>
);

export const CarouselNewBadge = () => (
  <Badge className='text-xs px-2 py-0.5 sm:px-3 sm:py-1 sm:text-sm bg-coral-tertiary text-white'>
    新着
  </Badge>
);
