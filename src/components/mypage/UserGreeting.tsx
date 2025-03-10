'use client';

import { Button } from '@/components/ui/button';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

interface UserGreetingProps {
  user: User | null;
}

export function UserGreeting({ user }: UserGreetingProps) {
  const router = useRouter();
  console.log('user greeting', user);

  return (
    <div className='mb-8'>
      <h1 className='text-2xl font-bold mb-4'>マイページ</h1>
      <div className='flex items-center justify-between'>
        <p className='text-lg'>
          こんにちは、
          {user ? `${user.user_metadata.name || user.email}さん` : 'ゲストさん'}
        </p>
        {user ? (
          <form action='/auth/signout' method='post'>
            <Button variant='default' type='submit'>
              ログアウト
            </Button>
          </form>
        ) : (
          <Button variant='default' onClick={() => router.push('/login')}>
            ログイン
          </Button>
        )}
      </div>
    </div>
  );
}
