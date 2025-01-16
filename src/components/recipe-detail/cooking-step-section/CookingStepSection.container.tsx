import { getRecipeById } from '@/lib/micro-cms/micro-cms';
import { CookingStepSection } from './CookingStepSection';

type CookingStepSectionContainerProps = {
  recipeId: string;
};

export const CookingStepSectionContainer = async ({
  recipeId,
}: CookingStepSectionContainerProps) => {
  const { cookingSteps } = await getRecipeById(recipeId);

  return (
    <CookingStepSection
      cookingSteps={{
        cookingSteps: cookingSteps.map((cookingStep) => {
          return {
            title: cookingStep.name,
            description: cookingStep.description,
            image: {
              src: cookingStep.image.url,
              alt: cookingStep.name,
            },
            point: cookingStep.tips || undefined,
          };
        }),
      }}
    />
  );
};
