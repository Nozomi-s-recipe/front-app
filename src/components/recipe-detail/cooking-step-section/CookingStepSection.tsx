'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronUp } from 'lucide-react';
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
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className='flex items-center justify-between w-full pb-1 mb-2 border-b-2 border-primary'>
          <h2 className='text-xl'>作り方</h2>
          <ChevronUp
            className={`transform transition-duration-200 ${
              isOpen ? '' : 'rotate-180'
            }`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className='mb-4'>
            <CookingStart />
          </div>
          <CookingStepList cookingSteps={cookingSteps.cookingSteps} />
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
};
