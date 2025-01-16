import { fetchGraphQL } from './client';

type UpdateDeliciousCountArgs = {
  recipeId: string;
  deliciousCount: number;
};

interface Recipe {
  id: number;
  recipe_id: string;
  delicious_count: number;
  total_view: number;
  created_at: string;
  updated_at: string;
}

interface UpdateDeliciousCountResponse {
  data: {
    update_nozomis_recipes_schema_recipes: {
      returning: Recipe[];
    };
  };
}
export async function updateDeliciousCount({
  recipeId,
  deliciousCount,
}: UpdateDeliciousCountArgs) {
  const operation = `
    mutation UpdateDeliciousCount($recipe_id: String!, $delicious_count: Int!) {
      update_nozomis_recipes_schema_recipes(where: {recipe_id: {_eq: $recipe_id}}, _set: {delicious_count: $delicious_count}) {
        returning {
          id
          delicious_count
          total_view
          recipe_id
          created_at
          updated_at
        }
      }
    }`;

  return fetchGraphQL<UpdateDeliciousCountResponse>(
    operation,
    'UpdateDeliciousCount',
    { recipe_id: recipeId, delicious_count: deliciousCount },
    3600 * 5 // 5 hour
  );
}
