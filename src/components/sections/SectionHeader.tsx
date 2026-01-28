import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface SectionHeaderProps {
  title: string;
  viewAllHref?: string;
}

export const SectionHeader = ({ title, viewAllHref }: SectionHeaderProps) => {
  return (
    <div className='flex items-center justify-between mb-8'>
      <h2 className='font-crimson text-[2rem] font-semibold text-text-primary tracking-[-0.02em]'>
        {title}
      </h2>

      {viewAllHref && (
        <Link
          href={viewAllHref}
          className='flex items-center gap-2 text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group text-coral'
        >
          <span>すべて見る</span>
          <ChevronRight className='w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-1' />
        </Link>
      )}
    </div>
  );
};
