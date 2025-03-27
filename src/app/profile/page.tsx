import { Breadcrumbs } from '@/components/BreadCrumbs';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <h1 className='my-6 md:my-8 text-2xl md:text-3xl font-bold'>
        運営者プロフィール
      </h1>

      <div className='max-w-3xl mx-auto'>
        <div className='flex flex-col md:flex-row md:items-start md:gap-8 mb-6 md:mb-8'>
          <figure className='flex justify-center mb-6 md:mb-0 md:flex-shrink-0'>
            <Image
              src={`https://images.microcms-assets.io/assets/888d632d12c2409a941139ea8e9d5adc/4b554546c1f24889ad498f79e9fc9730/profile-icon.webp?w=156&h=156&q=70&fit=crop`}
              alt='profile icon'
              width={156}
              height={156}
              quality={70}
              priority
              sizes='156px'
              className='rounded-full'
            />
          </figure>

          <section className='flex flex-col space-y-4 md:space-y-6 text-base md:text-lg'>
            <p>栄養士のNozomiです☺️</p>
            <p>
              ベストセラー「世界一シンプルで科学的に証明された究極の食事」に基づく健康レシピを発信しています。
              簡単で美味しく、体に優しい料理で、毎日の食事が楽しみになるようなレシピをご紹介します！
            </p>
            <p>
              妊婦期🤰🏻に妊娠糖尿病と診断された事をきっかけにこれまでの食生活を見直し、
              科学的に証明された健康的な食事を取り入れることを決意しました💪🏻🔥
            </p>

            <div className='flex flex-col space-y-0 pt-2'>
              <p className='flex items-center'>
                <span className='mr-2'>🥣</span>病院の調理師10年
              </p>
              <p className='flex items-center'>
                <span className='mr-2'>🍺</span>ノンアルビール溺愛家
              </p>
              <p className='flex items-center'>
                <span className='mr-2'>👶🏻</span>一児の母
              </p>
            </div>

            <p className='pt-2 md:pt-4'>
              本サイトが、皆さんの毎日の健康の助けになれば嬉しいです
            </p>
          </section>
        </div>
      </div>

      <div className='mt-8'>
        <Breadcrumbs />
      </div>
    </>
  );
}
