import type { Meta, StoryObj } from '@storybook/react';

import { NumericalDisplay } from '@/components/recipe-detail/ingredient-section/recipe-stats/NumericalDisplay';

const meta = {
  component: NumericalDisplay,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof NumericalDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Calorie: Story = {
  args: {
    value: 2345,
    title: 'カロリー(1人)',
    unit: 'kcal',
    minWidth: '5ch', // 区切り文字の文も含める
  },
};

export const CookingTime: Story = {
  args: {
    value: 30,
    title: '時間',
    unit: '分',
    minWidth: '3ch', // 区切り文字の文も含める
  },
};
