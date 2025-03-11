import { type NextRequest } from 'next/server';
import { updateSession } from './utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // middlewareを実行するパスを指定
  matcher: ['/account', '/mypage', '/auth'],
};
