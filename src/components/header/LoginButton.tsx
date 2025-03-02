import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CircleUserRound } from 'lucide-react';
import Link from 'next/link';

type LoginButtonProps = Readonly<{
  imageSrc?: string;
  linkTo: 'login' | 'account';
}>;

export const LoginButton = ({
  imageSrc,
  linkTo = 'login',
}: LoginButtonProps) => {
  return (
    <Link href={`/${linkTo}`}>
      <Button variant='ghost' size='icon' aria-label='ログイン'>
        <Avatar className='h-12 w-12'>
          <AvatarImage src={imageSrc} alt='ユーザーアバター' />
          <AvatarFallback>
            <CircleUserRound size={48} />
          </AvatarFallback>
        </Avatar>
      </Button>
    </Link>
  );
};
