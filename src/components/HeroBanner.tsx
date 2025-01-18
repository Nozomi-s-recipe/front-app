import Image from 'next/image';
import Link from 'next/link';

export const HeroBanner = () => {
  return (
    <section className='w-full bg-primary/5'>
      <div className='relative h-80 flex justify-center items-center overflow-hidden'>
        <Image
          src='/hero-banner.webp'
          alt='hero banner image'
          width={750}
          height={400}
          priority
          quality={75}
          placeholder='blur'
          blurDataURL='data:image/jpeg;base64,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' // 適切なbase64の画像データを設定
          sizes='100vw'
          className='object-cover'
          loading='eager'
        />

        <h1 className='absolute text-3xl font-medium tracking-tight text-center font-mincho min-w-80'>
          <div className='flex flex-col items-end'>
            {/* ロゴ部分を最適化 */}
            <div className='flex items-baseline'>
              <Image
                src={'/service-logo-black.svg'}
                alt='service logo n'
                width={43}
                height={30}
                priority
                loading='eager'
              />
              <span className='-ml-0.5'>ozomi</span>
              <span className='-ml-0.5'>‘</span>
              <span className='-ml-1'>s</span>
            </div>
            {/* 以下変更なし */}
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
