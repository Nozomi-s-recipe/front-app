type RecipeTag = {
  name: string;
};

export const RecipeTag = ({ name }: RecipeTag) => {
  return <span className='p-2 rounded-xl bg-secondary'>#{name}</span>;
};
