import { RecipeCard } from '@/components/main-category-recipe/RecipeCard';
import type { Meta, StoryObj } from '@storybook/react';
import { IMAGES } from '../const';

const meta = {
  component: RecipeCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof RecipeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShortText: Story = {
  args: {
    image: {
      src: IMAGES[0],
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
};

export const LongText: Story = {
  args: {
    image: {
      src: IMAGES[0],
      alt: 'recipe',
    },
    recipeName:
      '伝統の技法で！じっくり低温調理した国産牛ほほ肉の赤ワイン煮込み 〜季節の根菜添え 特製デミグラスソース〜',
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

export const SmallImage: Story = {
  args: {
    image: {
      src: IMAGES[0],
      alt: 'recipe',
    },
    recipeName:
      '伝統の技法で！じっくり低温調理した国産牛ほほ肉の赤ワイン煮込み 〜季節の根菜添え 特製デミグラスソース〜',
    recipeId: 'idxxx',
    mainCategory: {
      id: 'japanese',
      name: '和食',
    },
    subCategory: {
      id: 'japanese',
      name: '和食',
    },
    width: 144,
    height: 100,
    captionSize: 'sm',
  },
};
