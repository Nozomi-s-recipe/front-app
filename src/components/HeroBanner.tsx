import Image from 'next/image';
import Link from 'next/link';

export const HeroBanner = () => {
  return (
    <section className='w-full bg-primary/5'>
      <div className='relative h-80 flex justify-center items-center overflow-hidden'>
        {/* ヒーローバナーイメージ */}
        <div className='relative w-full max-w-[390px] h-80'>
          <Image
            src='https://images.microcms-assets.io/assets/888d632d12c2409a941139ea8e9d5adc/26a98d028d2e43c78304c72e358bd18b/hero-banner-compressed.jpg?fm=webp&q=80&w=390&h=320'
            alt='hero banner image'
            fill
            priority
            sizes='(max-width: 768px) 100vw, 390px'
            className='object-cover'
          />
        </div>

        {/* タイトル等 */}
        <h1 className='absolute text-3xl font-medium tracking-tight text-center  min-w-80'>
          <div className='flex flex-col items-end'>
            <div className='flex items-baseline'>
              <Image
                src={'/service-logo-black.svg'}
                alt='service logo n'
                width={43}
                height={30}
                priority
                loading='eager'
              />
              <span className='-ml-0.5'>ozomi‘</span>
              <span className='-ml-0.5'>s</span>
            </div>
            <div className='mb-2 -mt-2'>Recipes</div>

            <p className='flex flex-col items-end -mr-1.5 text-xs mb-20'>
              <span>科学的根拠と、</span>
              <span>美味しさと。</span>
            </p>

            <Link href={'/policy'} className='flex text-xs' prefetch={true}>
              レシピポリシー
              <Image
                className='ml-1'
                src={'/link-icon.svg'}
                alt='link icon'
                width={8}
                height={8}
                unoptimized
              />
            </Link>
          </div>
        </h1>
      </div>
    </section>
  );
};
