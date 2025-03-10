import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function UserGreeting() {
  const router = useRouter();

  return (
    <div className='mb-8'>
      <h1 className='text-2xl font-bold mb-4'>マイページ</h1>
      <div className='flex items-center justify-between'>
        <p className='text-lg'>こんにちは、ゲストさん</p>
        <Button variant='default' onClick={() => router.push('/login')}>
          ログイン
        </Button>
      </div>
    </div>
  );
}
