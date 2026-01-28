import { Breadcrumbs } from '@/components/BreadCrumbs';

export default function ContactPage() {
  return (
    <>
      <h1 className='my-6 md:my-8 text-2xl md:text-3xl font-bold font-crimson'>
        お問い合わせ
      </h1>
      <div className='max-w-3xl mx-auto space-y-6 md:space-y-8 text-base md:text-lg'>
        <p className='leading-relaxed text-text-secondary'>
          Nozomi&apos;s
          Recipesをご利用いただき、ありがとうございます。ご質問、ご意見、ご要望などがございましたら、以下の方法でお気軽にお問い合わせください。
        </p>

        <section className='p-6 md:p-8 rounded-lg bg-white shadow-sm border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            SNSでのお問い合わせ
          </h2>
          <div className='space-y-4'>
            <div>
              <h3 className='font-medium mb-2 text-text-primary'>
                X (Twitter)
              </h3>
              <p className='text-text-secondary mb-2'>
                DMまたはメンションでお気軽にご連絡ください。
              </p>
              <a
                href='https://x.com/nozomis_recipes'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[#80a1ba] hover:text-[#e17055] transition-colors underline'
              >
                @nozomis_recipes
              </a>
            </div>

            <div>
              <h3 className='font-medium mb-2 text-text-primary'>Instagram</h3>
              <p className='text-text-secondary mb-2'>
                DMまたはコメントでお気軽にご連絡ください。
              </p>
              <a
                href='https://www.instagram.com/nozomisrecipes/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[#80a1ba] hover:text-[#e17055] transition-colors underline'
              >
                @nozomisrecipes
              </a>
            </div>
          </div>
        </section>

        <section className='p-6 md:p-8 rounded-lg bg-white shadow-sm border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            よくあるお問い合わせ
          </h2>
          <ul className='space-y-3 text-text-secondary'>
            <li className='flex items-start'>
              <span className='mr-2 text-[#e17055]'>•</span>
              <span>
                レシピに関するご質問は、
                <a
                  href='/faq'
                  className='text-[#80a1ba] hover:text-[#e17055] transition-colors underline'
                >
                  よくある質問
                </a>
                ページもご確認ください
              </span>
            </li>
            <li className='flex items-start'>
              <span className='mr-2 text-[#e17055]'>•</span>
              <span>レシピの使用に関しては、利用規約をご確認ください</span>
            </li>
            <li className='flex items-start'>
              <span className='mr-2 text-[#e17055]'>•</span>
              <span>
                プライバシーに関するご質問は、プライバシーポリシーをご覧ください
              </span>
            </li>
          </ul>
        </section>

        <section className='p-6 md:p-8 rounded-lg bg-[#fff7dd] border border-border-color'>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 font-crimson text-text-primary'>
            お返事について
          </h2>
          <p className='text-text-secondary leading-relaxed'>
            お問い合わせいただいた内容には、できる限り迅速にお返事させていただきますが、内容によっては数日お時間をいただく場合がございます。あらかじめご了承ください。
          </p>
        </section>
      </div>

      <div className='mt-8'>
        <Breadcrumbs />
      </div>
    </>
  );
}
