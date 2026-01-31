'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

type CookingStep = {
  name: string;
  description: string;
  image: {
    url: string;
    width?: number;
    height?: number;
  };
  tips?: string;
};

type CookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  cookingSteps: CookingStep[];
};

export const CookingModal = ({
  isOpen,
  onClose,
  cookingSteps,
}: CookingModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

  // Wake Lock API - 画面が自動で消えないようにする
  useEffect(() => {
    const requestWakeLock = async () => {
      if ('wakeLock' in navigator && isOpen) {
        try {
          const lock = await navigator.wakeLock.request('screen');
          setWakeLock(lock);
          console.log('Wake Lock activated');
        } catch (err) {
          console.log('Wake Lock not supported or failed:', err);
        }
      }
    };

    const releaseWakeLock = async () => {
      if (wakeLock) {
        try {
          await wakeLock.release();
          setWakeLock(null);
          console.log('Wake Lock released');
        } catch (err) {
          console.log('Wake Lock release failed:', err);
        }
      }
    };

    if (isOpen) {
      requestWakeLock();
      document.body.style.overflow = 'hidden';
    } else {
      releaseWakeLock();
      document.body.style.overflow = '';
    }

    return () => {
      releaseWakeLock();
      document.body.style.overflow = '';
    };
  }, [isOpen, wakeLock]);

  // ステップが変わったときにリセット
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < cookingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  const step = cookingSteps[currentStep];
  const progress = ((currentStep + 1) / cookingSteps.length) * 100;

  return (
    <div className='fixed inset-0 bg-black/95 z-[1000] flex flex-col'>
      {/* Header */}
      <header className='p-5 flex items-center justify-between'>
        <div className='text-sm text-white/60'>
          Step {currentStep + 1} / {cookingSteps.length}
        </div>
        <button
          onClick={onClose}
          className='w-11 h-11 bg-white/10 border-none rounded-full cursor-pointer flex items-center justify-center hover:bg-white/20 transition-colors'
          aria-label='閉じる'
        >
          <X className='w-6 h-6 text-white' strokeWidth={2} />
        </button>
      </header>

      {/* Progress Bar */}
      <div className='h-0.5 bg-white/10 mx-6 rounded-full overflow-hidden'>
        <div
          className='h-full bg-white transition-all duration-300 ease-out'
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Content */}
      <div className='flex-1 flex flex-col justify-center p-6 overflow-y-auto'>
        {step.image && (
          <div className='w-full aspect-[4/3] rounded-[20px] overflow-hidden mb-8'>
            <Image
              src={`${step.image.url}?w=800&h=600&q=85&fit=crop&fm=webp`}
              alt={step.name}
              width={800}
              height={600}
              className='w-full h-full object-cover'
            />
          </div>
        )}

        <div className='text-sm font-medium text-white/50 mb-2'>
          {step.name}
        </div>
        <p className='text-xl text-white leading-relaxed mb-5'>
          {step.description}
        </p>

        {step.tips && (
          <div className='py-4 px-4 bg-white/8 rounded-xl text-sm text-white/70 leading-relaxed'>
            💡 {step.tips}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className='p-6 flex gap-3'>
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className='flex-1 py-[18px] rounded-full text-[15px] font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 bg-white/10 border-none text-white hover:scale-[1.02] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100'
        >
          <ChevronLeft className='w-5 h-5' />
          前へ
        </button>
        <button
          onClick={handleNext}
          className='flex-1 py-[18px] rounded-full text-[15px] font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 bg-white border-none text-[#1a2e28] hover:scale-[1.02]'
        >
          {currentStep === cookingSteps.length - 1 ? (
            <>完了 ✓</>
          ) : (
            <>
              次へ
              <ChevronRight className='w-5 h-5' />
            </>
          )}
        </button>
      </nav>
    </div>
  );
};
