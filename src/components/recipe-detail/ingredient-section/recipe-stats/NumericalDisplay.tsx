type NumericalDisplayProps = {
  value: number;
  title: string;
  unit?: string; // 単位はオプショナルに
  minWidth?: string; // 最小幅を調整可能に（例: "4ch"）
};

export const NumericalDisplay = ({
  value,
  title,
  unit,
  minWidth = '4ch', // デフォルト値を設定
}: NumericalDisplayProps) => {
  return (
    <div className='flex flex-col items-center space-y-2'>
      <label id={`${title}-label`} className='font-serif'>
        {title}
      </label>
      <output aria-labelledby={`${title}-label`} className='flex items-center'>
        <span
          className='text-xl font-medium font-serif'
          style={{ minWidth }} // 動的な最小幅
        >
          {value.toLocaleString()}
        </span>
        {unit && (
          <span className='font-serif' aria-hidden='true'>
            {unit}
          </span>
        )}
      </output>
    </div>
  );
};
