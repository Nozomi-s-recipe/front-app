import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function ReferenceBook() {
  return (
    <section className='bg-gray-50 rounded-[20px] p-6 text-center'>
      <p className='text-xs font-medium text-gray-500 mb-3'>参考書籍</p>
      <Link
        href='https://www.amazon.co.jp/dp/4492046240'
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center gap-4 text-left p-4 bg-white rounded-xl hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group'
      >
        <div className='w-[60px] h-20 bg-gradient-to-br from-[#4a628a] to-[#7ab2d3] rounded flex items-center justify-center flex-shrink-0 shadow-sm'>
          <span className='text-2xl'>📖</span>
        </div>
        <div className='flex-1 min-w-0'>
          <div className='text-[13px] font-semibold text-gray-900 leading-snug mb-1'>
            世界一シンプルで科学的に証明された究極の食事
          </div>
          <div className='text-xs text-gray-500'>津川 友介 著</div>
        </div>
        <div className='w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gray-100 transition-colors'>
          <ChevronRight className='w-4 h-4 text-gray-500' strokeWidth={2} />
        </div>
      </Link>
    </section>
  );
}
