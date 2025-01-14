'use client';

import { useMenu } from '@/components/header/menu.context';

interface SideMenuProps {
  children: React.ReactNode;
}

export const SideMenu = ({ children }: SideMenuProps) => {
  const { isMenuOpen } = useMenu();

  return (
    <>
      {/* Menu Container with higher z-index */}
      {/* <div className='fixed inset-0 z-[999] pointer-events-none'> */}
      {/* Menu Content */}
      <aside
        className={`
            absolute top-0 right-0 h-full w-80
            pointer-events-auto
            ${isMenuOpen ? 'animate-slideIn' : 'translate-x-full'}
          `}
      >
        <div className='h-full p-4 bg-primary'>{children}</div>
      </aside>
      {/* </div> */}
    </>
  );
};

export default SideMenu;
