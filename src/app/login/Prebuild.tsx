'use client';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// グローバルな型定義を追加
// declare global {
//   interface Window {
//     handleSignInWithGoogle: (response: GoogleResponse) => Promise<void>;
//   }
// }

interface GoogleResponse {
  credential: string;
}

export const PrebuildLogin = () => {
  const router = useRouter();

  // コンポーネントがマウントされる時にコールバックを設定
  useEffect(() => {
    window.handleSignInWithGoogle = async (response: GoogleResponse) => {
      const supabase = createClient();

      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
      });

      console.log(data);
      router.refresh();
      router.push('/account'); // ログイン後のリダイレクト先

      console.log(error);
    };

    // クリーンアップ関数
    return () => {
      delete window.handleSignInWithGoogle;
    };
  }, []);

  return (
    <>
      <div
        id='g_id_onload'
        data-client_id='8278001770-9qu0pinego6jr5ql8oqpin9q68qlkjs4.apps.googleusercontent.com'
        data-context='signin'
        data-ux_mode='popup'
        data-callback='handleSignInWithGoogle'
        data-itp_support='true'
        data-use_fedcm_for_prompt='true'
      ></div>

      <div
        className='g_id_signin'
        data-type='standard'
        data-shape='pill'
        data-theme='outline'
        data-text='signin_with'
        data-size='large'
        data-logo_alignment='left'
      ></div>
    </>
  );
};
