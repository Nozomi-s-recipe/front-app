import Image from 'next/image';
import { RecipeTag } from './RecipeTag';

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
};

export const RecipeMetaInfo = ({
  recipeName,
  deliciousCount,
  totalView,
  recipeDescription,
  recipeTags,
}: RecipeMetaInfo) => {
  return (
    <section className='w-80 bg-primary'>
      <div className='flex flex-col p-2 space-y-2'>
        <h1 className='text-2xl font-bold font-serif text-base-white'>
          {recipeName}
        </h1>
        <table className='font-antique text-base-white'>
          <tbody className='flex space-x-1'>
            <tr className='flex items-center space-x-0.5'>
              <td>
                <span className='flex items-center'>
                  <Image
                    src={'/smiling-face-with-hearts.svg'}
                    alt='smiling face with hearts icon'
                    width={20}
                    height={20}
                  />
                </span>
              </td>
              <td className='-translate-y-px'>{deliciousCount}</td>
            </tr>
            <tr className='flex items-center space-x-0.5'>
              <td>
                <Image
                  src={'/foot-print.svg'}
                  alt='foot print icon'
                  width={20}
                  height={20}
                />
              </td>
              <td className='-translate-y-px'>{totalView}</td>
            </tr>
          </tbody>
        </table>
        <p className='pb-4 font-serif text-base-white min-h-24'>
          {recipeDescription}
        </p>
        <ul className='flex flex-wrap pb-1 gap-x-2 gap-y-4'>
          {recipeTags.map((tag, i) => {
            return (
              <li key={`RecipeMetaInfo-tag-${i}`}>
                <RecipeTag name={tag.name} />
              </li>
            );
          })}
        </ul>{' '}
      </div>
    </section>
  );
};
