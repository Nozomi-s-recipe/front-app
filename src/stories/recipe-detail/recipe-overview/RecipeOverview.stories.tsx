import type { Meta, StoryObj } from '@storybook/react';

import { RecipeOverview } from '@/components/recipe-detail/recipe-overview/RecipeOverview';

const meta = {
  component: RecipeOverview,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'auto',
  },
} satisfies Meta<typeof RecipeOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    image: {
      src: 'https://images.microcms-assets.io/assets/888d632d12c2409a941139ea8e9d5adc/3a56446bc7714cb2ad416b8935820478/chinese-dunpling.jpg',
      alt: 'recipe',
    },
    recipeMetaInfo: {
      recipeName: '炊き込みご飯',
      deliciousCount: 10,
      totalView: 1234,
      recipeDescription:
        'レシピの説明文ですああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ',
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
  },
};
