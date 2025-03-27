import { Breadcrumbs } from '@/components/BreadCrumbs';

export default function Home() {
  return (
    <>
      <h1 className='my-6 md:my-8 text-2xl md:text-3xl font-bold'>
        レシピポリシー
      </h1>
      <div className='max-w-3xl mx-auto space-y-4 md:space-y-6 text-base md:text-lg'>
        <p className='font-medium leading-relaxed'>
          カラダによい食べ物ってなんだろう？
        </p>
        <p className='font-medium leading-relaxed'>
          以前の私は疲れ体質で、少しでもカラダに良いものをと思い、根拠のない健康情報に振り回されていました
        </p>
        <p className='font-medium leading-relaxed'>
          ところが、ある本に沿った食生活をすることで、カラダが疲れにくくなり仕事・プライベートを楽しめるようになりました
        </p>
        <p className='font-medium leading-relaxed mb-8'>
          本レシピサイトでは、以下のポリシーによる、カラダに悪い食材を使わない、カラダに嬉しいレシピを考案・発信します
        </p>

        <div className='mb-8 md:mb-12 space-y-8 md:space-y-10'>
          <section className='p-4 md:p-6 rounded-lg'>
            <h2 className='flex items-start mb-4 font-medium text-lg md:text-xl'>
              <span className='mr-2'>1.</span>
              <div className='flex flex-col'>
                <span className='border-b-2 border-secondary-A'>
                  健康に良いとされている以下の食材を
                </span>
                <span className='border-b-2 border-secondary-A w-fit'>
                  積極的に使用します
                </span>
              </div>
            </h2>
            <ol className='pl-6 md:pl-8 space-y-2 font-medium list-none'>
              <li className='flex items-start'>
                <span className='mr-2'>①</span>魚
              </li>
              <li className='flex items-start'>
                <span className='mr-2'>②</span>野菜と果物（じゃがいもは除く）
              </li>
              <li className='flex items-start'>
                <span className='mr-2'>③</span>
                茶色い炭水化物（全粒粉、玄米、そば等）
              </li>
              <li className='flex items-start'>
                <span className='mr-2'>④</span>オリーブオイル
              </li>
              <li className='flex items-start'>
                <span className='mr-2'>⑤</span>ナッツ類
              </li>
            </ol>
          </section>

          <section className='p-4 md:p-6 rounded-lg'>
            <h2 className='flex items-start mb-4 font-medium text-lg md:text-xl'>
              <span className='mr-2'>2.</span>
              <div className='flex flex-col'>
                <span className='border-b-2 border-secondary-B'>
                  健康に悪いとされている以下の食材を
                </span>
                <span className='border-b-2 border-secondary-B w-fit'>
                  極力使用しません
                </span>
              </div>
            </h2>
            <ol className='pl-6 md:pl-8 space-y-2 font-medium list-none'>
              <li className='flex items-start'>
                <span className='mr-2'>①</span>
                赤い肉（豚肉、牛肉、羊肉等。鶏肉は含まない）
              </li>
              <li className='flex items-start'>
                <span className='mr-2'>②</span>
                加工肉（ハム、ベーコン、ソーセージ）
              </li>
              <li className='flex items-start'>
                <span className='mr-2'>③</span>
                白い炭水化物（白米、うどん、パスタ、じゃがいも等）
              </li>
              <li className='flex items-start'>
                <span className='mr-2'>④</span>
                飽和脂肪酸を多く含む物（バター等）
              </li>
            </ol>
          </section>
        </div>

        <div className='flex items-start font-medium p-4 md:p-6 rounded-lg'>
          <span className='mr-2'>＊</span>
          <div className='flex flex-col space-y-2'>
            <span>
              本サイトでは、健康に良い、健康に悪いは「世界一シンプルで科学的に証明された究極の食事」という書籍を参考にしています。
            </span>
            <span>興味のある方はぜひ書籍もご覧ください。</span>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <Breadcrumbs />
      </div>
    </>
  );
}
