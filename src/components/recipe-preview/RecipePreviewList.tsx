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
    <div className='grid gap-8 grid-cols-[repeat(auto-fill,minmax(340px,1fr))]'>
      {recipePreviews.map((recipe, index) => (
        <div
          key={recipe.recipeId}
          className='animate-fadeInUp'
          style={{
            animationDelay: `${Math.min(index * 0.1, 0.6)}s`,
          }}
        >
          <RecipePreview {...recipe} />
        </div>
      ))}
    </div>
  );
};
