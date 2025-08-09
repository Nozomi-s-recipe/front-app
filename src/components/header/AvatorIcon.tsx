import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@supabase/supabase-js';
import { UserCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

interface AvatarIconProps {
  user: User | null;
}
export function AvatarIcon({ user }: AvatarIconProps) {
  return (
    <Link href='/mypage'>
      <Button variant='ghost' className='opacity-100' size='icon'>
        {user ? (
          <Avatar>
            <AvatarImage src={user.user_metadata.avatar_url} />
            <AvatarFallback>
              {user.user_metadata.name?.charAt(0) || 'CN'}
            </AvatarFallback>
          </Avatar>
        ) : (
          <Avatar>
            <AvatarFallback>
              <UserCircle strokeWidth={1} className='h-8 w-8 !size-8' />
            </AvatarFallback>
          </Avatar>
        )}
      </Button>
    </Link>
  );
}
