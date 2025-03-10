import { getRecipeById } from '@/utils/micro-cms/micro-cms';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const recipe = await getRecipeById(id);
    return NextResponse.json(recipe);
  } catch (error) {
    console.error('レシピの取得に失敗しました:', error);
    return NextResponse.json(
      { error: 'レシピの取得に失敗しました' },
      { status: 500 }
    );
  }
}
