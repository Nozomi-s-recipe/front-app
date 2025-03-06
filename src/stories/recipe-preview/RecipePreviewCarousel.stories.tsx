import type { Meta, StoryObj } from '@storybook/react';

import { RecipePreviewCarousel } from '@/components/recipe-preview/RecipePreviewCarousel';
import { IMAGES } from '../const';

const meta = {
  component: RecipePreviewCarousel,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof RecipePreviewCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: '新着レシピ',
    recipePreviews: [
      {
        image: {
          src: IMAGES[0],
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
        createdAt: '2025-03-05',
      },
      {
        image: {
          src: IMAGES[0],
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
        createdAt: '2025-03-05',
      },
      {
        image: {
          src: IMAGES[0],
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
        createdAt: '2025-03-05',
      },
    ],
  },
};
