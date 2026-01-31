import { redirect } from 'next/navigation';
import { getSubCategoryById } from '@/utils/const';

export default async function SubCategoryPage({
  params,
}: {
  params: Promise<{ mainCategoryId: string; subCategoryId: string }>;
}) {
  const { mainCategoryId, subCategoryId } = await params;
  const subCategory = getSubCategoryById(subCategoryId);

  // Redirect to main category page with genre filter
  if (subCategory) {
    redirect(`/${mainCategoryId}?genre=${subCategoryId}`);
  }

  // If subcategory not found, redirect to main category page
  redirect(`/${mainCategoryId}`);
}
