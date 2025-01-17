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

      <section className='font-mincho flex flex-col'>
        <p className='pb-4'>カラダによい食べ物ってなんでしょう？</p>
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
        <p>本サイトが、健康に生きたい方の毎日の食事の一助となれば幸いです</p>
      </section>
      <Breadcrumbs />
    </>
  );
}
