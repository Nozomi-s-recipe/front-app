'use server';

import { getRecipeById as HasuraGetRecipeById } from '@/utils/graph-ql/GetRecipeById';
import { updateDeliciousCount } from '@/utils/graph-ql/UpdateDeliciousCount';
import { updateEnhancementRequestCount } from '@/utils/graph-ql/UpdateEnhancementRequestCount';

export async function incrementDeliciousCount(recipeId: string) {
  try {
    const { data } = await HasuraGetRecipeById({
      recipeId,
    });

    await updateDeliciousCount({
      recipeId,
      deliciousCount:
        data.nozomis_recipes_schema_recipes[0].delicious_count + 1,
    });

    return { success: true };
  } catch (error) {
    console.error('Server Action Error:', error);
    return { success: false };
  }
}

export async function incrementEnhancementRequestCount(recipeId: string) {
  try {
    const { data } = await HasuraGetRecipeById({
      recipeId,
    });

    await updateEnhancementRequestCount({
      recipeId,
      enhancementRequestCount:
        data.nozomis_recipes_schema_recipes[0].enhancement_request_count + 1,
    });

    return { success: true };
  } catch (error) {
    console.error('Server Action Error:', error);
    return { success: false };
  }
}
