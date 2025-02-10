'use client';

import {
  incrementDeliciousCount,
  incrementEnhancementRequestCount,
} from '@/actions/feedback';
import { useState } from 'react';
import { ConfusedFace } from './ConfusedFace';
import { DeliciousFace } from './DeliciousFace';

type UserFeedbackProps = {
  recipeId: string;
};

type FeedbackAction = {
  action: (recipeId: string) => Promise<{ success: boolean }>;
  successMessage: string;
};

const FEEDBACK_ACTIONS: Record<'delicious' | 'confused', FeedbackAction> = {
  delicious: {
    action: incrementDeliciousCount,
    successMessage: 'ありがとうございます！',
  },
  confused: {
    action: incrementEnhancementRequestCount,
    successMessage: 'フィードバックありがとうございます。',
  },
};

export const UserFeedback = ({ recipeId }: UserFeedbackProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  const handleFeedback = async (
    feedbackType: keyof typeof FEEDBACK_ACTIONS
  ) => {
    if (isSubmitting || hasSubmitted) return;

    const { action, successMessage } = FEEDBACK_ACTIONS[feedbackType];

    try {
      setIsSubmitting(true);
      setFeedbackMessage('送信中...');

      const result = await action(recipeId);

      if (result.success) {
        setHasSubmitted(true);
        setFeedbackMessage(successMessage);
      } else {
        setFeedbackMessage('送信に失敗しました。もう一度お試しください。');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className='flex flex-col items-center p-1 space-y-4 border-2 border-accent'
      aria-label='フィードバック'
    >
      <h2 className='tracking-tighter '>
        いかがでしたか？ぜひ感想をお聞かせください。
      </h2>
      <div
        className='flex space-x-8'
        role='group'
        aria-label='フィードバックオプション'
      >
        <button
          type='button'
          className={`flex flex-col items-center ${
            hasSubmitted ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'
          }`}
          aria-label='よかった'
          onClick={() => handleFeedback('delicious')}
          disabled={isSubmitting || hasSubmitted}
        >
          <DeliciousFace width={32} height={32} aria-hidden='true' />
          <span className=''>よかった</span>
        </button>
        <button
          type='button'
          className={`flex flex-col items-center ${
            hasSubmitted ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'
          }`}
          aria-label='うーん'
          onClick={() => handleFeedback('confused')}
          disabled={isSubmitting || hasSubmitted}
        >
          <ConfusedFace width={32} height={32} aria-hidden='true' />
          <span className=''>うーん</span>
        </button>
      </div>
      {feedbackMessage && (
        <p className='text-sm text-center text-gray-600' role='status'>
          {feedbackMessage}
        </p>
      )}
    </section>
  );
};
