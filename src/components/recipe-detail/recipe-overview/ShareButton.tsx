'use client';

import { Button } from '@/components/ui/button';
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

  // URLが取得できるまでは表示しない
  if (!pageUrl) return null;

  return (
    <div className='flex items-center gap-2'>
      <TwitterShareButton url={pageUrl} title={pageTitle}>
        <XIcon size={32} round />
      </TwitterShareButton>

      <LineShareButton url={pageUrl} title={pageTitle}>
        <LineIcon size={32} round />
      </LineShareButton>

      <Button
        variant='outline'
        size='icon'
        className='w-8 h-8 rounded-full'
        onClick={handleCopyLink}
      >
        <Link className='w-4 h-4' />
      </Button>
    </div>
  );
};

export default ShareButtons;
