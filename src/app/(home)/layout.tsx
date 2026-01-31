import { MenuHeader } from '@/components/header/MenuHeader';
import { Footer } from '@/components/footer/Footer';
import { ReactNode } from 'react';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MenuHeader showFavoriteButton />
      <main>{children}</main>
      <Footer />
    </>
  );
}
