type RecipeTag = {
  name: string;
};

export const RecipeTag = ({ name }: RecipeTag) => {
  return (
    <span className='p-1 font-semibold rounded-lg font-serif bg-secondary-A text-base-white'>
      #{name}
    </span>
  );
};
