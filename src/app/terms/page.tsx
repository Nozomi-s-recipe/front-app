import { Breadcrumbs } from '@/components/BreadCrumbs';

export default function TermsPage() {
  return (
    <>
      <h1 className='my-6 md:my-8 text-2xl md:text-3xl font-bold font-crimson'>
        利用規約
      </h1>

      <div className='max-w-3xl mx-auto space-y-6 md:space-y-8 text-base md:text-lg'>
        <p className='leading-relaxed text-text-secondary'>
          本利用規約（以下「本規約」）は、Nozomi&apos;s
          Recipes（以下「当サイト」）が提供するサービスの利用条件を定めるものです。ユーザーは、本規約に同意した上で当サイトをご利用ください。
        </p>

        <section className='p-6 md:p-8 rounded-lg bg-white shadow-sm border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            第1条（適用）
          </h2>
          <div className='space-y-3 text-text-secondary leading-relaxed'>
            <p>
              本規約は、ユーザーと当サイトとの間の当サイトの利用に関わる一切の関係に適用されます。
            </p>
            <p>
              当サイトは本規約のほか、サービスの利用に関するルールやガイドラインを定めることがあります。これらは本規約の一部を構成するものとします。
            </p>
          </div>
        </section>

        <section className='p-6 md:p-8 rounded-lg bg-white shadow-sm border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            第2条（利用許諾）
          </h2>
          <div className='space-y-3 text-text-secondary leading-relaxed'>
            <p>
              当サイトは、ユーザーに対し、本規約に従う限りにおいて、当サイトで公開されているレシピおよびコンテンツを非商用目的で利用することを許諾します。
            </p>
            <p>ユーザーは以下の行為を行うことができます：</p>
            <ul className='space-y-2 ml-6'>
              <li className='flex items-start'>
                <span className='mr-2 text-[#e17055]'>•</span>
                <span>個人的または家庭内での調理目的でのレシピの利用</span>
              </li>
              <li className='flex items-start'>
                <span className='mr-2 text-[#e17055]'>•</span>
                <span>
                  SNSでのレシピの共有（当サイトへのリンクを含めた形での共有）
                </span>
              </li>
              <li className='flex items-start'>
                <span className='mr-2 text-[#e17055]'>•</span>
                <span>
                  出典を明記した上での、ブログ等での紹介（当サイトへのリンク必須）
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className='p-6 md:p-8 rounded-lg bg-white shadow-sm border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            第3条（禁止事項）
          </h2>
          <div className='space-y-3 text-text-secondary leading-relaxed'>
            <p>
              ユーザーは、当サイトの利用にあたり、以下の行為をしてはなりません：
            </p>
            <ul className='space-y-2 ml-6'>
              <li className='flex items-start'>
                <span className='mr-2 text-[#e17055]'>•</span>
                <span>
                  レシピやコンテンツの商用利用（事前の許可なく、販売、出版、放送等での利用）
                </span>
              </li>
              <li className='flex items-start'>
                <span className='mr-2 text-[#e17055]'>•</span>
                <span>
                  画像やレシピの無断転載（出典の明記なしでの複製、配布）
                </span>
              </li>
              <li className='flex items-start'>
                <span className='mr-2 text-[#e17055]'>•</span>
                <span>当サイトのコンテンツを自身の創作物として偽る行為</span>
              </li>
              <li className='flex items-start'>
                <span className='mr-2 text-[#e17055]'>•</span>
                <span>
                  当サイトのサーバーまたはネットワークに過度な負荷をかける行為
                </span>
              </li>
              <li className='flex items-start'>
                <span className='mr-2 text-[#e17055]'>•</span>
                <span>
                  当サイトの運営を妨害する行為、または信用を毀損する行為
                </span>
              </li>
              <li className='flex items-start'>
                <span className='mr-2 text-[#e17055]'>•</span>
                <span>法令または公序良俗に違反する行為</span>
              </li>
            </ul>
          </div>
        </section>

        <section className='p-6 md:p-8 rounded-lg bg-white shadow-sm border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            第4条（著作権）
          </h2>
          <div className='space-y-3 text-text-secondary leading-relaxed'>
            <p>
              当サイトで公開されているレシピ、画像、テキスト、その他のコンテンツの著作権は、当サイト運営者または正当な権利者に帰属します。
            </p>
            <p>
              ユーザーは、本規約で明示的に許可された範囲を超えて、これらのコンテンツを使用することはできません。
            </p>
          </div>
        </section>

        <section className='p-6 md:p-8 rounded-lg bg-white shadow-sm border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            第5条（免責事項）
          </h2>
          <div className='space-y-3 text-text-secondary leading-relaxed'>
            <p>
              当サイトは、レシピの正確性、完全性、有用性について保証するものではありません。
            </p>
            <p>
              ユーザーが当サイトのレシピを利用して発生した損害（アレルギー反応、食中毒、その他の健康被害を含む）について、当サイトは一切の責任を負いません。
            </p>
            <p>
              食材の選択や調理方法については、ユーザー自身の責任において判断してください。アレルギーや持病がある方は、必要に応じて医師に相談してください。
            </p>
          </div>
        </section>

        <section className='p-6 md:p-8 rounded-lg bg-white shadow-sm border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            第6条（サービス内容の変更・停止）
          </h2>
          <p className='text-text-secondary leading-relaxed'>
            当サイトは、ユーザーへの事前通知なく、サービスの内容を変更、追加、または停止することができるものとします。これによりユーザーに生じた損害について、当サイトは責任を負いません。
          </p>
        </section>

        <section className='p-6 md:p-8 rounded-lg bg-white shadow-sm border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            第7条（利用規約の変更）
          </h2>
          <p className='text-text-secondary leading-relaxed'>
            当サイトは、必要に応じて本規約を変更することができます。変更後の規約は、当サイトに掲載された時点で効力を生じます。変更後も当サイトの利用を継続した場合、ユーザーは変更後の規約に同意したものとみなします。
          </p>
        </section>

        <section className='p-6 md:p-8 rounded-lg bg-white shadow-sm border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            第8条（準拠法・管轄裁判所）
          </h2>
          <div className='space-y-3 text-text-secondary leading-relaxed'>
            <p>本規約の解釈にあたっては、日本法を準拠法とします。</p>
            <p>
              当サイトに関して紛争が生じた場合には、当サイト運営者の所在地を管轄する裁判所を専属的合意管轄とします。
            </p>
          </div>
        </section>

        <section className='p-6 md:p-8 rounded-lg bg-[#fff7dd] border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            お問い合わせ
          </h2>
          <p className='text-text-secondary leading-relaxed'>
            本規約に関するご質問は、
            <a
              href='/contact'
              className='text-[#80a1ba] hover:text-[#e17055] transition-colors underline'
            >
              お問い合わせ
            </a>
            ページからご連絡ください。
          </p>
        </section>

        <p className='text-sm text-text-muted text-right'>
          最終更新日: {new Date().toLocaleDateString('ja-JP')}
        </p>
      </div>

      <div className='mt-8'>
        <Breadcrumbs />
      </div>
    </>
  );
}
