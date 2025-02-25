'use client';

import { createClient } from '@/utils/supabase/client';
import { getUserData, UserProfile } from '@/utils/supabase/utils';
import { User } from '@supabase/supabase-js';
import { useCallback, useEffect, useState } from 'react';
import { LoginButton } from './LoginButton';

export const LoginButtonContainer = ({ user }: { user: User | null }) => {
  console.log('user', user);

  const supabase = createClient();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const getUserProfile = useCallback(async () => {
    const userProfile = await getUserData(supabase);
    setUserProfile(userProfile);
  }, [supabase]);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  if (userProfile) {
    return (
      <LoginButton
        linkTo='account'
        imageSrc={userProfile.avatar ? userProfile.avatar : undefined}
      />
    );
  }
  return <LoginButton linkTo='login' />;
};
