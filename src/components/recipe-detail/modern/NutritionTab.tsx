import React from 'react';
import type { Nutrient } from '@/utils/micro-cms/types';

interface NutritionTabProps {
  nutrition: Nutrient;
}

export const NutritionTab: React.FC<NutritionTabProps> = ({ nutrition }) => {
  return (
    <div className='animate-fadeIn'>
      {/* Header */}
      <div className='text-center mb-6'>
        <span className='inline-block text-xs text-[#8a9e98] bg-[#f5f7f6] px-4 py-2 rounded-full'>
          1人分あたり
        </span>
      </div>

      {/* Main Nutrition Grid - 4 columns */}
      <div className='grid grid-cols-4 gap-2 mb-8'>
        {/* Calories - Primary */}
        <div className='text-center p-5 bg-[#4a628a] text-white rounded-[20px] transition-all duration-200 hover:bg-[#5a7299]'>
          <div className='text-2xl font-bold leading-none'>
            {nutrition.calories ?? 0}
          </div>
          <div className='text-xs font-medium mt-0.5'>kcal</div>
          <div className='text-[11px] text-white/80 mt-2'>カロリー</div>
        </div>

        {/* Protein */}
        <div className='text-center p-5 bg-[#f5f7f6] rounded-[20px] transition-all duration-200 hover:bg-[#e8edeb]'>
          <div className='text-2xl font-bold leading-none text-[#1a2e28]'>
            {nutrition.proteins ?? 0}
          </div>
          <div className='text-xs font-medium mt-0.5 text-[#1a2e28]'>g</div>
          <div className='text-[11px] text-[#8a9e98] mt-2'>たんぱく質</div>
        </div>

        {/* Fat */}
        <div className='text-center p-5 bg-[#f5f7f6] rounded-[20px] transition-all duration-200 hover:bg-[#e8edeb]'>
          <div className='text-2xl font-bold leading-none text-[#1a2e28]'>
            {nutrition.fats ?? 0}
          </div>
          <div className='text-xs font-medium mt-0.5 text-[#1a2e28]'>g</div>
          <div className='text-[11px] text-[#8a9e98] mt-2'>脂質</div>
        </div>

        {/* Carbohydrates */}
        <div className='text-center p-5 bg-[#f5f7f6] rounded-[20px] transition-all duration-200 hover:bg-[#e8edeb]'>
          <div className='text-2xl font-bold leading-none text-[#1a2e28]'>
            {nutrition.carbohydrates ?? 0}
          </div>
          <div className='text-xs font-medium mt-0.5 text-[#1a2e28]'>g</div>
          <div className='text-[11px] text-[#8a9e98] mt-2'>炭水化物</div>
        </div>
      </div>

      {/* Detailed Nutrition */}
      {(nutrition.dietaryFiber !== undefined ||
        nutrition.salt !== undefined ||
        (nutrition.vitamins && nutrition.vitamins.length > 0)) && (
        <div className='bg-[#f5f7f6] rounded-[20px] p-5 mb-5'>
          <h3 className='text-sm font-semibold text-[#1a2e28] mb-4'>
            詳細な栄養成分
          </h3>
          <ul className='list-none'>
            {nutrition.dietaryFiber !== undefined && (
              <li className='flex justify-between items-center py-3 border-b border-[#e8edeb] last:border-b-0'>
                <span className='text-sm text-[#5a6e68]'>食物繊維</span>
                <span className='text-sm font-semibold text-[#1a2e28]'>
                  {nutrition.dietaryFiber}g
                </span>
              </li>
            )}
            {nutrition.salt !== undefined && (
              <li className='flex justify-between items-center py-3 border-b border-[#e8edeb] last:border-b-0'>
                <span className='text-sm text-[#5a6e68]'>食塩相当量</span>
                <span className='text-sm font-semibold text-[#1a2e28]'>
                  {nutrition.salt}g
                </span>
              </li>
            )}

            {/* Vitamins */}
            {nutrition.vitamins &&
              nutrition.vitamins.length > 0 &&
              nutrition.vitamins[0] && (
                <>
                  {nutrition.vitamins[0].vitaminA !== undefined && (
                    <li className='flex justify-between items-center py-3 border-b border-[#e8edeb] last:border-b-0'>
                      <span className='text-sm text-[#5a6e68]'>ビタミンA</span>
                      <span className='text-sm font-semibold text-[#1a2e28]'>
                        {nutrition.vitamins[0].vitaminA}μg
                      </span>
                    </li>
                  )}
                  {nutrition.vitamins[0].vitaminB1 !== undefined && (
                    <li className='flex justify-between items-center py-3 border-b border-[#e8edeb] last:border-b-0'>
                      <span className='text-sm text-[#5a6e68]'>ビタミンB1</span>
                      <span className='text-sm font-semibold text-[#1a2e28]'>
                        {nutrition.vitamins[0].vitaminB1}mg
                      </span>
                    </li>
                  )}
                  {nutrition.vitamins[0].vitaminB2 !== undefined && (
                    <li className='flex justify-between items-center py-3 border-b border-[#e8edeb] last:border-b-0'>
                      <span className='text-sm text-[#5a6e68]'>ビタミンB2</span>
                      <span className='text-sm font-semibold text-[#1a2e28]'>
                        {nutrition.vitamins[0].vitaminB2}mg
                      </span>
                    </li>
                  )}
                  {nutrition.vitamins[0].vitaminB3 !== undefined && (
                    <li className='flex justify-between items-center py-3 border-b border-[#e8edeb] last:border-b-0'>
                      <span className='text-sm text-[#5a6e68]'>ビタミンB3</span>
                      <span className='text-sm font-semibold text-[#1a2e28]'>
                        {nutrition.vitamins[0].vitaminB3}mg
                      </span>
                    </li>
                  )}
                  {nutrition.vitamins[0].vitaminB5 !== undefined && (
                    <li className='flex justify-between items-center py-3 border-b border-[#e8edeb] last:border-b-0'>
                      <span className='text-sm text-[#5a6e68]'>ビタミンB5</span>
                      <span className='text-sm font-semibold text-[#1a2e28]'>
                        {nutrition.vitamins[0].vitaminB5}mg
                      </span>
                    </li>
                  )}
                  {nutrition.vitamins[0].vitaminB6 !== undefined && (
                    <li className='flex justify-between items-center py-3 border-b border-[#e8edeb] last:border-b-0'>
                      <span className='text-sm text-[#5a6e68]'>ビタミンB6</span>
                      <span className='text-sm font-semibold text-[#1a2e28]'>
                        {nutrition.vitamins[0].vitaminB6}mg
                      </span>
                    </li>
                  )}
                  {nutrition.vitamins[0].vitaminB9 !== undefined && (
                    <li className='flex justify-between items-center py-3 border-b border-[#e8edeb] last:border-b-0'>
                      <span className='text-sm text-[#5a6e68]'>
                        ビタミンB9（葉酸）
                      </span>
                      <span className='text-sm font-semibold text-[#1a2e28]'>
                        {nutrition.vitamins[0].vitaminB9}μg
                      </span>
                    </li>
                  )}
                  {nutrition.vitamins[0].vitaminB12 !== undefined && (
                    <li className='flex justify-between items-center py-3 border-b border-[#e8edeb] last:border-b-0'>
                      <span className='text-sm text-[#5a6e68]'>
                        ビタミンB12
                      </span>
                      <span className='text-sm font-semibold text-[#1a2e28]'>
                        {nutrition.vitamins[0].vitaminB12}μg
                      </span>
                    </li>
                  )}
                  {nutrition.vitamins[0].vitaminC !== undefined && (
                    <li className='flex justify-between items-center py-3 border-b border-[#e8edeb] last:border-b-0'>
                      <span className='text-sm text-[#5a6e68]'>ビタミンC</span>
                      <span className='text-sm font-semibold text-[#1a2e28]'>
                        {nutrition.vitamins[0].vitaminC}mg
                      </span>
                    </li>
                  )}
                  {nutrition.vitamins[0].vitaminD !== undefined && (
                    <li className='flex justify-between items-center py-3 border-b border-[#e8edeb] last:border-b-0'>
                      <span className='text-sm text-[#5a6e68]'>ビタミンD</span>
                      <span className='text-sm font-semibold text-[#1a2e28]'>
                        {nutrition.vitamins[0].vitaminD}μg
                      </span>
                    </li>
                  )}
                  {nutrition.vitamins[0].vitaminE !== undefined && (
                    <li className='flex justify-between items-center py-3 border-b border-[#e8edeb] last:border-b-0'>
                      <span className='text-sm text-[#5a6e68]'>ビタミンE</span>
                      <span className='text-sm font-semibold text-[#1a2e28]'>
                        {nutrition.vitamins[0].vitaminE}mg
                      </span>
                    </li>
                  )}
                  {nutrition.vitamins[0].vitaminK !== undefined && (
                    <li className='flex justify-between items-center py-3 border-b border-[#e8edeb] last:border-b-0'>
                      <span className='text-sm text-[#5a6e68]'>ビタミンK</span>
                      <span className='text-sm font-semibold text-[#1a2e28]'>
                        {nutrition.vitamins[0].vitaminK}μg
                      </span>
                    </li>
                  )}
                </>
              )}
          </ul>
        </div>
      )}

      {/* Note */}
      <div className='text-center'>
        <p className='text-xs text-[#8a9e98] leading-relaxed'>
          ※ 栄養価は目安です。使用する食材や調味料により変動します。
        </p>
      </div>
    </div>
  );
};
