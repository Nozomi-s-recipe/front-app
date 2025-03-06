import { RecipePreview, RecipePreviewProps } from './RecipePreview';

interface RecipePreviewListProps {
  recipePreviews: RecipePreviewProps[];
}

export const RecipePreviewList = ({
  recipePreviews,
}: RecipePreviewListProps) => {
  if (!recipePreviews || recipePreviews.length === 0) {
    return null;
  }

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
      {recipePreviews.map((recipe) => (
        <div key={recipe.recipeId} className='w-fit mx-auto'>
          <RecipePreview {...recipe} />
        </div>
      ))}
    </div>
  );
};
