import { CategoryFilterSection } from '@/components/category/CategoryFilterSection';
import { ActiveFiltersBar } from '@/components/category/ActiveFiltersBar';
import { FilteredCategoryRecipeList } from '@/components/category/FilteredCategoryRecipeList';
import SearchField from '@/components/search/SearchField';
import { getRecipes } from '@/utils/micro-cms/micro-cms';
import { recipesToMetadata } from '@/lib/filters/recipeAdapter';
import { Suspense } from 'react';
import { Search } from 'lucide-react';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const q = (await searchParams).q;

  // Fetch all recipes (or filtered by search query if needed)
  const { contents } = await getRecipes({
    q: q || undefined,
  });

  // Convert recipes to RecipeMetadata format for filtering
  const recipeMeta = recipesToMetadata(contents);

  return (
    <>
      {/* Hero Section with Search */}
      <section className='px-5 py-6 border-b border-md-outline'>
        <h1 className='flex items-center gap-3 mb-1.5'>
          <span className='text-[32px] leading-none'>
            <Search className='w-8 h-8' />
          </span>
          <span className='font-crimson text-[28px] font-semibold text-md-on-surface'>
            レシピ検索
          </span>
        </h1>
        <p className='text-[13px] text-muted-foreground ml-11 mb-4'>
          {q
            ? `「${q}」の検索結果 · ${contents.length} レシピ`
            : 'お好みのレシピを検索'}
        </p>
        <div className='mt-4'>
          <SearchField />
        </div>
      </section>

      {/* Filter Section */}
      <CategoryFilterSection recipes={recipeMeta} />

      {/* Active Filters Bar */}
      <ActiveFiltersBar recipes={recipeMeta} />

      {/* Recipe List */}
      <Suspense
        fallback={
          <section className='px-5 py-5'>
            <div className='text-center py-8 text-muted-foreground'>
              <p className='text-sm'>読み込み中...</p>
            </div>
          </section>
        }
      >
        <FilteredCategoryRecipeList
          recipes={contents}
          totalCount={contents.length}
        />
      </Suspense>
    </>
  );
}
