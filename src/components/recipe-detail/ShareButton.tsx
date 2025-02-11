'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'lucide-react';
import {
  LineIcon,
  LineShareButton,
  TwitterShareButton,
  XIcon,
} from 'react-share';

const ShareButtons = ({
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = typeof window !== 'undefined' ? document.title : '',
}) => {
  const { toast } = useToast();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast({
        description: 'リンクをコピーしました',
        duration: 2000,
      });
    });
  };

  return (
    <div className='flex items-center gap-2'>
      <TwitterShareButton url={url} title={title}>
        <XIcon size={32} round />
      </TwitterShareButton>

      <LineShareButton url={url} title={title}>
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
