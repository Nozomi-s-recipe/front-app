import type { Meta, StoryObj } from '@storybook/react';

import { Calorie } from '@/components/recipe-detail/ingredient-section/recipe-stats/Calorie';

const meta = {
  component: Calorie,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Calorie>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    calories: 4398,
  },
};
