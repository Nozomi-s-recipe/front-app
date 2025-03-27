import { Badge } from '@/components/ui/badge';
import { Flame, Sparkles } from 'lucide-react';

// 標準バッジコンポーネント
export const NewBadge = () => (
  <div className='flex items-center gap-0.5 sm:gap-1'>
    <Sparkles
      className='h-3 w-3 sm:h-4 sm:w-4 text-yellow-500'
      aria-hidden='true'
    />
    <span className='text-xs sm:text-sm text-yellow-500 font-medium sm:font-semibold px-0.5 py-0.5'>
      NEW
    </span>
  </div>
);

export const PopularBadge = () => (
  <div className='flex items-center gap-0.5 sm:gap-1'>
    <Flame className='h-3 w-3 sm:h-4 sm:w-4 text-red-500' aria-hidden='true' />
    <span className='text-xs sm:text-sm text-red-500 font-medium sm:font-semibold'>
      人気
    </span>
  </div>
);

// カルーセル用バッジコンポーネント
export const CarouselPopularBadge = () => (
  <Badge className='text-xs px-1.5 py-0.5 bg-primary sm:px-2 sm:py-1 sm:text-sm'>
    人気
  </Badge>
);

export const CarouselNewBadge = () => (
  <Badge className='text-xs px-2 py-0.5 bg-green-600 sm:px-3 sm:py-1 sm:text-sm'>
    新着
  </Badge>
);
