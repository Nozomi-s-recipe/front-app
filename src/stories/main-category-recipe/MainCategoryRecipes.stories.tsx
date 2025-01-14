import { MainCategoryRecipes } from '@/components/main-category-recipe/MainCategoryRecipes';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: MainCategoryRecipes,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof MainCategoryRecipes>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShortText: Story = {
  args: {
    mainCategory: {
      name: '和食',
      id: 'japanese',
    },
    largeRecipe: {
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
    smallRecipe: {
      image: {
        src: 'https://images.microcms-assets.io/assets/888d632d12c2409a941139ea8e9d5adc/3a56446bc7714cb2ad416b8935820478/chinese-dunpling.jpg',
        alt: 'recipe',
      },
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
    showMoreRecipe: {
      image: {
        src: 'https://images.microcms-assets.io/assets/888d632d12c2409a941139ea8e9d5adc/3a56446bc7714cb2ad416b8935820478/chinese-dunpling.jpg',
        alt: 'recipe',
      },
      mainCategory: {
        id: 'japanese',
        name: '和食',
      },
      color: 'secondary-B',
    },
  },
};
