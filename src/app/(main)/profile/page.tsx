import { Breadcrumbs } from '@/components/BreadCrumbs';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <h1 className='mb-6 text-3xl font-mincho'>運営者プロフィール</h1>

      <figure className='flex justify-center w-full mb-6'>
        <Image
          src={`/profile-icon.svg`}
          alt='profile icon'
          width={156}
          height={156}
        />
      </figure>

      <section className='font-mincho'>
        <p>栄養士をしています。</p>
        <p>
          出産を機に家族の健康を意識するようになり、「世界一シンプルで科学的に証明された究極の食事」という書籍に影響を受け、体に良い食材を使ったレシピを考えるようになりました。
        </p>
        <p>ぜひ見ていただけると嬉しいです。</p>
      </section>
      <Breadcrumbs />
    </>
  );
}
