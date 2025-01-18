import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className='flex justify-center w-full pt-12 pb-8 bg-base-white'>
      <div className='flex justify-between w-full h-64 max-w-xs'>
        <section className='flex flex-col justify-between'>
          <Link href='/' prefetch={true}>
            <Image
              src='/service-logo.svg'
              alt='service logo'
              width={64}
              height={64}
              unoptimized
            />
          </Link>
          <nav className='flex space-x-1'>
            {/* TODO: youtubeとxへのリンクを作成する */}
            <Image
              src='/youtube.svg'
              alt='youtube logo'
              width={36}
              height={36}
              unoptimized
            />
            <Image
              src='/twitter.svg'
              alt='x logo'
              width={24}
              height={24}
              unoptimized
            />
          </nav>
        </section>
        <section className='flex flex-col items-end justify-end font-medium text-right font-mincho'>
          <nav>
            <Link className='block' href='/policy' prefetch={true}>
              レシピポリシー
            </Link>
            <Link className='block' href='/profile' prefetch={true}>
              運営者プロフィール
            </Link>
          </nav>
        </section>
      </div>
    </footer>
  );
};
