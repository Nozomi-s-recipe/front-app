import { createClient } from '@/utils/supabase/server';
import AccountForm from './account-form';

// Force dynamic rendering since this page uses cookies
export const dynamic = 'force-dynamic';

export default async function Account() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <AccountForm user={user} />;
}
