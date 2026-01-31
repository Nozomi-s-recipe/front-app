'use client';

import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getMainCategoryByMainId, getSubCategoryById } from '@/utils/const';
import { Slash } from 'lucide-react';
import { usePathname } from 'next/navigation';

type BreadcrumbsProps = {
  recipeName?: string;
};

export const Breadcrumbs = ({ recipeName }: BreadcrumbsProps) => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const getBreadcrumbItems = () => {
    const items = [{ path: '/', label: 'トップページ' }];

    if (segments[0] === 'profile') {
      items.push({ path: '/profile', label: 'プロフィール' });
      return items;
    }

    if (segments[0] === 'policy') {
      items.push({ path: '/policy', label: 'プライバシーポリシー' });
      return items;
    }

    segments.forEach((segment, index) => {
      switch (index) {
        case 0:
          const mainCategory = getMainCategoryByMainId(segment);
          if (mainCategory) {
            items.push({
              path: `/${segment}`,
              label: mainCategory.name,
            });
          }
          break;

        case 1:
          // Skip subcategory in URL structure
          // Don't add anything for the subcategory segment
          break;

        case 2:
          // This is the recipe in /[mainCategoryId]/[subCategoryId]/[recipeId]
          if (recipeName) {
            items.push({
              path: `/${segments[0]}/${segments[1]}/${segment}`,
              label: recipeName,
            });
          }
          break;
      }
    });

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': `${process.env.NEXT_PUBLIC_SITE_URL}${item.path}`,
        name: item.label,
      },
    })),
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav
        aria-label='breadcrumb'
        className='flex items-center gap-2 px-5 py-3.5 text-xs text-muted-foreground border-b border-md-outline'
      >
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <div key={item.path} className='flex items-center gap-2'>
              {isLast ? (
                <span className='text-md-on-surface font-medium'>
                  {item.label}
                </span>
              ) : (
                <>
                  <a
                    href={item.path}
                    className='text-muted-foreground hover:text-md-on-surface transition-colors'
                  >
                    {item.label}
                  </a>
                  <span className='text-[10px]'>›</span>
                </>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
};
