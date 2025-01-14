'use client';
import { useServings } from '../recipe-stats/servings.context';
import { Ingredient } from './IngredientList';

export const IngredientRow = ({ ingredient }: { ingredient: Ingredient }) => {
  const { servings } = useServings();

  return (
    <tr className='flex justify-between pl-2'>
      <td>{ingredient.name}</td>
      <td className='flex space-x-1'>
        {ingredient.unit.position === 'prefix' && (
          <span>{ingredient.unit.name}</span>
        )}
        <span>{ingredient.quantity * servings}</span>
        {ingredient.unit.position === 'suffix' && (
          <span>{ingredient.unit.name}</span>
        )}
      </td>
    </tr>
  );
};
