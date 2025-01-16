import type { Meta, StoryObj } from '@storybook/react';

import { RecommendedRecipes } from '@/components/recipe-detail/recipe-recommend/RecommendedRecipes';

const meta = {
  component: RecommendedRecipes,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'auto',
  },
} satisfies Meta<typeof RecommendedRecipes>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    recipes: [
      {
        image: {
          src: 'https://images.microcms-assets.io/assets/888d632d12c2409a941139ea8e9d5adc/3a56446bc7714cb2ad416b8935820478/chinese-dunpling.jpg',
          alt: 'recipe',
        },
        recipeName: '炊き込みご飯',
        recipeId: 'idxxx',
        mainCategory: {
          id: 'japanese',
          name: '和食',
        },
        subCategory: {
          id: 'japanese',
          name: '和食',
        },
      },
      {
        image: {
          src: 'https://images.microcms-assets.io/assets/888d632d12c2409a941139ea8e9d5adc/3a56446bc7714cb2ad416b8935820478/chinese-dunpling.jpg',
          alt: 'recipe',
        },
        recipeName: '炊き込みご飯',
        recipeId: 'idxxx',
        mainCategory: {
          id: 'japanese',
          name: '和食',
        },
        subCategory: {
          id: 'japanese',
          name: '和食',
        },
      },
      {
        image: {
          src: 'https://images.microcms-assets.io/assets/888d632d12c2409a941139ea8e9d5adc/3a56446bc7714cb2ad416b8935820478/chinese-dunpling.jpg',
          alt: 'recipe',
        },
        recipeName: '炊き込みご飯',
        recipeId: 'idxxx',
        mainCategory: {
          id: 'japanese',
          name: '和食',
        },
        subCategory: {
          id: 'japanese',
          name: '和食',
        },
      },
    ],
    mainCategory: {
      id: 'japanese',
      name: '和食',
    },
  },
};
