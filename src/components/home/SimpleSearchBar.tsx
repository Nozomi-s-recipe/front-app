'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const SimpleSearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className='px-5 py-4'>
      <form onSubmit={handleSubmit}>
        <div className='flex items-center gap-3 bg-cream border border-border-color rounded-[14px] px-4 py-3.5 transition-all duration-200 focus-within:border-text-muted focus-within:bg-white'>
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='探しているレシピを入力...'
            className='flex-1 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-muted'
          />
          <Search className='w-[18px] h-[18px] text-text-muted stroke-2 flex-shrink-0' />
        </div>
      </form>
    </section>
  );
};
