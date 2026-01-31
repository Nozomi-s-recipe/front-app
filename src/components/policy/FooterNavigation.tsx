import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

type NavLink = {
  href: string;
  icon: string;
  label: string;
};

const navLinks: NavLink[] = [
  {
    href: '/',
    icon: '🏠',
    label: 'トップページ',
  },
  {
    href: '/faq',
    icon: '❓',
    label: 'よくある質問',
  },
];

export function FooterNavigation() {
  return (
    <nav className='mt-10 pt-6 border-t border-gray-200'>
      {navLinks.map((link, index) => (
        <Link
          key={link.href}
          href={link.href}
          className={`flex items-center justify-between py-4 text-gray-900 hover:text-[#7ab2d3] transition-colors ${
            index < navLinks.length - 1 ? 'border-b border-gray-200' : ''
          }`}
        >
          <div className='flex items-center gap-3'>
            <div className='w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-base'>
              {link.icon}
            </div>
            <span className='text-sm font-medium'>{link.label}</span>
          </div>
          <ChevronRight className='w-5 h-5 text-gray-400' strokeWidth={2} />
        </Link>
      ))}
    </nav>
  );
}
