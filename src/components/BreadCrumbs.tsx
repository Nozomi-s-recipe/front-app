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
          const subCategory = getSubCategoryById(segment);
          if (subCategory) {
            items.push({
              path: `/${segments[0]}/${segment}`,
              label: subCategory.name,
            });
          }
          break;

        case 2:
          items.push({
            path: `/${segments[0]}/${segments[1]}/${segment}`,
            label: recipeName || '',
          });
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
    <div className='flex justify-center w-full'>
      <div className='w-full max-w-sm pt-20 pb-4'>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <nav aria-label='breadcrumb' className='flex'>
          <BreadcrumbList className='flex flex-wrap items-center gap-1 font-semibold'>
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;

              return (
                <div key={item.path} className='flex items-center'>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={item.path}
                        // className='text-primary hover:underline'
                      >
                        {item.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && (
                    <BreadcrumbSeparator>
                      <Slash />
                    </BreadcrumbSeparator>
                  )}
                </div>
              );
            })}
          </BreadcrumbList>
        </nav>
      </div>
    </div>
  );
};
