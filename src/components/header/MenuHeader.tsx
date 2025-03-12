'use client';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const MenuHeader = () => {
  return (
    <div className='w-full bg-white border-b'>
      <div className='max-w-4xl mx-auto p-4 flex items-center justify-between'>
        {/* 左側のロゴ */}
        <div>
          <Link href='/' aria-label='ホームへ戻る' prefetch={true}>
            <figure className='m-0'>
              <Image
                src='/service-logo.svg'
                alt='service logo'
                width={64}
                height={64}
                unoptimized
              />
            </figure>
          </Link>
        </div>

        {/* 右側のナビゲーション */}
        <NavigationMenu>
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
              <Link href='/mypage'>
                <Button variant='ghost' className='opacity-100' size='icon'>
                  <UserCircle className='h-8 w-8 !size-8' />
                </Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};
