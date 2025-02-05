'use client';
import { getMainCategoryByMainId, getSubCategoryById } from '@/utils/const';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type BreadcrumbsProps = {
  recipeName?: string;
};

export const Breadcrumbs = ({ recipeName }: BreadcrumbsProps) => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  // パンくずリストのアイテムを生成する関数
  const getBreadcrumbItems = () => {
    const items = [{ path: '/', label: 'トップページ' }];

    // プロフィールとポリシーページの特別なルート処理
    if (segments[0] === 'profile') {
      items.push({
        path: '/profile',
        label: 'プロフィール',
      });
      return items;
    }

    if (segments[0] === 'policy') {
      items.push({
        path: '/policy',
        label: 'プライバシーポリシー',
      });
      return items;
    }

    segments.forEach((segment, index) => {
      switch (index) {
        case 0: // mainCategory
          const mainCategory = getMainCategoryByMainId(segment);
          if (mainCategory) {
            items.push({
              path: `/${segment}`,
              label: mainCategory.name,
            });
          }
          break;

        case 1: // subCategory
          const subCategory = getSubCategoryById(segment);
          if (subCategory) {
            items.push({
              path: `/${segments[0]}/${segment}`,
              label: subCategory.name,
            });
          }
          break;

        case 2: // recipeId
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

  // JSON-LDデータの生成
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

        <nav aria-label='breadcrumb'>
          <ol className='flex flex-wrap items-center gap-1 font-semibold font-serif'>
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;

              return (
                <li
                  key={item.path}
                  className='flex items-center gap-1'
                  {...(isLast ? { 'aria-current': 'page' } : {})}
                >
                  {index > 0 && (
                    <span className='text-gray-400' aria-hidden='true'>
                      /
                    </span>
                  )}
                  {isLast ? (
                    <span className='text-gray-500'>{item.label}</span>
                  ) : (
                    <Link
                      href={item.path}
                      className='text-primary hover:underline'
                      prefetch={true}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};
