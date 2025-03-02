import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import Link from 'next/link';
import { LoginButtonContainer } from './LoginButton.container';

export const Header = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log('header component.');

  return (
    <header className='flex items-center justify-center bg-transparent shadow-sm'>
      <nav className='flex items-end justify-between w-full h-full max-w-sm px-2 pt-8 pb-4'>
        <Link href='/' aria-label='ホームへ戻る' prefetch={true}>
          <figure className='m-0'>
            <Image
              src='/service-logo.svg'
              alt='service logo'
              width={64}
              height={64}
              unoptimized
            />
          </figure>
        </Link>
        <LoginButtonContainer user={user} />
      </nav>
    </header>
  );
};
