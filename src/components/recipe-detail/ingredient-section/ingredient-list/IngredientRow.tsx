'use client';

import { TableCell, TableRow } from '@/components/ui/table';
import { useServings } from '../recipe-stats/servings.context';
import { Ingredient } from './IngredientList';

export const IngredientRow = ({ ingredient }: { ingredient: Ingredient }) => {
  const { servings } = useServings();

  return (
    <TableRow>
      <TableCell className='px-2 py-2 font-medium border-0'>
        {ingredient.name}
      </TableCell>
      <TableCell className='flex justify-end py-1 pr-2 space-x-1'>
        {ingredient.quantity === 0 ? (
          <span className='font-light'>適量</span>
        ) : (
          <>
            {ingredient.unit.position === 'prefix' && (
              <span className='font-light'>{ingredient.unit.name}</span>
            )}
            <span className='font-sans font-light'>
              {parseFloat((ingredient.quantity * servings).toFixed(2))}
            </span>
            {ingredient.unit.position === 'suffix' && (
              <span className='font-light'>{ingredient.unit.name}</span>
            )}
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default IngredientRow;
