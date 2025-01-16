import { fetchGraphQL } from './client';

type GetRecipeByIdArgs = {
  recipeId: string;
};

interface Recipe {
  id: number;
  recipe_id: string;
  delicious_count: number;
  enhancement_request_count: number;
  total_view: number;
  created_at: string;
  updated_at: string;
}

interface GetRecipeByIdResponse {
  data: {
    nozomis_recipes_schema_recipes: Recipe[];
  };
}
export async function getRecipeById({ recipeId }: GetRecipeByIdArgs) {
  const operation = `
  query getRecipeById($recipe_id: String!) {
    nozomis_recipes_schema_recipes(where: {recipe_id: {_eq: $recipe_id}}) {
      id
      recipe_id
      delicious_count
      enhancement_request_count
      total_view
      created_at
      updated_at
    }
  }`;

  return fetchGraphQL<GetRecipeByIdResponse>(
    operation,
    'getRecipeById',
    { recipe_id: recipeId },
    3600 * 5 // 5 hour
  );
}
