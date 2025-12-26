import { getRecipes } from '@/utils/micro-cms/micro-cms';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    // Return empty array if query is too short
    if (!query || query.trim().length < 2) {
      return NextResponse.json([]);
    }

    // Fetch recipes matching the query
    const { contents } = await getRecipes({
      q: query.trim(),
      limit: 10,
      fields: ['id', 'name', 'mainCategory', 'subCategory'].join(','),
    });

    // Map to suggestion format
    const suggestions = contents.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
      mainCategory: recipe.mainCategory,
      subCategory: recipe.subCategory,
    }));

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error('Search suggestions error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch suggestions' },
      { status: 500 }
    );
  }
}
