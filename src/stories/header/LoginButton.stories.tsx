import type { Meta, StoryObj } from '@storybook/react';

import { LoginButton } from '@/components/header/LoginButton';

const meta = {
  component: LoginButton,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof LoginButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    imageSrc: 'https://github.com/shadcn.png',
    linkTo: 'login',
  },
};
