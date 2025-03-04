'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
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
                        onClick={(e) => e.preventDefault()}
                        legacyBehavior
                        passHref
                      >
                        <NavigationMenuLink
                          className={`${navigationMenuTriggerStyle()} opacity-70 cursor-not-allowed`}
                        >
                          ブログ
                        </NavigationMenuLink>
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
                    <Link href='#' onClick={(e) => e.preventDefault()} passHref>
                      <Button
                        variant='ghost'
                        className='opacity-70 cursor-not-allowed'
                        size='icon'
                      >
                        <UserCircle className='h-6 w-6' />
                        <Badge className='absolute -top-2 -right-2 bg-gray-300'>
                          <Lock className='h-4 w-4' />
                        </Badge>
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>ログイン機能は近日公開予定です</p>
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
