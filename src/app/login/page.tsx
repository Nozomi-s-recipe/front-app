import LoginContent from './LoginContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "ログイン | Nozomi's Recipes",
  description: 'ログインページ',
};

export default function LoginPage() {
  return <LoginContent />;
}
