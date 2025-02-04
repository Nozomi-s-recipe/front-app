type CalorieProps = {
  calories: number;
};

export const Calorie = ({ calories }: CalorieProps) => {
  return (
    <div className='flex flex-col items-center space-y-2'>
      <label id='calories-label' className='font-serif'>
        カロリー
      </label>
      {/* outputを使用して、これが計算された値であることを示す */}
      <output aria-labelledby='calories-label' className='flex items-center'>
        {/* 数値と単位を分けつつ関連付ける */}
        <span className='font-serif min-w-[4ch] text-xl font-medium'>
          {calories.toLocaleString()}
        </span>
        {/* aria-hiddenで単位を装飾的に扱う */}
        <span className='font-serif' aria-hidden='true'>
          kcal
        </span>
      </output>
    </div>
  );
};
