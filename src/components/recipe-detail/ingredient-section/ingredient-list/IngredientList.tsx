'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { IngredientRow } from './IngredientRow';

type Unit = {
  name: string;
  position: 'suffix' | 'prefix';
};

export type Ingredient = {
  name: string;
  quantity: number;
  unit: Unit;
};

type IngredientListProps = {
  ingredients: Ingredient[];
  seasonings: Ingredient[];
};

export const IngredientList = ({
  ingredients,
  seasonings,
}: IngredientListProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='min-w-80'>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className='flex items-center justify-between w-full pb-1 border-b-2 border-primary'>
          <h2 className='text-xl font-medium'>材料</h2>
          <ChevronUp
            className={`transform transition-duration-200 ${
              isOpen ? '' : 'rotate-180'
            }`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className='space-y-4'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='px-0 text-lg font-medium'>食材</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredients.map((ingredient, i) => (
                <IngredientRow
                  key={`ingredient-${i}`}
                  ingredient={ingredient}
                />
              ))}
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='px-0 text-lg font-medium'>
                  調味料
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {seasonings.map((seasoning, i) => (
                <IngredientRow key={`seasoning-${i}`} ingredient={seasoning} />
              ))}
            </TableBody>
          </Table>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
