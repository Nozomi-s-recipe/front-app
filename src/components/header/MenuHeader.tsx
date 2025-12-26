'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useAuth } from '@/providers/AuthProvider';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { AvatarIcon } from './AvatorIcon';
import { HeaderSearch } from './HeaderSearch';

export const MenuHeader = () => {
  const { user, loading } = useAuth();
  // const supabase = await createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // console.log('menu header user', user);

  return (
    <div className='sticky top-0 z-50 w-full bg-white border-b shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2'>
        {/* 左側のロゴ */}
        <div className='flex-shrink-0'>
          <Link href='/' aria-label='ホームへ戻る' prefetch={true}>
            <figure className='m-0'>
              <Image
                src='/service-logo.svg'
                alt='service logo'
                width={48}
                height={48}
                unoptimized
                className='md:w-16 md:h-16'
              />
            </figure>
          </Link>
        </div>

        {/* 中央の検索バー */}
        <Suspense
          fallback={
            <div className='flex-1 max-w-md mx-4 h-9 bg-gray-100 rounded-md animate-pulse' />
          }
        >
          <HeaderSearch />
        </Suspense>

        {/* 右側のナビゲーション */}
        <NavigationMenu className='flex-shrink-0'>
          <NavigationMenuList>
            {/* ブログセクション - 一時的にコメントアウト
            <NavigationMenuItem>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className='relative'>
                      <Link
                        href='#'
                        className={`${navigationMenuTriggerStyle()} opacity-70 cursor-not-allowed`}
                        onClick={(e) => e.preventDefault()}
                      >
                        ブログ
                      </Link>
                      <Badge className='absolute -top-2 -right-2 text-xs bg-gray-300'>
                        <Lock className='h-4 w-4' />
                      </Badge>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent></TooltipContent>
                    <p>もうすぐ公開予定です！</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </NavigationMenuItem>
            */}
            <NavigationMenuItem>
              {loading ? (
                <div className='h-8 w-8 rounded-full bg-gray-200 animate-pulse' />
              ) : (
                <AvatarIcon user={user} />
              )}
            </NavigationMenuItem>{' '}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};
