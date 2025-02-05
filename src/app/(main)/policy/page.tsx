import { Breadcrumbs } from '@/components/BreadCrumbs';

export default function Home() {
  return (
    <>
      <h1 className='mb-8 text-3xl font-serif'>レシピポリシー</h1>
      <p className='mb-6 font-medium leading-relaxed font-serif'>
        カラダによい食べ物ってなんだろう？
      </p>
      <p className='mb-6 font-medium leading-relaxed font-serif'>
        以前の私は疲れ体質で、少しでもカラダに良いものをと思い、根拠のない健康情報に振り回されていました
      </p>
      <p className='mb-6 font-medium leading-relaxed font-serif'>
        ところが、ある本に沿った食生活をすることで、カラダが疲れにくくなり仕事・プライベートを楽しめるようになりました
      </p>
      <p className='mb-8 font-medium leading-relaxed font-serif'>
        本レシピサイトでは、以下のポリシーによる、カラダに悪い食材を使わない、カラダに嬉しいレシピを考案・発信します
      </p>
      <div className='mb-12 space-y-6'>
        <section>
          <h2 className='flex items-start mb-2 font-medium font-serif'>
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
          <ol className='pl-4 space-y-1 font-medium list-none font-serif'>
            <li className='flex items-start'>
              <span className='mr-1'>①</span>魚
            </li>
            <li className='flex items-start'>
              <span className='mr-1'>②</span>野菜と果物（じゃがいもは除く）
            </li>
            <li className='flex items-start'>
              <span className='mr-1'>③</span>
              茶色い炭水化物（全粒粉、玄米、そば等）
            </li>
            <li className='flex items-start'>
              <span className='mr-1'>④</span>オリーブオイル
            </li>
            <li className='flex items-start'>
              <span className='mr-1'>⑤</span>ナッツ類
            </li>
          </ol>
        </section>

        <section>
          <h2 className='flex items-start mb-2 font-medium font-serif'>
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
          <ol className='pl-4 space-y-1 font-medium list-none font-serif'>
            <li className='flex items-start'>
              <span className='mr-1'>①</span>
              赤い肉（豚肉、牛肉、羊肉等。鶏肉は含まない）
            </li>
            <li className='flex items-start'>
              <span className='mr-1'>②</span>
              加工肉（ハム、ベーコン、ソーセージ）
            </li>
            <li className='flex items-start'>
              <span className='mr-1'>③</span>
              白い炭水化物（白米、うどん、パスタ、じゃがいも等）
            </li>
            <li className='flex items-start'>
              <span className='mr-1'>④</span>飽和脂肪酸を多く含む物（バター等）
            </li>
          </ol>
        </section>
      </div>
      <div className='flex items-start font-medium font-serif'>
        <span>＊</span>
        <div className='flex flex-col space-y-2'>
          <span>
            本サイトでは、健康に良い、健康に悪いは「世界一シンプルで科学的に証明された究極の食事」という書籍を参考にしています。
          </span>
          <span>興味のある方はぜひ書籍もご覧ください。</span>
        </div>
      </div>
      <Breadcrumbs />
    </>
  );
}
