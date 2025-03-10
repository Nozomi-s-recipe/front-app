'use server';

export async function signOut() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/auth/signout`, {
    method: 'POST',
  });

  if (!res.ok) {
    throw new Error('サインアウトに失敗しました');
  }
}
