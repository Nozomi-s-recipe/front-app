'use client';
import { useMenu } from '@/components/header/menu.context';
import Image from 'next/image';

export const MenuController = ({ children }: { children: React.ReactNode }) => {
  const { isMenuOpen, setIsMenuOpen } = useMenu();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className='p-0 bg-transparent border-none cursor-pointer'
        aria-label='メニューを開く'
      >
        <Image
          src='/hamburger-menu.svg'
          alt='menu icon'
          width={48}
          height={48}
          unoptimized
        />
      </button>
      {isMenuOpen && (
        <>
          <div
            className='fixed inset-0 z-40 bg-black/70'
            onClick={() => setIsMenuOpen(false)}
          />
          {/* これってなにに必要なの？ */}
          <div className='fixed top-0 right-0 z-50 h-full bg-transparent'>
            {children}
          </div>
        </>
      )}
    </>
  );
};
