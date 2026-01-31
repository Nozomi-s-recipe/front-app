'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export const ProfileCard = () => {
  return (
    <Card className='w-full max-w-3xl bg-white border border-border-color shadow-sm'>
      <CardContent className='p-6 sm:p-8'>
        <article
          className='flex flex-col sm:flex-row gap-6'
          aria-label='栄養士プロフィール'
        >
          {/* Avatar and Name Section */}
          <div className='flex flex-col items-center sm:items-start gap-4 sm:min-w-[140px]'>
            <Link
              href='/profile'
              className='group relative'
              aria-label='Nozomiのプロフィールを見る'
            >
              <Avatar className='h-16 w-16 sm:h-20 sm:w-20 ring-2 ring-coral ring-offset-2 transition-all duration-300 group-hover:ring-4 group-hover:scale-105'>
                <AvatarImage
                  src='/service-logo.svg'
                  alt='栄養士のNozomi'
                  className='object-contain'
                />
                <AvatarFallback className='text-lg font-semibold bg-coral-tertiary text-text-primary'>
                  NZ
                </AvatarFallback>
              </Avatar>
            </Link>

            <div className='flex flex-col items-center sm:items-start gap-3'>
              <h2 className='text-2xl font-crimson font-semibold tracking-tight text-text-primary'>
                Nozomi
              </h2>
              <Button
                asChild
                size='sm'
                className='bg-coral text-white hover:bg-coral/90 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md font-medium'
              >
                <Link href='/profile'>詳しく見る →</Link>
              </Button>
            </div>
          </div>

          {/* Description Section */}
          <div className='flex-1 flex flex-col justify-center'>
            <p className='text-base leading-relaxed text-center sm:text-left text-text-secondary'>
              栄養士で一児の母。ベストセラー「世界一シンプルで科学的に証明された究極の食事」に基づく健康レシピをご紹介。
            </p>
            <p className='text-base leading-relaxed mt-2 text-center sm:text-left text-text-secondary'>
              簡単・美味しく・体に優しい料理で、毎日の食事が楽しみになります！
            </p>
          </div>
        </article>
      </CardContent>
    </Card>
  );
};
