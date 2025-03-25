'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  LineIcon,
  LineShareButton,
  TwitterShareButton,
  XIcon,
} from 'react-share';

const ShareButtons = () => {
  const { toast } = useToast();
  const [pageUrl, setPageUrl] = useState('');
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    // クライアントサイドでURLとタイトルを取得
    setPageUrl(window.location.href);
    setPageTitle(document.title);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
      toast({
        description: 'リンクをコピーしました',
        duration: 2000,
      });
    });
  };

  if (!pageUrl) {
    return (
      <div className='flex flex-col items-center gap-1'>
        <Skeleton className='h-4 w-24 mb-2' />
        <div className='flex items-center gap-2'>
          <Skeleton className='w-8 h-8 rounded-full' />
          <Skeleton className='w-8 h-8 rounded-full' />
          <Skeleton className='w-8 h-8 rounded-full' />
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center gap-1'>
      <p className='text-xs text-gray-500 pb-2'>\ レシピをシェア /</p>
      <div className='flex items-center gap-2'>
        <TwitterShareButton url={pageUrl} title={pageTitle}>
          <XIcon size={32} round className='cursor-pointer' />
        </TwitterShareButton>

        <LineShareButton url={pageUrl} title={pageTitle}>
          <LineIcon size={32} round className='cursor-pointer' />
        </LineShareButton>

        <Button
          variant='outline'
          size='icon'
          className='w-8 h-8 rounded-full cursor-pointer'
          onClick={handleCopyLink}
        >
          <Link className='w-4 h-4' />
        </Button>
      </div>
    </div>
  );
};

export default ShareButtons;
