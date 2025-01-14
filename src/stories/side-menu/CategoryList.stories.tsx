import type { Meta, StoryObj } from '@storybook/react';

import { MenuProvider } from '@/components/header/menu.context';
import { CategoryList } from '@/components/side-menu/CategoryList';

const meta = {
  component: CategoryList,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CategoryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    mainCategoryName: '和食',
    subCategories: [
      {
        name: 'ご飯もの',
        totalCount: 6,
        urlPath: {
          mainCategory: 'japanese',
          subCategory: 'soup',
        },
      },
      {
        name: '焼き物',
        totalCount: 6,
        urlPath: {
          mainCategory: 'japanese',
          subCategory: 'soup',
        },
      },
      {
        name: '汁物',
        totalCount: 6,
        urlPath: {
          mainCategory: 'japanese',
          subCategory: 'soup',
        },
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className='bg-primary'>
        <MenuProvider>
          <Story />
        </MenuProvider>
      </div>
    ),
  ],
};
