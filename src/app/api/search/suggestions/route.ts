import { getRecipes } from '@/utils/micro-cms/micro-cms';
import type { Recipe } from '@/utils/micro-cms/types';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

type SuggestionResult = {
  id: string;
  name: string;
  mainCategory: string[];
  subCategory: string[];
  matchType: 'title' | 'ingredient';
  matchedIngredients?: string[];
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    // Return empty array if query is too short
    if (!query || query.trim().length < 2) {
      return NextResponse.json([]);
    }

    const searchQuery = query.trim().toLowerCase();

    // Fetch recipes with ingredients
    // First, search by recipe name (title match)
    const { contents: titleMatches } = await getRecipes({
      q: searchQuery,
      limit: 10,
      fields: [
        'id',
        'name',
        'mainCategory',
        'subCategory',
        'ingredients',
        'seasonings',
      ].join(','),
    });

    // Create a map to track unique recipes and their match types
    const recipeMap = new Map<string, SuggestionResult>();

    // Add title matches (highest priority)
    titleMatches.forEach((recipe: Recipe) => {
      recipeMap.set(recipe.id, {
        id: recipe.id,
        name: recipe.name,
        mainCategory: recipe.mainCategory,
        subCategory: recipe.subCategory,
        matchType: 'title',
      });
    });

    // If we have fewer than 10 results, search by ingredients
    if (recipeMap.size < 10) {
      const { contents: allRecipes } = await getRecipes({
        limit: 100, // Get more recipes to search through ingredients
        fields: [
          'id',
          'name',
          'mainCategory',
          'subCategory',
          'ingredients',
          'seasonings',
        ].join(','),
      });

      // Filter recipes by ingredient match
      const ingredientMatches = allRecipes.filter((recipe: Recipe) => {
        // Skip if already in results from title match
        if (recipeMap.has(recipe.id)) return false;

        // Check if any ingredient or seasoning matches the query
        const allIngredients = [
          ...(recipe.ingredients || []),
          ...(recipe.seasonings || []),
        ];

        return allIngredients.some((ingredient) =>
          ingredient.name.toLowerCase().includes(searchQuery)
        );
      });

      // Add ingredient matches
      ingredientMatches.forEach((recipe: Recipe) => {
        if (recipeMap.size >= 10) return; // Limit to 10 total results

        const allIngredients = [
          ...(recipe.ingredients || []),
          ...(recipe.seasonings || []),
        ];

        const matchedIngredients = allIngredients
          .filter((ingredient) =>
            ingredient.name.toLowerCase().includes(searchQuery)
          )
          .map((ingredient) => ingredient.name);

        recipeMap.set(recipe.id, {
          id: recipe.id,
          name: recipe.name,
          mainCategory: recipe.mainCategory,
          subCategory: recipe.subCategory,
          matchType: 'ingredient',
          matchedIngredients: matchedIngredients.slice(0, 2), // Show up to 2 matched ingredients
        });
      });
    }

    // Convert map to array and return
    const suggestions = Array.from(recipeMap.values()).slice(0, 10);

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error('Search suggestions error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch suggestions' },
      { status: 500 }
    );
  }
}
