import type { Meta, StoryObj } from '@storybook/react';

import { DeliciousFace } from '@/components/recipe-detail/user-feedback/DeliciousFace';

const meta = {
  component: DeliciousFace,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'auto',
  },
} satisfies Meta<typeof DeliciousFace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    width: 40,
    height: 40,
  },
};
