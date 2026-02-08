import { getRecipes } from '@/utils/micro-cms/micro-cms';
import { TodayPickCard } from './TodayPickCard';

export const TodayPickCardContainer = async () => {
  // Get random recipes for today's pick
  const { contents } = await getRecipes({ limit: 10 });

  if (contents.length === 0) return null;

  // Pick a random recipe
  const randomRecipe = contents[Math.floor(Math.random() * contents.length)];
  return <TodayPickCard recipe={randomRecipe} />;
};
