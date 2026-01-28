import { Breadcrumbs } from '@/components/BreadCrumbs';

export default function PrivacyPage() {
  return (
    <>
      <h1 className='my-6 md:my-8 text-2xl md:text-3xl font-bold font-crimson'>
        プライバシーポリシー
      </h1>

      <div className='max-w-3xl mx-auto space-y-6 md:space-y-8 text-base md:text-lg'>
        <p className='leading-relaxed text-text-secondary'>
          Nozomi&apos;s
          Recipes（以下「当サイト」）は、ユーザーの個人情報の保護を重要視し、以下の方針に基づいて適切に取り扱います。
        </p>

        <section className='p-6 md:p-8 rounded-lg bg-white shadow-sm border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            1. 個人情報の収集
          </h2>
          <div className='space-y-3 text-text-secondary leading-relaxed'>
            <p>当サイトでは、以下の情報を収集する場合があります：</p>
            <ul className='space-y-2 ml-6'>
              <li className='flex items-start'>
                <span className='mr-2 text-[#e17055]'>•</span>
                <span>
                  お問い合わせフォームに入力された情報（氏名、メールアドレス等）
                </span>
              </li>
              <li className='flex items-start'>
                <span className='mr-2 text-[#e17055]'>•</span>
                <span>
                  クッキーやウェブビーコンを使用して収集されるアクセス情報
                </span>
              </li>
              <li className='flex items-start'>
                <span className='mr-2 text-[#e17055]'>•</span>
                <span>
                  ブラウザのローカルストレージに保存されるお気に入りレシピ情報
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className='p-6 md:p-8 rounded-lg bg-white shadow-sm border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            2. 個人情報の利用目的
          </h2>
          <div className='space-y-3 text-text-secondary leading-relaxed'>
            <p>収集した個人情報は、以下の目的で利用します：</p>
            <ul className='space-y-2 ml-6'>
              <li className='flex items-start'>
                <span className='mr-2 text-[#e17055]'>•</span>
                <span>お問い合わせへの対応</span>
              </li>
              <li className='flex items-start'>
                <span className='mr-2 text-[#e17055]'>•</span>
                <span>サイトの改善およびコンテンツの最適化</span>
              </li>
              <li className='flex items-start'>
                <span className='mr-2 text-[#e17055]'>•</span>
                <span>アクセス解析による統計データの作成</span>
              </li>
              <li className='flex items-start'>
                <span className='mr-2 text-[#e17055]'>•</span>
                <span>ユーザー体験の向上（お気に入り機能等）</span>
              </li>
            </ul>
          </div>
        </section>

        <section className='p-6 md:p-8 rounded-lg bg-white shadow-sm border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            3. 個人情報の第三者提供
          </h2>
          <p className='text-text-secondary leading-relaxed'>
            当サイトは、法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
          </p>
        </section>

        <section className='p-6 md:p-8 rounded-lg bg-white shadow-sm border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            4. クッキー（Cookie）の使用
          </h2>
          <div className='space-y-3 text-text-secondary leading-relaxed'>
            <p>
              当サイトでは、ユーザー体験の向上およびアクセス解析のためにクッキーを使用しています。
            </p>
            <p>
              クッキーの使用を希望されない場合は、ブラウザの設定で無効化することができます。ただし、一部機能が正常に動作しない可能性があります。
            </p>
            <p>
              詳細は
              <a
                href='/cookies'
                className='text-[#80a1ba] hover:text-[#e17055] transition-colors underline'
              >
                クッキーポリシー
              </a>
              をご確認ください。
            </p>
          </div>
        </section>

        <section className='p-6 md:p-8 rounded-lg bg-white shadow-sm border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            5. アクセス解析ツール
          </h2>
          <div className='space-y-3 text-text-secondary leading-relaxed'>
            <p>
              当サイトでは、Google
              Analyticsを使用してアクセス解析を行っています。Google
              Analyticsはクッキーを使用して匿名のトラフィックデータを収集します。
            </p>
            <p>
              この情報は個人を特定するものではありません。詳細はGoogleのプライバシーポリシーをご確認ください。
            </p>
          </div>
        </section>

        <section className='p-6 md:p-8 rounded-lg bg-white shadow-sm border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            6. ローカルストレージの使用
          </h2>
          <p className='text-text-secondary leading-relaxed'>
            当サイトでは、お気に入りレシピの保存などの機能を提供するため、ブラウザのローカルストレージを使用しています。この情報はユーザーのブラウザ内にのみ保存され、サーバーには送信されません。
          </p>
        </section>

        <section className='p-6 md:p-8 rounded-lg bg-white shadow-sm border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            7. 個人情報の開示・訂正・削除
          </h2>
          <p className='text-text-secondary leading-relaxed'>
            ユーザーは、自身の個人情報について開示、訂正、削除を求めることができます。ご希望の場合は、
            <a
              href='/contact'
              className='text-[#80a1ba] hover:text-[#e17055] transition-colors underline'
            >
              お問い合わせ
            </a>
            ページからご連絡ください。
          </p>
        </section>

        <section className='p-6 md:p-8 rounded-lg bg-white shadow-sm border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            8. プライバシーポリシーの変更
          </h2>
          <p className='text-text-secondary leading-relaxed'>
            当サイトは、法令の変更やサービスの向上に伴い、本プライバシーポリシーを予告なく変更する場合があります。変更後のポリシーは、本ページに掲載された時点で効力を生じます。
          </p>
        </section>

        <section className='p-6 md:p-8 rounded-lg bg-[#fff7dd] border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            お問い合わせ
          </h2>
          <p className='text-text-secondary leading-relaxed'>
            プライバシーポリシーに関するご質問は、
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
