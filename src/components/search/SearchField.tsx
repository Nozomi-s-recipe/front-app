'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useRef, useState } from 'react';

function SearchFieldContent() {
  const router = useRouter();
  const [composing, setComposition] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get('q') ?? '';

  const startComposition = () => setComposition(true);
  const endComposition = () => setComposition(false);

  const handleSearch = useCallback(() => {
    const query = inputRef.current?.value ?? '';
    const queryString = query ? `?q=${encodeURIComponent(query)}` : '';
    router.push(`/search${queryString}`);
  }, [router]);

  const _onEnter: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.code === 'Enter' && !composing) {
        handleSearch();
      }
    },
    [composing, handleSearch],
  );

  return (
    <div className='relative w-full max-w-[600px] mx-auto'>
      <Input
        type='search'
        className={`w-full pl-6 pr-14 py-6 text-base rounded-2xl border-2 transition-all duration-300 bg-white text-text-primary ${
          isFocused
            ? 'border-coral shadow-md ring-4 ring-coral/15'
            : 'border-border-color shadow-sm'
        }`}
        name='q'
        ref={inputRef}
        placeholder='探しているレシピを入力...'
        onKeyDown={_onEnter}
        onCompositionStart={startComposition}
        onCompositionEnd={endComposition}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        defaultValue={defaultQuery}
      />
      <Search className='absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none text-text-muted' />
    </div>
  );
}

export default function SearchField() {
  return (
    <Suspense
      fallback={<Input type='search' className={'w-full md:w-80 lg:w-96'} />}
    >
      <SearchFieldContent />
    </Suspense>
  );
}
