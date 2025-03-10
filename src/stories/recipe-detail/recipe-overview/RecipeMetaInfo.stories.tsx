import type { Meta, StoryObj } from '@storybook/react';

import { RecipeMetaInfo } from '@/components/recipe-detail/recipe-overview/RecipeMetaInfo';
import { IMAGES } from '@/stories/const';

const meta = {
  component: RecipeMetaInfo,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof RecipeMetaInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    image: {
      src: IMAGES[0],
    },
    recipeName: 'おいしいレシピ',
    recipeId: 'recipe-1',
    // deliciousCount: 10,
    // totalView: 1234,
    recipeDescription:
      'とてもおいしい料理です。簡単に作れて、栄養もたっぷり。家族みんなで楽しめます。',
    recipeTags: [
      { id: '1', name: '和食' },
      { id: '2', name: '魚料理' },
      { id: '3', name: '簡単' },
    ],
  },
};
