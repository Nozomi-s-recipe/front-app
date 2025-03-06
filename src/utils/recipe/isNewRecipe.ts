import { NEW_RECIPE_DAYS } from '@/utils/const';

export const isNewRecipe = (createdAt: Date): boolean => {
  const now = new Date();
  const diffTime = now.getTime() - createdAt.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  return diffDays <= NEW_RECIPE_DAYS;
};
