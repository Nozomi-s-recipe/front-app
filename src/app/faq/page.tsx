import { Breadcrumbs } from '@/components/BreadCrumbs';

export default function FAQPage() {
  const faqs = [
    {
      category: 'レシピについて',
      questions: [
        {
          q: 'レシピポリシーとは何ですか？',
          a: '本サイトでは、科学的根拠に基づいた健康的な食材を使用し、赤身肉・加工肉・バターなどの健康に悪いとされる食材を極力使用しないレシピを提供しています。詳しくは「レシピポリシー」ページをご覧ください。',
        },
        {
          q: 'レシピの分量は何人分ですか？',
          a: 'レシピは基本的に2人分で記載されています。各レシピページで人数を調整できる機能もご利用いただけます。',
        },
        {
          q: '代替食材を使用しても良いですか？',
          a: 'はい、お好みや手に入る食材に合わせて代替していただいて構いません。ただし、レシピポリシーに沿った健康的な食材の選択をおすすめします。',
        },
      ],
    },
    {
      category: 'サイトの使い方',
      questions: [
        {
          q: 'お気に入り機能の使い方は？',
          a: 'レシピカードの右上にあるハートアイコンをクリックすると、お気に入りに追加できます。お気に入りはブラウザに保存され、次回訪問時も表示されます。',
        },
        {
          q: 'レシピの検索方法は？',
          a: 'ページ上部の検索ボックスからレシピ名や食材名で検索できます。また、カテゴリーやタグからも絞り込み検索が可能です。',
        },
        {
          q: 'モバイルでも使えますか？',
          a: 'はい、本サイトはスマートフォンやタブレットでも快適にご利用いただけるレスポンシブデザインとなっています。',
        },
      ],
    },
    {
      category: 'レシピの利用について',
      questions: [
        {
          q: 'レシピを商用利用できますか？',
          a: 'レシピの商用利用をご希望の場合は、事前にお問い合わせください。個人的な利用や家族・友人へのシェアは自由にしていただけます。',
        },
        {
          q: 'レシピをSNSでシェアしても良いですか？',
          a: 'はい、ぜひSNSでシェアしてください。各レシピページにはシェアボタンが設置されています。レシピをご自身のブログなどで紹介される際は、出典として本サイトへのリンクをお願いいたします。',
        },
        {
          q: 'レシピの画像を使用できますか？',
          a: 'レシピ画像の無断転載はご遠慮ください。SNSでのシェアや、出典を明記した上での引用は可能です。',
        },
      ],
    },
    {
      category: 'その他',
      questions: [
        {
          q: '新しいレシピはどのくらいの頻度で追加されますか？',
          a: '週に2-3回程度、新しいレシピを追加しています。新着情報はSNS（X、Instagram）でもお知らせしています。',
        },
        {
          q: 'リクエストしたいレシピがあります',
          a: 'SNS（X、Instagram）のDMやコメントでリクエストをお寄せください。すべてのリクエストにお応えすることは難しいですが、可能な限り対応させていただきます。',
        },
        {
          q: '栄養価の計算方法は？',
          a: '栄養価は、日本食品標準成分表に基づいて計算しています。あくまで目安としてご参考ください。',
        },
      ],
    },
  ];

  return (
    <>
      <h1 className='my-6 md:my-8 text-2xl md:text-3xl font-bold font-crimson'>
        よくある質問
      </h1>

      <div className='max-w-3xl mx-auto space-y-8 md:space-y-10'>
        <p className='text-base md:text-lg leading-relaxed text-text-secondary'>
          Nozomi&apos;s
          Recipesに関するよくあるご質問をまとめました。こちらで解決しない場合は、
          <a
            href='/contact'
            className='text-[#80a1ba] hover:text-[#e17055] transition-colors underline'
          >
            お問い合わせ
          </a>
          ページからご連絡ください。
        </p>

        {faqs.map((section, sectionIndex) => (
          <section
            key={sectionIndex}
            className='bg-white rounded-lg shadow-sm border border-border-color overflow-hidden'
          >
            <h2 className='text-xl md:text-2xl font-semibold p-6 md:p-8 bg-[#fff7dd] font-crimson text-text-primary border-b border-border-color'>
              {section.category}
            </h2>

            <div className='divide-y divide-border-color'>
              {section.questions.map((faq, faqIndex) => (
                <div key={faqIndex} className='p-6 md:p-8'>
                  <h3 className='text-lg font-semibold mb-3 text-text-primary flex items-start'>
                    <span className='text-[#e17055] mr-2 flex-shrink-0'>
                      Q.
                    </span>
                    <span>{faq.q}</span>
                  </h3>
                  <div className='text-text-secondary leading-relaxed flex items-start'>
                    <span className='text-[#80a1ba] mr-2 flex-shrink-0 font-semibold'>
                      A.
                    </span>
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className='p-6 md:p-8 rounded-lg bg-[#fff7dd] border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            お問い合わせ
          </h2>
          <p className='text-text-secondary leading-relaxed mb-4'>
            上記で解決しない質問や、その他ご不明な点がございましたら、お気軽にお問い合わせください。
          </p>
          <a
            href='/contact'
            className='inline-flex items-center gap-2 px-6 py-3 bg-[#e17055] text-white rounded-full font-medium hover:bg-[#d35d47] transition-colors shadow-sm hover:shadow-md'
          >
            お問い合わせページへ
            <span className='text-lg'>→</span>
          </a>
        </section>
      </div>

      <div className='mt-8'>
        <Breadcrumbs />
      </div>
    </>
  );
}
