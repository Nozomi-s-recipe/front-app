'use client';

import GoogleSignIn from './GoogleSignIn';

export default function LoginContent() {
  return (
    <div className='min-h-screen flex justify-center items-center p-5 relative overflow-hidden bg-gradient-to-b from-[#faf8f5] via-[#faf8f5] via-50% to-[#c8b898]'>
      {/* Background overlay gradients */}
      <div className='absolute bottom-0 left-0 right-0 h-[45%] pointer-events-none bg-[radial-gradient(ellipse_120%_80%_at_50%_100%,rgba(168,213,186,0.6)_0%,rgba(212,232,220,0.4)_30%,rgba(253,246,232,0.2)_60%,transparent_80%)]' />
      <div className='absolute bottom-0 left-0 right-0 h-[35%] pointer-events-none bg-[radial-gradient(ellipse_100%_60%_at_50%_100%,rgba(45,90,39,0.15)_0%,rgba(74,140,63,0.1)_40%,transparent_70%)]' />

      <div className='w-full max-w-[400px] text-center relative z-10'>
        {/* ロゴ */}
        <div className='w-[72px] h-[72px] mx-auto mb-10 flex items-center justify-center text-5xl animate-fadeInUp'>
          🍳
        </div>

        {/* メインコピー */}
        <h1 className='font-crimson text-4xl sm:text-[36px] font-semibold leading-[1.4] text-[#1a1a1a] mb-[60px] tracking-[0.02em] opacity-0 animate-[fadeInUp_0.6s_ease_0.1s_forwards]'>
          レシピを保存しよう。
        </h1>

        {/* 認証ボタン */}
        <div className='flex flex-col gap-4 mb-10 opacity-0 animate-[fadeInUp_0.6s_ease_0.2s_forwards]'>
          <GoogleSignIn />
        </div>

        {/* 注意書き */}
        <p className='text-[13px] text-[#888] opacity-0 animate-[fadeInUp_0.6s_ease_0.3s_forwards]'>
          初めての方は自動でアカウントが作成されます
        </p>
      </div>
    </div>
  );
}
