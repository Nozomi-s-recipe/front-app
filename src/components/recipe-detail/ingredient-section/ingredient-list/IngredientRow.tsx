'use client';
import { useServings } from '../recipe-stats/servings.context';
import { Ingredient } from './IngredientList';

export const IngredientRow = ({ ingredient }: { ingredient: Ingredient }) => {
  const { servings } = useServings();

  return (
    <tr className='flex justify-between pl-2'>
      <td className='font-serif'>{ingredient.name}</td>
      <td className='flex space-x-1'>
        {ingredient.unit.position === 'prefix' && (
          <span className='font-serif font-light'>{ingredient.unit.name}</span>
        )}
        <span className='font-sans font-light'>
          {ingredient.quantity * servings}
        </span>
        {ingredient.unit.position === 'suffix' && (
          <span className='font-serif font-light'>{ingredient.unit.name}</span>
        )}
      </td>
    </tr>
  );
};
