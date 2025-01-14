import type { Meta, StoryObj } from '@storybook/react';

import { RecipePreviewList } from '@/components/recipe-preview/RecipePreviewList';

const meta = {
  component: RecipePreviewList,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof RecipePreviewList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    recipePreviews: [
      {
        image: {
          src: 'https://images.microcms-assets.io/assets/888d632d12c2409a941139ea8e9d5adc/3a56446bc7714cb2ad416b8935820478/chinese-dunpling.jpg',
          alt: 'recipe',
        },
        recipeName: '炊き込みご飯',
        cookingTime: 30,
        ingredientsCount: 10,
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
        cookingTime: 30,
        ingredientsCount: 10,
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
        cookingTime: 30,
        ingredientsCount: 10,
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
    category: {
      id: 'japanese',
      name: '和食',
    },
  },
};
