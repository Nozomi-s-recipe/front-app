import { CookingStep, CookingStepProps } from './CookingStep';

type CookingStepListProps = {
  cookingSteps: Omit<CookingStepProps, 'index'>[];
};

export const CookingStepList = ({ cookingSteps }: CookingStepListProps) => {
  return (
    <ol className='flex flex-col space-y-6' aria-label='調理手順リスト'>
      {cookingSteps.map((cookingStep, i) => {
        return (
          <li key={`CookingStep-${i}`}>
            <CookingStep index={i + 1} {...cookingStep} />
          </li>
        );
      })}
    </ol>
  );
};
