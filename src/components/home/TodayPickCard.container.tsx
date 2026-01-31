import { getRecipes } from '@/utils/micro-cms/micro-cms';
import { TodayPickCard } from './TodayPickCard';

export const TodayPickCardContainer = async () => {
  // Get a random popular or recent recipe for today's pick
  const { contents } = await getRecipes({
    limit: 10,
    filters: 'isPopular[equals]true',
  });

  if (contents.length === 0) {
    // Fallback to any recipe if no popular recipes
    const { contents: fallbackContents } = await getRecipes({ limit: 10 });
    if (fallbackContents.length === 0) return null;

    // Pick a random recipe
    const randomRecipe =
      fallbackContents[Math.floor(Math.random() * fallbackContents.length)];
    return <TodayPickCard recipe={randomRecipe} />;
  }

  // Pick a random popular recipe
  const randomRecipe = contents[Math.floor(Math.random() * contents.length)];
  return <TodayPickCard recipe={randomRecipe} />;
};
