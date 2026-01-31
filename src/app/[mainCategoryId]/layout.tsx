import { MenuHeader } from '@/components/header/MenuHeader';
import { Breadcrumbs } from '@/components/BreadCrumbs';
import { Footer } from '@/components/footer/Footer';
import { ReactNode } from 'react';

export default function CategoryLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MenuHeader showBackButton showFavoriteButton />
      <Breadcrumbs />
      {children}
      <Footer />
    </>
  );
}
