import { fetchGraphQL } from './client';

type UpdateEnhancementRequestCountArgs = {
  recipeId: string;
  enhancementRequestCount: number;
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

interface UpdateEnhancementRequestCountResponse {
  data: {
    update_nozomis_recipes_schema_recipes: {
      returning: Recipe[];
    };
  };
}
export async function updateEnhancementRequestCount({
  recipeId,
  enhancementRequestCount,
}: UpdateEnhancementRequestCountArgs) {
  const operation = `
    mutation UpdateEnhancementRequestCount($recipe_id: String!, $enhancement_request_count: Int = 10) {
      update_nozomis_recipes_schema_recipes(where: {recipe_id: {_eq: $recipe_id}}, _set: {enhancement_request_count: $enhancement_request_count}) {
        returning {
          id
          delicious_count
          enhancement_request_count
          total_view
          recipe_id
          created_at
          updated_at
        }
      }
    }`;

  return fetchGraphQL<UpdateEnhancementRequestCountResponse>(
    operation,
    'UpdateEnhancementRequestCount',
    { recipe_id: recipeId, enhancement_request_count: enhancementRequestCount },
    3600 * 5 // 5 hour
  );
}
