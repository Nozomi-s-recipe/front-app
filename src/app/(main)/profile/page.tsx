import { Breadcrumbs } from '@/components/BreadCrumbs';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <h1 className='mb-6 text-3xl '>運営者プロフィール</h1>

      <figure className='flex justify-center w-full mb-6'>
        <Image
          src={`https://images.microcms-assets.io/assets/888d632d12c2409a941139ea8e9d5adc/4b554546c1f24889ad498f79e9fc9730/profile-icon.webp?w=156&h=156&q=70&fit=crop`}
          alt='profile icon'
          width={156}
          height={156}
          quality={70}
          priority
          sizes='156px'
        />
      </figure>

      <section className=' flex flex-col'>
        <p className='pb-4'>
          初めまして、ご覧いただきありがとうございます。栄養士をしている、のぞみと申します
        </p>
        <p>
          以前の私は疲れ体質で、少しでもカラダに良いものをと思い、根拠のない健康情報に振り回されていました
        </p>
        <p className='pb-4'>
          ところが、医師が書いている「世界一シンプルで科学的に証明された究極の食事」という書籍に沿った食生活をすることで、カラダが疲れにくくなり仕事・プライベートが充実するようになりました
        </p>
        <p className='pb-4'>
          本サイトでは、根拠のない健康情報に振り回されることに疲れた方のために、栄養士7年目の私がとことん考えた安心レシピを提供します
        </p>
        <p className='pb-6'>
          まだまだレシピ数は少ないですが、納得のいくこだわりレシピを開発していきます
        </p>
        <p>本サイトが、毎日の健康の助けになれば、嬉しい限りです</p>
      </section>
      <Breadcrumbs />
    </>
  );
}
