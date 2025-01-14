import type { Meta, StoryObj } from '@storybook/react';

import { MenuProvider } from '@/components/header/menu.context';
import { SubCategoryItem } from '@/components/side-menu/SubCategoryItem';

const meta = {
  component: SubCategoryItem,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SubCategoryItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: 'ご飯もの',
    totalCount: 4,
    urlPath: {
      mainCategory: 'japanese',
      subCategory: 'soup',
    },
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
