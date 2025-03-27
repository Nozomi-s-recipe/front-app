'use client';

import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';
import { useEffect, useState } from 'react';

// BeforeInstallPromptEventの型定義
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function InstallPrompt() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // ユーザーが以前に閉じたかどうかをローカルストレージから確認
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }

    const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      // ブラウザのデフォルトのインストールプロンプトを防止
      event.preventDefault();

      // イベントを保存
      setInstallPrompt(event);

      // インストールボタンを表示
      setIsVisible(true);

      console.log('beforeinstallprompt イベントが発火しました');
    };

    window.addEventListener(
      'beforeinstallprompt',
      handleBeforeInstallPrompt as EventListener
    );

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt as EventListener
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) {
      console.log('installPromptがnullです');
      return;
    }

    // インストールプロンプトを表示
    await installPrompt.prompt();

    // ユーザーの選択をログに出力
    const result = await installPrompt.userChoice;
    console.log(`インストールプロンプトの結果: ${result.outcome}`);

    // 状態をリセット
    setInstallPrompt(null);
    setIsVisible(false);
  };

  // アプリがインストールされたときのイベント
  useEffect(() => {
    const handleAppInstalled = (event: Event) => {
      console.log('アプリがインストールされました', event);
      setIsVisible(false);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    // ユーザーの選択をローカルストレージに保存
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <div className='fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg p-3 max-w-[240px] border border-gray-200'>
      <div className='flex justify-between items-start mb-2'>
        <h3 className='font-medium text-sm'>アプリをインストール</h3>
        <Button
          onClick={handleDismiss}
          variant='ghost'
          size='icon'
          className='h-6 w-6 -mt-1 -mr-1'
          aria-label='閉じる'
        >
          <X className='h-4 w-4' />
        </Button>
      </div>
      <p className='text-xs text-gray-600 mb-3'>
        ホーム画面に追加して、簡単にアクセス。
      </p>
      <Button
        onClick={handleInstallClick}
        className='w-full'
        variant='default'
        size='sm'
      >
        <Download className='mr-2 h-4 w-4' />
        インストール
      </Button>
    </div>
  );
}
