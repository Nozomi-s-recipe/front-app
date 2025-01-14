'use client';
import { useEffect, useState } from 'react';

export const CookingSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

  useEffect(() => {
    const handleWakeLock = async () => {
      if (isChecked) {
        try {
          // 画面をロックしないようにする
          const lock = await navigator.wakeLock?.request('screen');
          if (lock) {
            setWakeLock(lock);
          }
        } catch (err) {
          console.error('Wake Lock APIの要求に失敗:', err);
        }
      } else {
        // ロック解除
        if (wakeLock) {
          await wakeLock.release();
          setWakeLock(null);
        }
      }
    };

    // Wake Lock APIのサポートチェック
    if ('wakeLock' in navigator) {
      handleWakeLock();
    } else {
      console.error('Browser does not support wakeLock api.');
    }

    // クリーンアップ
    return () => {
      if (wakeLock) {
        wakeLock.release().catch(console.error);
      }
    };
  }, [isChecked, wakeLock]);

  return (
    <label className='relative inline-block w-16 h-8 cursor-pointer'>
      <input
        type='checkbox'
        className='sr-only'
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
        role='switch'
        aria-checked={isChecked}
        aria-label='調理状態の切り替え'
        aria-describedby='cooking-description'
        id='cooking-switch'
      />
      <div
        className={`
        w-full h-full rounded-full
        border border-gray-200
        transition-all duration-300
        ${isChecked ? 'bg-base-white' : 'bg-[#E5E5E5]'}
      `}
      >
        <div
          className={`
          absolute top-1 left-1
          w-6 h-6 rounded-full
          transition-all duration-300
          ${isChecked ? 'bg-primary' : 'bg-[#107480]'}
          ${isChecked ? 'translate-x-8' : 'translate-x-0'}
        `}
          aria-hidden='true'
        />
      </div>
    </label>
  );
};
