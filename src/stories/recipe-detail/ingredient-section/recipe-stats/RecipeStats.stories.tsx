import type { Meta, StoryObj } from '@storybook/react';

import { RecipeStats } from '@/components/recipe-detail/ingredient-section/recipe-stats/RecipeStats';
import { ServingsProvider } from '@/components/recipe-detail/ingredient-section/recipe-stats/servings.context';

const meta = {
  component: RecipeStats,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof RecipeStats>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    calories: 1234,
    cookingTime: 30,
  },
  decorators: [
    (Story) => (
      <ServingsProvider>
        <Story />
      </ServingsProvider>
    ),
  ],
};
