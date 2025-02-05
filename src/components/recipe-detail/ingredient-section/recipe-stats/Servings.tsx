'use client';
import Image from 'next/image';
import { useServings } from './servings.context';

export const Servings = () => {
  const { servings, incrementServings, decrementServings } = useServings();

  return (
    <div className='flex flex-col items-center space-y-2'>
      <label id='servings-label' className='font-mincho'>
        人数
      </label>
      <div
        className='flex items-center space-x-4'
        role='group'
        aria-labelledby='servings-label'
      >
        <button onClick={decrementServings} aria-label='人数を減らす'>
          <Image
            src={'/minus.svg'}
            alt='' // ボタンに aria-label があるので、装飾的な画像として扱う
            width={32}
            height={32}
            unoptimized
          />
        </button>
        <output
          className='text-xl font-medium font-mincho min-w-[2ch] text-center'
          aria-labelledby='servings-label'
        >
          {servings}
        </output>
        <button onClick={incrementServings} aria-label='人数を増やす'>
          <Image
            src={'/plus.svg'}
            alt='' // ボタンに aria-label があるので、装飾的な画像として扱う
            width={32}
            height={32}
            unoptimized
          />
        </button>
      </div>
    </div>
  );
};
