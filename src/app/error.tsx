'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // エラーをログに記録することができます
    console.error(error);
  }, [error]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-50 px-6 py-12'>
      <div className='text-center max-w-md mx-auto'>
        <div className='mb-8'>
          <img
            src='https://images.microcms-assets.io/assets/888d632d12c2409a941139ea8e9d5adc/40e7f1dba3084634bcbe7a79a822fe81/not-found.jpg?w=240&h=240&q=75&fm=webp'
            alt='エラー'
            className='mx-auto rounded-full w-60 h-60 object-cover border-4 border-slate-200 shadow-md'
            onError={(e) => {
              // 画像が見つからない場合のフォールバック
              e.currentTarget.src =
                'https://placehold.jp/ff6b6b/ffffff/240x240.png?text=Error';
            }}
          />
        </div>

        <h1 className='text-3xl font-bold text-slate-800 mb-4'>
          エラーが発生しました
        </h1>

        <p className='text-slate-600 mb-8 text-lg'>
          申し訳ありませんが、問題が発生しました。もう一度お試しください。
        </p>

        <Button
          onClick={reset}
          className='px-8 py-6 text-lg bg-slate-800 hover:bg-slate-700 rounded-full'
        >
          再試行する
        </Button>
      </div>
    </div>
  );
}
