import type { Meta, StoryObj } from '@storybook/react';

import { RecipeDetailSkelton } from '@/components/recipe-detail/skelton/RecipeDetailSkelton';

const meta = {
  component: RecipeDetailSkelton,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'auto',
  },
} satisfies Meta<typeof RecipeDetailSkelton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
