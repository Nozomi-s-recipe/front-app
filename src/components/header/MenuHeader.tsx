'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Lock, UserCircle } from 'lucide-react';
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
                  <TooltipContent>
                    <p>もうすぐ公開予定です！</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href='/mypage'>
                      <Button
                        variant='ghost'
                        className='opacity-100'
                        size='icon'
                      >
                        <UserCircle className='h-6 w-6' />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>マイページへ</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};
