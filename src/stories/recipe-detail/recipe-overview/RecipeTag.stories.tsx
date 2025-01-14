import type { Meta, StoryObj } from '@storybook/react';

import { RecipeTag } from '@/components/recipe-detail/recipe-overview/RecipeTag';

const meta = {
  component: RecipeTag,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof RecipeTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: 'たけのこ',
  },
};
