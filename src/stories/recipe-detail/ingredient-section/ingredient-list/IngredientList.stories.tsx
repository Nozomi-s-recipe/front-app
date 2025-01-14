import type { Meta, StoryObj } from '@storybook/react';

import { IngredientList } from '@/components/recipe-detail/ingredient-section/ingredient-list/IngredientList';
import { ServingsProvider } from '@/components/recipe-detail/ingredient-section/recipe-stats/servings.context';

const meta = {
  component: IngredientList,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof IngredientList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    ingredients: [
      {
        name: 'りんご',
        quantity: 100,
        unit: {
          name: 'g',
          position: 'suffix',
        },
      },
      {
        name: 'りんご',
        quantity: 100,
        unit: {
          name: 'g',
          position: 'suffix',
        },
      },
      {
        name: 'りんご',
        quantity: 100,
        unit: {
          name: 'g',
          position: 'suffix',
        },
      },
    ],
    seasonings: [
      {
        name: '醤油',
        quantity: 1,
        unit: {
          name: '大さじ',
          position: 'prefix',
        },
      },
      {
        name: '醤油',
        quantity: 1,
        unit: {
          name: '大さじ',
          position: 'prefix',
        },
      },
      {
        name: '醤油',
        quantity: 1,
        unit: {
          name: '大さじ',
          position: 'prefix',
        },
      },
    ],
  },
  decorators: [
    (Story) => (
      <ServingsProvider>
        <Story />
      </ServingsProvider>
    ),
  ],
};
