import { LargeRecipeCard } from '@/components/main-category-recipe/LargeRecipeCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: LargeRecipeCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof LargeRecipeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShortText: Story = {
  args: {
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
};

export const LongText: Story = {
  args: {
    image: {
      src: 'https://images.microcms-assets.io/assets/888d632d12c2409a941139ea8e9d5adc/3a56446bc7714cb2ad416b8935820478/chinese-dunpling.jpg',
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
