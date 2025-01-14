import { logger } from '@storybook/client-logger';
import type { Preview } from '@storybook/react';
import React from 'react';
import { shipporiAntique, shipporiMincho } from '../src/app/font';
import '../src/app/globals.css';
import { titleFromPath } from './utils/titleFormPath';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        className={`${shipporiMincho.variable} ${shipporiAntique.variable} antialiased`}
      >
        <Story />
      </div>
    ),
    (Story, context) => {
      // タイトルが明示的に設定されていない場合は、パスから自動生成
      if (!context.title) {
        logger.warn('context.id: ', context.id);
        context.title = titleFromPath(context.id);
      }
      return Story();
    },
  ],
};

export default preview;
