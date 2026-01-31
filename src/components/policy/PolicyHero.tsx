import { ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';

export function PolicyHero() {
  return (
    <section className='relative h-[280px] bg-gradient-to-br from-[#4a628a] via-[#7ab2d3] to-[#b9e5e8] rounded-b-[28px] overflow-hidden'>
      {/* Pattern overlay */}
      <div
        className='absolute inset-0 opacity-10'
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, white 1px, transparent 1px),
            radial-gradient(circle at 80% 20%, white 1px, transparent 1px),
            radial-gradient(circle at 40% 40%, white 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Navigation */}
      <nav className='absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10'>
        <Link
          href='/'
          className='w-11 h-11 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 hover:scale-105'
          aria-label='戻る'
        >
          <ArrowLeft className='w-5 h-5 text-white' strokeWidth={2} />
        </Link>
        <button
          className='w-11 h-11 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 hover:scale-105'
          aria-label='共有'
        >
          <Share2 className='w-5 h-5 text-white' strokeWidth={2} />
        </button>
      </nav>

      {/* Hero Content */}
      <div className='absolute bottom-10 left-6 right-6'>
        <div className='w-14 h-14 bg-white/20 backdrop-blur-md rounded-[20px] flex items-center justify-center text-3xl mb-4'>
          📋
        </div>
        <h1 className='text-[26px] font-bold text-white leading-tight mb-2'>
          レシピポリシー
        </h1>
        <p className='text-sm text-white/80'>
          Nozomi&apos;s Recipesが大切にしていること
        </p>
      </div>
    </section>
  );
}
