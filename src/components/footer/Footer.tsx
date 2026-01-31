'use client';

import { Instagram, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Footer navigation data structure
const footerNavigation = {
  recipes: {
    title: 'レシピについて',
    links: [
      { name: 'レシピポリシー', href: '/policy' },
      { name: '新着レシピ', href: '/p/1' },
      { name: '人気レシピ', href: '/p/1?sort=popular' },
      { name: 'すべてのレシピ', href: '/p/1' },
    ],
  },
  categories: {
    title: 'カテゴリー',
    links: [
      { name: '和食', href: '/japanese' },
      { name: '中華', href: '/chinese' },
      { name: '地中海食', href: '/mediterranean' },
      { name: 'すべてのカテゴリー', href: '/p/1', icon: true },
    ],
  },
  support: {
    title: 'サポート',
    links: [
      { name: 'お問い合わせ', href: '/contact' },
      { name: 'よくある質問', href: '/faq' },
    ],
  },
};

const socialLinks = [
  {
    name: 'X (Twitter)',
    href: 'https://x.com/nozomis_recipes',
    icon: '/twitter.svg',
    ariaLabel: 'X (Twitter)でフォロー',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/nozomisrecipes/',
    icon: 'instagram',
    ariaLabel: 'Instagramでフォロー',
  },
];

const legalLinks = [
  { name: 'プライバシーポリシー', href: '/privacy' },
  { name: '利用規約', href: '/terms' },
  { name: 'クッキーポリシー', href: '/cookies' },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className='w-full bg-gradient-to-b from-[#fff7dd] to-[#fef5e7] pt-16 pb-8'
      aria-labelledby='footer-heading'
    >
      <h2 id='footer-heading' className='sr-only'>
        フッター
      </h2>

      <div className='max-w-7xl mx-auto px-6 md:px-8 lg:px-12'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-12'>
          {/* Brand Section */}
          <div className='lg:col-span-4'>
            <Link
              href='/'
              prefetch={true}
              className='inline-block mb-4 transition-transform hover:scale-105'
              aria-label='ホームへ戻る'
            >
              <Image
                src='/service-logo.svg'
                alt="Nozomi's Recipes"
                width={64}
                height={64}
                unoptimized
              />
            </Link>
            <h3 className='font-crimson text-2xl font-semibold mb-2 text-text-primary'>
              Nozomi&apos;s Recipes
            </h3>
            <p className='text-sm text-text-secondary mb-4 leading-relaxed'>
              赤身肉・加工肉・バターを使わない健康レシピ
            </p>
            <p className='text-sm text-text-secondary leading-relaxed max-w-sm'>
              栄養士で一児の母。科学的に証明された健康的な食事をベースに、簡単で美味しいレシピをご紹介しています。
            </p>
          </div>

          {/* Navigation Columns */}
          <nav
            className='lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-8'
            aria-label='フッターナビゲーション'
          >
            {/* Recipes Column */}
            <div>
              <h3 className='font-crimson text-lg font-semibold mb-4 text-text-primary'>
                {footerNavigation.recipes.title}
              </h3>
              <ul className='space-y-3'>
                {footerNavigation.recipes.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      prefetch={true}
                      className='text-[15px] text-text-secondary hover:text-[#80a1ba] transition-colors duration-300 inline-block'
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories Column */}
            <div>
              <h3 className='font-crimson text-lg font-semibold mb-4 text-text-primary'>
                {footerNavigation.categories.title}
              </h3>
              <ul className='space-y-3'>
                {footerNavigation.categories.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      prefetch={true}
                      className='text-[15px] text-text-secondary hover:text-[#80a1ba] transition-all duration-300 inline-flex items-center gap-1 group'
                    >
                      {link.name}
                      {link.icon && (
                        <ArrowRight className='w-4 h-4 transition-transform group-hover:translate-x-1' />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h3 className='font-crimson text-lg font-semibold mb-4 text-text-primary'>
                {footerNavigation.support.title}
              </h3>
              <ul className='space-y-3'>
                {footerNavigation.support.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      prefetch={true}
                      className='text-[15px] text-text-secondary hover:text-[#80a1ba] transition-colors duration-300 inline-block'
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Social Links Section */}
          <div className='lg:col-span-2'>
            <h3 className='font-crimson text-lg font-semibold mb-4 text-text-primary'>
              フォローする
            </h3>
            <div className='flex gap-3'>
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={social.ariaLabel}
                  className='w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/95 shadow-sm transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-md hover:bg-[#e17055] group'
                >
                  {social.icon === 'instagram' ? (
                    <Instagram className='w-5 h-5 text-text-primary group-hover:text-white transition-colors' />
                  ) : (
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={20}
                      height={20}
                      unoptimized
                      className='transition-all group-hover:brightness-0 group-hover:invert'
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className='border-t border-[#e8e6e1] my-8' />

        {/* Bottom Bar */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-secondary'>
          {/* Copyright */}
          <p className='text-center md:text-left'>
            © {currentYear} Nozomi&apos;s Recipes. All rights reserved.
          </p>

          {/* Legal Links */}
          <nav aria-label='法的情報'>
            <ul className='flex flex-wrap justify-center gap-1'>
              {legalLinks.map((link, index) => (
                <li key={link.name} className='flex items-center'>
                  <Link
                    href={link.href}
                    prefetch={true}
                    className='hover:text-[#80a1ba] transition-colors duration-300 px-2 py-1'
                  >
                    {link.name}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className='text-text-muted'>|</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};
