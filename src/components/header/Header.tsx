import { MenuProvider } from '@/components/header/menu.context';
import { SIDE_MENUS } from '@/lib/const';
import Image from 'next/image';
import Link from 'next/link';
import { CategoryListContainer } from '../side-menu/CategoryList.container';
import { SideMenu } from '../side-menu/SideMenu';
import { MenuController } from './MenuController';

export const Header = () => {
  return (
    <MenuProvider>
      <header className='flex items-center justify-center bg-transparent shadow-sm'>
        <nav className='flex items-end justify-between w-full h-full max-w-sm pt-8 pb-4 px-2'>
          <Link href='/' aria-label='ホームへ戻る'>
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
          <MenuController>
            <SideMenu>
              {SIDE_MENUS.map((menu, i) => (
                <CategoryListContainer
                  key={`CategoryList-${i}`}
                  mainCategory={menu.mainCategory}
                  subCategories={menu.subCategories}
                />
              ))}
            </SideMenu>
          </MenuController>
        </nav>
      </header>
    </MenuProvider>
  );
};
