'use server';

import { createClient } from '@/utils/supabase/server';

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    // password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/new-password`,
  });

  if (error) {
    console.error(error);
    return;
  }
}
