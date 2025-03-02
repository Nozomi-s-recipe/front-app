import { MenuProvider } from '@/components/header/menu.context';
import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
  return (
    <MenuProvider>
      <header className='flex items-center justify-center bg-transparent shadow-sm'>
        <nav className='flex items-end justify-between w-full h-full max-w-sm px-2 pt-8 pb-4'>
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
          {/* <MenuController>
            <SideMenu>
              {SIDE_MENUS.map((menu, i) => (
                <CategoryListContainer
                  key={`CategoryList-${i}`}
                  mainCategory={menu.mainCategory}
                  subCategories={menu.subCategories}
                />
              ))}
            </SideMenu>
          </MenuController> */}
        </nav>
      </header>
    </MenuProvider>
  );
};
