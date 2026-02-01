'use client';

import { useState } from 'react';
import { RecipeHeroImage } from './RecipeHeroImage';
import { RecipeHeader } from './RecipeHeader';
import { ServingAdjuster } from './ServingAdjuster';
import { RecipeDetailTabs } from './RecipeDetailTabs';
import { IngredientsTab } from './IngredientsTab';
import { PreparationsTab } from './PreparationsTab';
import { NutritionTab } from './NutritionTab';
import { BottomActionBar } from './BottomActionBar';
import { CookingModal } from './CookingModal';
import { ServingsProvider } from '../ingredient-section/recipe-stats/servings.context';
import { DEFAULT_SERVINGS } from '@/utils/const';
import type { Recipe } from '@/utils/micro-cms/types';

type ModernRecipeDetailProps = {
  recipe: Recipe;
  recipeId: string;
};

export const ModernRecipeDetail = ({
  recipe,
  recipeId,
}: ModernRecipeDetailProps) => {
  const [isCookingModalOpen, setIsCookingModalOpen] = useState(false);

  const ingredients = recipe.ingredients.map((ingredient) => ({
    name: ingredient.name,
    quantity: ingredient.quantity,
    unit: {
      name: ingredient.unit[0].name[0],
      position: ingredient.unit[0].position[0] as 'prefix' | 'suffix',
    },
  }));

  const seasonings = recipe.seasonings.map((seasoning) => ({
    name: seasoning.name,
    quantity: seasoning.quantity,
    unit: {
      name: seasoning.unit[0].name[0],
      position: seasoning.unit[0].position[0] as 'prefix' | 'suffix',
    },
  }));

  const cookingSteps = recipe.cookingSteps.map((step) => ({
    name: step.name,
    description: step.description,
    image: step.image,
    tips: step.tips || undefined,
  }));

  return (
    <ServingsProvider>
      <div className='max-w-[430px] mx-auto bg-[#f5f7f6] min-h-screen relative'>
        {/* Hero Image */}
        <RecipeHeroImage
          imageUrl={recipe.image.url}
          recipeName={recipe.name}
          recipeId={recipeId}
        />

        {/* Content Card */}
        <main className='bg-white rounded-t-[28px] -mt-8 relative z-20 px-6 pt-7 pb-32 min-h-[calc(100vh-388px)]'>
          {/* Recipe Header */}
          <RecipeHeader
            title={recipe.name}
            subtitle={recipe.description}
            time={`${recipe.cookingTime}分`}
            servings={DEFAULT_SERVINGS}
          />

          {/* Serving Adjuster */}
          <ServingAdjuster />

          {/* Tab Navigation and Content */}
          <RecipeDetailTabs
            ingredientsContent={
              <IngredientsTab
                ingredients={ingredients}
                seasonings={seasonings}
              />
            }
            preparationsContent={
              <PreparationsTab cookingSteps={cookingSteps} />
            }
            nutritionContent={<NutritionTab nutrition={recipe.nutrient} />}
          />
        </main>

        {/* Bottom Action Bar */}
        <BottomActionBar
          recipeId={recipeId}
          recipeName={recipe.name}
          onStartCooking={() => setIsCookingModalOpen(true)}
        />

        {/* Cooking Modal */}
        <CookingModal
          isOpen={isCookingModalOpen}
          onClose={() => setIsCookingModalOpen(false)}
          cookingSteps={cookingSteps}
        />
      </div>
    </ServingsProvider>
  );
};
