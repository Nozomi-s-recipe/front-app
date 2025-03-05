import { LIMIT } from '@/utils/const';
import Link from 'next/link';

type Props = {
  totalCount: number;
  current?: number;
  basePath?: string;
  q?: string;
};

export default function Pagination({
  totalCount,
  current = 1,
  basePath = '',
  q,
}: Props) {
  const pages = Array.from({ length: Math.ceil(totalCount / LIMIT) }).map(
    (_, i) => i + 1
  );
  return (
    <ul className='flex items-center justify-center py-6 mt-6'>
      {pages.map((p) => (
        <li className='mx-1' key={p}>
          {current !== p ? (
            <Link
              href={`${basePath}/p/${p}` + (q ? `?q=${q}` : '')}
              className='flex items-center justify-center transition-colors rounded w-9 h-9 hover:bg-gray-100'
            >
              {p}
            </Link>
          ) : (
            <span className='flex items-center justify-center text-white bg-blue-500 rounded w-9 h-9'>
              {p}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
