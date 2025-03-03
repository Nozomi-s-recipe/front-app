import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-50 px-6 py-12'>
      <div className='text-center max-w-md mx-auto'>
        <div className='mb-8'>
          <img
            src='https://images.microcms-assets.io/assets/888d632d12c2409a941139ea8e9d5adc/40e7f1dba3084634bcbe7a79a822fe81/not-found.jpg?w=240&h=240&q=75&fm=webp'
            alt='404'
            className='mx-auto rounded-full w-60 h-60 object-cover border-4 border-slate-200 shadow-md'
          />
        </div>

        <h1 className='text-3xl font-bold text-slate-800 mb-4'>
          ページが見つかりません
        </h1>

        <p className='text-slate-600 mb-8 text-lg'>
          お探しのページは削除されたか、URLが変更された可能性があります。
        </p>

        <Button
          asChild
          className='px-8 py-6 text-lg bg-slate-800 hover:bg-slate-700 rounded-full'
        >
          <Link href='/'>ホームに戻る</Link>
        </Button>
      </div>
    </div>
  );
}
