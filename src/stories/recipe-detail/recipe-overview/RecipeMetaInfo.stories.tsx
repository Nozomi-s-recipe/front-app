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
    recipeName: '炊き込みご飯',
    deliciousCount: 10,
    totalView: 1234,
    recipeDescription:
      'レシピの説明文ですああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ',
    recipeTags: [
      {
        id: '1',
        name: 'たけのこ',
      },
      {
        id: '2',
        name: '鍋1つ',
      },
      {
        id: '3',
        name: 'ヘルシー',
      },
    ],
  },
};
