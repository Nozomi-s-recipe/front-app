import { type NextRequest } from 'next/server';
import { updateSession } from './utils/supabase/middleware';

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // proxyを実行するパスを指定
  matcher: ['/account', '/mypage', '/auth'],
};
