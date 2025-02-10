'use client';

import { Switch } from '@/components/ui/switch';
import { useEffect, useState } from 'react';

export const CookingSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

  useEffect(() => {
    const handleWakeLock = async () => {
      if (isChecked) {
        try {
          const lock = await navigator.wakeLock?.request('screen');
          if (lock) {
            setWakeLock(lock);
          }
        } catch (err) {
          console.error('Wake Lock APIの要求に失敗:', err);
        }
      } else {
        if (wakeLock) {
          await wakeLock.release();
          setWakeLock(null);
        }
      }
    };

    if ('wakeLock' in navigator) {
      handleWakeLock();
    } else {
      console.error('Browser does not support wakeLock api.');
    }

    return () => {
      if (wakeLock) {
        wakeLock.release().catch(console.error);
      }
    };
  }, [isChecked, wakeLock]);

  return (
    <Switch
      checked={isChecked}
      onCheckedChange={setIsChecked}
      className='data-[state=checked]:bg-primary data-[state=unchecked]:bg-[#E5E5E5]'
      aria-label='調理状態の切り替え'
      id='cooking-switch'
    />
  );
};
