'use client';

import { Instagram } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className='flex justify-center w-full pt-12 pb-8 bg-base-white'>
      <div className='flex justify-between w-full h-64 max-w-xs'>
        <section className='flex flex-col justify-between'>
          <Link href='/' prefetch={true}>
            <Image
              src='/service-logo.svg'
              alt='service logo'
              width={64}
              height={64}
              unoptimized
            />
          </Link>
          <nav className='flex space-x-4'>
            <Link
              href='https://x.com/nozomis_recipes'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Image
                src='/twitter.svg'
                alt='x logo'
                width={24}
                height={24}
                unoptimized
              />
            </Link>
            <Link
              href='https://www.instagram.com/nozomisrecipes/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Instagram className='w-6 h-6 transition-colors hover:text-pink-500' />
            </Link>
          </nav>
        </section>
        <section className='flex flex-col items-end justify-end'>
          <nav className='space-y-2'>
            <Link
              className='block font-medium text-right hover:underline'
              href='/policy'
              prefetch={true}
            >
              レシピポリシー
            </Link>
            <Link
              className='block font-medium text-right hover:underline'
              href='/profile'
              prefetch={true}
            >
              運営者プロフィール
            </Link>
          </nav>
        </section>
      </div>
    </footer>
  );
};
