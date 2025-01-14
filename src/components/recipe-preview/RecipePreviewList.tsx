import { Menu } from '@/types/types';
import { RecipePreview, RecipePreviewProps } from './RecipePreview';

type RecipePreviewListProps = {
  recipePreviews: RecipePreviewProps[];
  category: Menu;
};

export const RecipePreviewList = ({
  recipePreviews,
  category,
}: RecipePreviewListProps) => {
  return (
    <section>
      <h1 className='pl-1 mb-6 text-2xl border-l-4 font-mincho border-primary'>
        <span className='block -translate-y-0.5'>{category.name}</span>
      </h1>
      <ul className='flex flex-col space-y-2'>
        {recipePreviews.map((recipePreview, i) => {
          return (
            <li key={`RecipePreview-${i}`}>
              <RecipePreview {...recipePreview} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
