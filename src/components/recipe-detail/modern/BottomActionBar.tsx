'use client';

import { Share2, CheckCircle } from 'lucide-react';
import { useState } from 'react';

type BottomActionBarProps = {
  recipeId: string;
  recipeName: string;
  onStartCooking?: () => void;
};

export const BottomActionBar = ({
  recipeId,
  recipeName,
  onStartCooking,
}: BottomActionBarProps) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (isSharing) return;

    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: recipeName,
          text: `${recipeName} のレシピをチェック！`,
          url: window.location.href,
        });
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('リンクをコピーしました！');
      }
    } catch (error) {
      console.error('Share failed:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className='fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] border-t border-[#e8edeb] flex gap-3 z-[100]'>
      <button
        onClick={handleShare}
        disabled={isSharing}
        className='w-[52px] h-[52px] bg-[#f5f7f6] border-none rounded-full cursor-pointer transition-all duration-200 flex items-center justify-center hover:bg-[#e8edeb] disabled:opacity-50'
        aria-label='シェア'
      >
        <Share2 className='w-5 h-5 stroke-[#1a2e28]' strokeWidth={2} />
      </button>

      <button
        onClick={onStartCooking}
        className='flex-1 bg-[#4a628a] text-white border-none rounded-full py-4 px-6 text-[15px] font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 hover:bg-[#3d5274] hover:-translate-y-0.5 hover:shadow-md'
      >
        <CheckCircle className='w-5 h-5 fill-white stroke-none' />
        調理を開始する
      </button>
    </div>
  );
};
