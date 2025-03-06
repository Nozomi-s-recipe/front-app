'use client';

import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useRef, useState } from 'react';

function SearchFieldContent() {
  const router = useRouter();
  const [composing, setComposition] = useState(false);
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
    [composing, handleSearch]
  );

  return (
    <Input
      type='search'
      className={'w-full sm:w-64 md:w-80 lg:w-96'}
      name='q'
      ref={inputRef}
      placeholder='レシピを検索...'
      onKeyDown={_onEnter}
      onCompositionStart={startComposition}
      onCompositionEnd={endComposition}
      defaultValue={defaultQuery}
    />
  );
}

export default function SearchField() {
  return (
    <Suspense
      fallback={
        <Input type='search' className={'w-full sm:w-64 md:w-80 lg:w-96'} />
      }
    >
      <SearchFieldContent />
    </Suspense>
  );
}
