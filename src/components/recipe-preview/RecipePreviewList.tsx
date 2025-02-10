import { RecipePreview, RecipePreviewProps } from './RecipePreview';

type RecipePreviewListProps = {
  recipePreviews: RecipePreviewProps[];
};

export const RecipePreviewList = ({
  recipePreviews,
}: // categoryName,
RecipePreviewListProps) => {
  return (
    <section>
      {/* <h1 className='pl-1 mb-6 text-2xl border-l-4 border-primary'>
        <span className='block -translate-y-0.5'>{categoryName}</span>
      </h1> */}
      <ul className='grid grid-cols-2 gap-2'>
        {recipePreviews.map((recipePreview, i) => {
          return (
            <li key={`RecipePreview-${i}`}>
              <RecipePreview {...recipePreview} isPriority={i < 1} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
