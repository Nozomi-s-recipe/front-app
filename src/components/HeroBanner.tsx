import Image from 'next/image';
import Link from 'next/link';

export const HeroBanner = () => {
  return (
    <section className='w-full bg-primary/5'>
      <div className='relative w-full h-80'>
        <Image
          src={'/hero-banner.webp'}
          alt='hero banner image'
          className='relative'
          fill
          sizes='100vw'
          quality={75}
          priority
          style={{
            objectFit: 'cover',
          }}
        />

        <h1 className='absolute pt-20 text-3xl font-medium tracking-tight -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 font-mincho min-w-80'>
          <div className='flex flex-col items-end'>
            <div className='flex items-baseline'>
              <Image
                src={'/service-logo-black.svg'}
                alt='service logo n'
                width={43}
                height={30}
                priority
              />
              <span className='-ml-0.5'>ozomi</span>
              <span className='-ml-0.5'>‘</span>
              <span className='-ml-1'>s</span>
            </div>
            <div className='mb-2 -mt-2'>Recipes</div>

            <p className='flex flex-col items-end -mr-1.5 text-xs mb-20'>
              <span>科学的根拠と、</span>
              <span>美味しさと。</span>
            </p>

            <Link href={'/policy'} className='flex text-xs'>
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
