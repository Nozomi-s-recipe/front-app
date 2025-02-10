import type { Meta, StoryObj } from '@storybook/react';

import { CookingStep } from '@/components/recipe-detail/cooking-step-section/cooking-step/CookingStep';
import { IMAGES } from '@/stories/const';

const meta = {
  component: CookingStep,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'auto',
  },
} satisfies Meta<typeof CookingStep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    index: 1,
    image: {
      src: IMAGES[0],
      alt: 'recipe',
    },
    title: '下ごしらえ',
    description:
      'あああああああああああああああああああああああああああああああああああああああああああああああああああ',
    point: 'おおおおおおおおおおおおおおおおおおおおおおおおおお',
  },
};
