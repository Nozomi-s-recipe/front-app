import { NumericalDisplay } from './NumericalDisplay';
import { Servings } from './Servings';

type RecipeStats = {
  calories: number;
  cookingTime: number;
};

export const RecipeStats = ({ calories, cookingTime }: RecipeStats) => {
  return (
    <div className='flex space-x-8'>
      <Servings />
      <NumericalDisplay
        title='カロリー'
        unit='kcal'
        minWidth='5ch'
        value={calories}
      />
      <NumericalDisplay
        title='時間'
        unit='分'
        minWidth='3ch'
        value={cookingTime}
      />
    </div>
  );
};
