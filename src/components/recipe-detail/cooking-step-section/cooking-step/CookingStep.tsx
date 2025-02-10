import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RecipeImage } from '@/types/types';
import { LightbulbIcon } from 'lucide-react';

export type CookingStepProps = {
  index: number;
  title: string;
  image?: RecipeImage;
  description: string;
  point?: string;
};

export const CookingStep = ({
  index,
  title,
  image,
  description,
  point,
}: CookingStepProps) => {
  return (
    <Card className='border-none shadow-none'>
      <CardHeader className='p-0 pb-1'>
        <h2 className='text-lg'>
          <span className='mr-2'>{index}</span>
          <span>{title}</span>
        </h2>
      </CardHeader>
      <CardContent className='p-0 space-y-4'>
        <figure className='space-y-2'>
          {image && (
            <img
              src={`${image.src}?w=380&h=280&q=70&fit=crop&fm=webp`}
              width={380}
              height={240}
              alt={image.alt}
              loading='lazy'
              className='rounded-md'
            />
          )}
          <figcaption>{description}</figcaption>
        </figure>

        {point && (
          <Alert variant='default' className='border-primary'>
            <LightbulbIcon className='w-6 h-6' />
            <AlertTitle>ポイント</AlertTitle>
            <AlertDescription className='font-semibold'>
              {point}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
