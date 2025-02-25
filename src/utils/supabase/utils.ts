import { SupabaseClient } from '@supabase/supabase-js';

export type UserProfile = {
  username: string;
  avatar: string | null;
};

// 純粋関数として各操作を分割
const getUser = async (supabase: SupabaseClient) => {
  const { data } = await supabase.auth.getUser();
  if (!data?.user) {
    throw new Error('User not found');
  }
  return data.user;
};

const getProfile = async (supabase: SupabaseClient, userId: string) => {
  const { data } = await supabase
    .from('profiles')
    .select('username, avatar_url')
    .eq('id', userId)
    .single();

  if (!data) {
    throw new Error('Profile not found');
  }
  return data;
};

const getAvatar = async (supabase: SupabaseClient, avatarUrl: string) => {
  const { data } = await supabase.storage.from('avatars').download(avatarUrl);
  return data;
};

// ファイルをURLに変換する関数 (副作用を分離) only available in the browser
const blobToUrl = (blob: Blob | null) =>
  blob ? URL.createObjectURL(blob) : null;

// メイン関数 - async/awaitによるデータフロー
export const getUserData = async (
  supabase: SupabaseClient
): Promise<UserProfile | null> => {
  try {
    const user = await getUser(supabase);
    const profile = await getProfile(supabase, user.id);
    const avatar = await getAvatar(supabase, profile.avatar_url);

    return {
      username: profile.username,
      avatar: blobToUrl(avatar),
    };
  } catch (error) {
    console.log('Error in user data flow:', error);
    return null;
  }
};
