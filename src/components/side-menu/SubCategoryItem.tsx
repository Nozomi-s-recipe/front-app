'use client';
import { useMenu } from '@/components/header/menu.context';
import Link from 'next/link';

export type SubCategoryItemProps = {
  name: string;
  totalCount: number;
  urlPath: {
    mainCategory: string;
    subCategory: string;
  };
};

export const SubCategoryItem = ({
  name,
  totalCount,
  urlPath,
}: SubCategoryItemProps) => {
  const { closeMenu } = useMenu();

  return (
    <Link
      href={`/${urlPath.mainCategory}/${urlPath.subCategory}`}
      onClick={closeMenu}
    >
      <div className='flex justify-between pl-2 text-base font-extrabold font-mincho text-base-white'>
        <div>{name}</div>
        <div>
          <span className='pr-1'>{totalCount}</span>
          <span>品</span>
        </div>
      </div>
    </Link>
  );
};
