import { getRecipeById } from '@/utils/micro-cms/micro-cms';
import { Breadcrumbs } from './BreadCrumbs';

type BreadcrumbsContainerProps = {
  recipeId: string;
};

export const BreadcrumbsContainer = async ({
  recipeId,
}: BreadcrumbsContainerProps) => {
  const res = await getRecipeById(recipeId);

  return <Breadcrumbs recipeName={res.name} />;
};
