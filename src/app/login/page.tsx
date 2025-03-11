import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login, signup } from './actions';
import GoogleSignIn from './GoogleSignIn';

export default function LoginPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)] space-y-6'>
      <div className='max-w-[350px] w-full mb-2'>
        <h2 className='text-lg font-semibold mb-2'>ログインの特典</h2>
        <ul className='text-muted-foreground text-sm list-disc ml-5 mb-3'>
          <li>お気に入り上限が10件→30件に</li>
          <li>別のブラウザでも同じお気に入りを表示</li>
        </ul>
      </div>

      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>アカウント</CardTitle>
          <CardDescription>ログインまたは新規登録してください</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex justify-center'>
            <GoogleSignIn />
          </div>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                または
              </span>
            </div>
          </div>
          <form className='space-y-4'>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='email'>メールアドレス</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='your@email.com'
                  required
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='password'>パスワード</Label>
                <Input id='password' name='password' type='password' required />
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='flex flex-col justify-end'>
                <Button formAction={login} variant='default'>
                  ログイン
                </Button>
              </div>
              <div className='flex flex-col items-end gap-1'>
                <p className='text-xs font-medium text-primary flex items-center gap-1'>
                  <span>＼</span>
                  <span>1分で完了</span>
                  <span>／</span>
                </p>
                <Button formAction={signup} variant='secondary'>
                  新規登録
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
