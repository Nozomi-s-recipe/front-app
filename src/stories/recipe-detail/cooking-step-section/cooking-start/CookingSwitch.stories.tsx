import type { Meta, StoryObj } from '@storybook/react';

import { CookingSwitch } from '@/components/recipe-detail/cooking-step-section/cooking-start/CookingSwitch';

const meta = {
  component: CookingSwitch,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'auto',
  },
} satisfies Meta<typeof CookingSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    index: 1,
    image: {
      src: 'https://images.microcms-assets.io/assets/888d632d12c2409a941139ea8e9d5adc/3a56446bc7714cb2ad416b8935820478/chinese-dunpling.jpg',
      alt: 'recipe',
    },
    title: '下ごしらえ',
    description:
      'あああああああああああああああああああああああああああああああああああああああああああああああああああ',
    point: 'おおおおおおおおおおおおおおおおおおおおおおおおおお',
  },
};
