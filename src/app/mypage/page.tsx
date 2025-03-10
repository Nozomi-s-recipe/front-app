import { FavoriteRecipes } from '@/components/mypage/FavoriteRecipes';
import { UserGreeting } from '@/components/mypage/UserGreeting';
import { createClient } from '@/utils/supabase/server';

export default async function MyPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log('mypage', user);

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <UserGreeting user={user} />
      <FavoriteRecipes />
    </div>
  );
}
