import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { MenuHeader } from '@/components/header/MenuHeader';

const meta = {
  component: MenuHeader,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
} satisfies Meta<typeof MenuHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
  decorators: [
    (Story) => (
      <div className=''>
        <Story />
      </div>
    ),
  ],
};
