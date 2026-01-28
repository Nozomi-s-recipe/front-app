'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export const ProfileCard = () => {
  return (
    <Card className='w-full max-w-3xl border-2 border-border-color bg-white'>
      <CardContent className='pt-6'>
        <div className='flex flex-col sm:flex-row items-center'>
          <div className='flex items-center sm:flex-col sm:items-center mb-4 sm:mb-0'>
            <Avatar className='h-16 w-16 mr-4 sm:mr-0 sm:mb-2'>
              <AvatarImage src='/service-logo.svg' alt='栄養士のNozomi' />
              <AvatarFallback>NZ</AvatarFallback>
            </Avatar>
            <div className='flex flex-col sm:items-center'>
              <h2 className='text-xl font-bold mb-2 text-text-primary'>
                Nozomi
              </h2>
              <Button
                asChild
                size='sm'
                className='transition-colors duration-300 bg-coral-light text-white hover:bg-coral'
              >
                <Link href='/profile'>詳しく見る</Link>
              </Button>
            </div>
          </div>
          <div className='flex-1 text-center sm:text-left sm:ml-6'>
            <p className='text-text-secondary'>
              栄養士で一児の母。ベストセラー「世界一シンプルで科学的に証明された究極の食事」に基づく健康レシピをご紹介。
              <br />
              簡単・美味しく・体に優しい料理で、毎日の食事が楽しみになります！
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
