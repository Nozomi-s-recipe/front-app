import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RecipeTag } from './RecipeTag';
import ShareButtons from './ShareButton';

type Tag = {
  id: string;
  name: string;
};

export type RecipeMetaInfo = {
  recipeName: string;
  deliciousCount: number;
  totalView: number;
  recipeDescription: string;
  recipeTags: Tag[];
  image: {
    src: string;
  };
};

export const RecipeMetaInfo = ({
  recipeName,
  recipeDescription,
  recipeTags,
}: RecipeMetaInfo) => {
  return (
    <Card className='shadow w-80'>
      <CardHeader>
        <CardTitle className='text-2xl'>{recipeName}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <p className='min-h-24'>{recipeDescription}</p>
        <ul className='flex flex-wrap gap-x-2 gap-y-4'>
          {recipeTags.map((tag, i) => (
            <li key={`RecipeMetaInfo-tag-${i}`}>
              <RecipeTag name={tag.name} />
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <ShareButtons />
      </CardFooter>
    </Card>
  );
};
