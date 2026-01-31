import { Footer } from '@/components/footer/Footer';
import { PolicyHero } from '@/components/policy/PolicyHero';
import { PolicyIntro } from '@/components/policy/PolicyIntro';
import { PolicyCard } from '@/components/policy/PolicyCard';
import { ReferenceBook } from '@/components/policy/ReferenceBook';
import { FooterNavigation } from '@/components/policy/FooterNavigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "レシピポリシー | Nozomi's Recipes",
  description:
    '健康に良い食材を積極的に使用し、健康に悪い食材を極力使用しないレシピポリシーについてご紹介します。',
};

const goodFoodItems = [
  { text: '魚' },
  { text: '野菜と果物', note: '※じゃがいもは除く' },
  { text: '茶色い炭水化物', note: '全粒粉、玄米、そば等' },
  { text: 'オリーブオイル' },
  { text: 'ナッツ類' },
];

const badFoodItems = [
  { text: '赤い肉', note: '豚肉、牛肉、羊肉等。鶏肉は含まない' },
  { text: '加工肉', note: 'ハム、ベーコン、ソーセージ' },
  { text: '白い炭水化物', note: '白米、うどん、パスタ、じゃがいも等' },
  { text: '飽和脂肪酸を多く含む物', note: 'バター等' },
];

export default function PolicyPage() {
  return (
    <>
      <div className='min-h-screen bg-gray-50'>
        {/* Mobile Container */}
        <div className='max-w-[430px] mx-auto bg-gray-50 min-h-screen relative'>
          {/* Hero Section */}
          <PolicyHero />

          {/* Content Card */}
          <main className='bg-white rounded-t-[28px] -mt-6 relative z-20 px-6 pt-8 pb-15 min-h-[calc(100vh-256px)]'>
            {/* Intro Section */}
            <PolicyIntro />

            {/* Policy Section */}
            <section className='mb-8'>
              <PolicyCard
                type='good'
                policyNumber='Policy 01'
                title='健康に良い食材を積極的に使用します'
                icon='✓'
                items={goodFoodItems}
              />

              <PolicyCard
                type='bad'
                policyNumber='Policy 02'
                title='健康に悪い食材を極力使用しません'
                icon='✕'
                items={badFoodItems}
              />
            </section>

            {/* Reference Section */}
            <ReferenceBook />

            {/* Footer Navigation */}
            <FooterNavigation />
          </main>
        </div>
      </div>

      {/* Site Footer */}
      <Footer />
    </>
  );
}
