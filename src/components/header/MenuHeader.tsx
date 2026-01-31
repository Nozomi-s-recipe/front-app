'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useAuth } from '@/providers/AuthProvider';
import { useScrolled } from '@/hooks/useScrolled';
import { useFavorites } from '@/hooks/useFavorites';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AvatarIcon } from './AvatorIcon';
import { ChevronLeft, Heart } from 'lucide-react';

interface MenuHeaderProps {
  showBackButton?: boolean;
  showFavoriteButton?: boolean;
}

export const MenuHeader = ({
  showBackButton = false,
  showFavoriteButton = false,
}: MenuHeaderProps = {}) => {
  const { user, loading } = useAuth();
  const isScrolled = useScrolled(50);
  const pathname = usePathname();
  const isHomepage = pathname === '/';
  const router = useRouter();
  const { favorites } = useFavorites();
  // const supabase = await createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // console.log('menu header user', user);

  // Handle logo click for smooth scroll on homepage
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHomepage) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-border-color transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isScrolled ? 'py-2 shadow-sm' : 'py-4 shadow-none'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 flex items-center justify-between gap-4'>
        {/* Left: Back button (optional) + Logo with gradient N icon + site name */}
        <div className='flex items-center gap-3 flex-shrink-0'>
          {showBackButton && (
            <button
              onClick={() => router.back()}
              className='w-10 h-10 bg-md-surface-variant rounded-xl flex items-center justify-center hover:bg-md-outline transition-colors flex-shrink-0'
              aria-label='戻る'
            >
              <ChevronLeft className='w-5 h-5 stroke-md-on-surface-variant stroke-2' />
            </button>
          )}
          <Link
            href='/'
            aria-label='ホームへ戻る'
            prefetch={true}
            onClick={handleLogoClick}
            className='flex items-center gap-3 transition-opacity hover:opacity-80'
          >
            {/* Logo SVG */}
            <Image
              src='/service-logo.svg'
              alt='Nozomi&#39;s Recipes Logo'
              width={36}
              height={36}
              className='w-9 h-9'
            />
            {/* Site Name */}
            <span className='font-semibold text-lg tracking-tight text-text-primary'>
              Nozomi&apos;s Recipes
            </span>
          </Link>

          {/* Tagline - hidden on mobile */}
          <div className='hidden md:block text-xs font-normal tracking-wider ml-4 text-text-muted'>
            赤身肉・加工肉・バターを使わないレシピ
          </div>
        </div>

        {/* Right: Navigation */}
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
            {showFavoriteButton && (
              <NavigationMenuItem>
                <Link
                  href='/mypage'
                  className='relative w-10 h-10 bg-md-surface-variant rounded-xl flex items-center justify-center hover:bg-md-outline transition-colors'
                  aria-label='お気に入り'
                >
                  <Heart className='w-5 h-5 stroke-md-on-surface-variant stroke-2 fill-none' />
                  {favorites.length > 0 && (
                    <span className='absolute top-1 right-1 min-w-4 h-4 px-1 bg-destructive rounded-lg text-[10px] font-semibold text-destructive-foreground flex items-center justify-center'>
                      {favorites.length}
                    </span>
                  )}
                </Link>
              </NavigationMenuItem>
            )}
            <NavigationMenuItem>
              {loading ? (
                <div className='h-8 w-8 rounded-full bg-gray-200 animate-pulse' />
              ) : (
                <AvatarIcon user={user} />
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};
