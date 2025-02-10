import { RecipePreview } from '@/components/recipe-preview/RecipePreview';
import type { Meta, StoryObj } from '@storybook/react';
import { IMAGES } from '../const';

const meta = {
  component: RecipePreview,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof RecipePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    image: {
      src: IMAGES[0],
      alt: 'recipe',
    },
    recipeName: '【バター不使用】鱈のムニエル - 彩りラタトゥイユソース添え -',
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
};
