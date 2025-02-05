'use client';
import Image from 'next/image';
import { useState } from 'react';

import { CookingStart } from './cooking-start/CookingStart';
import {
  CookingStepList,
  CookingStepListProps,
} from './cooking-step/CookingStepList';

type CookingStepSectionProps = {
  cookingSteps: CookingStepListProps;
};

export const CookingStepSection = ({
  cookingSteps,
}: CookingStepSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className='min-w-80'>
      <h2
        className='flex items-center justify-between pb-1 mb-2 text-xl font-semibold border-b-4 cursor-pointer font-serif border-secondary-B'
        onClick={() => setIsOpen(!isOpen)}
      >
        作り方
        <div
          className={`transform transition-transform duration-200 ${
            isOpen ? '' : '-rotate-180'
          }`}
        >
          <Image
            src='/chevron-up-black.svg'
            alt='chevron up icon'
            width={24}
            height={24}
            unoptimized
          />
        </div>
      </h2>
      <div
        className={`transition-all duration-200 overflow-hidden ${
          isOpen ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <CookingStart />
        <CookingStepList cookingSteps={cookingSteps.cookingSteps} />
      </div>
    </section>
  );
};
