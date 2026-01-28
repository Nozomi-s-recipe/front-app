import { Breadcrumbs } from '@/components/BreadCrumbs';

export default function CookiesPage() {
  return (
    <>
      <h1 className='my-6 md:my-8 text-2xl md:text-3xl font-bold font-crimson'>
        クッキーポリシー
      </h1>

      <div className='max-w-3xl mx-auto space-y-6 md:space-y-8 text-base md:text-lg'>
        <p className='leading-relaxed text-text-secondary'>
          Nozomi&apos;s
          Recipes（以下「当サイト」）では、ユーザー体験の向上およびサービスの改善のため、クッキー（Cookie）および類似技術を使用しています。本ポリシーでは、これらの技術の使用方法について説明します。
        </p>

        <section className='p-6 md:p-8 rounded-lg bg-white shadow-sm border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            クッキーとは
          </h2>
          <p className='text-text-secondary leading-relaxed'>
            クッキーとは、ウェブサイトがユーザーのブラウザに保存する小さなテキストファイルです。クッキーにより、ウェブサイトはユーザーの設定を記憶したり、訪問履歴を追跡したりすることができます。
          </p>
        </section>

        <section className='p-6 md:p-8 rounded-lg bg-white shadow-sm border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            当サイトで使用するクッキーの種類
          </h2>
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold mb-2 text-text-primary'>
                1. 必須クッキー
              </h3>
              <p className='text-text-secondary leading-relaxed mb-2'>
                ウェブサイトの基本的な機能を提供するために必要なクッキーです。
              </p>
              <ul className='space-y-2 ml-6 text-text-secondary'>
                <li className='flex items-start'>
                  <span className='mr-2 text-[#e17055]'>•</span>
                  <span>セッション管理</span>
                </li>
                <li className='flex items-start'>
                  <span className='mr-2 text-[#e17055]'>•</span>
                  <span>セキュリティ機能</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-2 text-text-primary'>
                2. 機能性クッキー
              </h3>
              <p className='text-text-secondary leading-relaxed mb-2'>
                ユーザーの設定や選択を記憶し、より快適な体験を提供するためのクッキーです。
              </p>
              <ul className='space-y-2 ml-6 text-text-secondary'>
                <li className='flex items-start'>
                  <span className='mr-2 text-[#e17055]'>•</span>
                  <span>
                    お気に入りレシピの保存（ローカルストレージを使用）
                  </span>
                </li>
                <li className='flex items-start'>
                  <span className='mr-2 text-[#e17055]'>•</span>
                  <span>ユーザー設定の記憶</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-2 text-text-primary'>
                3. 分析クッキー
              </h3>
              <p className='text-text-secondary leading-relaxed mb-2'>
                ウェブサイトの利用状況を分析し、サービス改善に役立てるためのクッキーです。
              </p>
              <ul className='space-y-2 ml-6 text-text-secondary'>
                <li className='flex items-start'>
                  <span className='mr-2 text-[#e17055]'>•</span>
                  <span>
                    Google
                    Analytics（訪問者数、ページビュー、滞在時間等の統計データ収集）
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className='p-6 md:p-8 rounded-lg bg-white shadow-sm border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            ローカルストレージの使用
          </h2>
          <div className='space-y-3 text-text-secondary leading-relaxed'>
            <p>
              当サイトでは、お気に入りレシピの保存など、一部の機能でブラウザのローカルストレージを使用しています。
            </p>
            <p>
              ローカルストレージに保存された情報は、ユーザーのブラウザ内にのみ保持され、当サイトのサーバーには送信されません。
            </p>
            <p>主な用途：</p>
            <ul className='space-y-2 ml-6'>
              <li className='flex items-start'>
                <span className='mr-2 text-[#e17055]'>•</span>
                <span>お気に入りレシピのID保存</span>
              </li>
              <li className='flex items-start'>
                <span className='mr-2 text-[#e17055]'>•</span>
                <span>ユーザー設定の保持</span>
              </li>
            </ul>
          </div>
        </section>

        <section className='p-6 md:p-8 rounded-lg bg-white shadow-sm border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            Google Analyticsについて
          </h2>
          <div className='space-y-3 text-text-secondary leading-relaxed'>
            <p>
              当サイトでは、Google Inc.が提供するGoogle
              Analyticsを使用しています。
            </p>
            <p>
              Google
              Analyticsは、クッキーを使用してユーザーのウェブサイト利用状況を匿名で収集・報告します。
            </p>
            <p>
              収集されたデータは、個人を特定するものではありません。Google
              Analyticsの詳細については、
              <a
                href='https://policies.google.com/technologies/partner-sites'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[#80a1ba] hover:text-[#e17055] transition-colors underline'
              >
                Googleのプライバシーポリシー
              </a>
              をご確認ください。
            </p>
          </div>
        </section>

        <section className='p-6 md:p-8 rounded-lg bg-white shadow-sm border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            クッキーの管理方法
          </h2>
          <div className='space-y-4 text-text-secondary leading-relaxed'>
            <p>
              ユーザーは、ブラウザの設定でクッキーを管理することができます。
            </p>

            <div>
              <h3 className='font-semibold mb-2 text-text-primary'>
                主要ブラウザの設定方法：
              </h3>
              <ul className='space-y-2 ml-6'>
                <li className='flex items-start'>
                  <span className='mr-2 text-[#e17055]'>•</span>
                  <span>
                    <strong>Chrome:</strong> 設定 &gt;
                    プライバシーとセキュリティ &gt; Cookie と他のサイトデータ
                  </span>
                </li>
                <li className='flex items-start'>
                  <span className='mr-2 text-[#e17055]'>•</span>
                  <span>
                    <strong>Firefox:</strong> 設定 &gt;
                    プライバシーとセキュリティ &gt; Cookie とサイトデータ
                  </span>
                </li>
                <li className='flex items-start'>
                  <span className='mr-2 text-[#e17055]'>•</span>
                  <span>
                    <strong>Safari:</strong> 環境設定 &gt; プライバシー &gt;
                    Cookie と Web サイトのデータ
                  </span>
                </li>
                <li className='flex items-start'>
                  <span className='mr-2 text-[#e17055]'>•</span>
                  <span>
                    <strong>Edge:</strong> 設定 &gt; Cookie
                    とサイトのアクセス許可 &gt; Cookie とサイト
                    データの管理と削除
                  </span>
                </li>
              </ul>
            </div>

            <div className='p-4 bg-[#fff7dd] rounded-lg border border-[#e8e6e1]'>
              <p className='font-medium mb-2'>⚠️ 重要な注意事項</p>
              <p>
                クッキーを無効化すると、当サイトの一部機能（お気に入り保存など）が正常に動作しない場合があります。
              </p>
            </div>
          </div>
        </section>

        <section className='p-6 md:p-8 rounded-lg bg-white shadow-sm border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            ポリシーの変更
          </h2>
          <p className='text-text-secondary leading-relaxed'>
            当サイトは、法令の変更やサービスの向上に伴い、本クッキーポリシーを予告なく変更する場合があります。変更後のポリシーは、本ページに掲載された時点で効力を生じます。
          </p>
        </section>

        <section className='p-6 md:p-8 rounded-lg bg-[#fff7dd] border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            お問い合わせ
          </h2>
          <p className='text-text-secondary leading-relaxed'>
            クッキーポリシーに関するご質問は、
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
