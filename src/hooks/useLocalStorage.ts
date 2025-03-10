'use client';

import { useEffect, useState } from 'react';

export interface FavoriteRecipe {
  recipeId: string;
  savedAt: string;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  // 初期値の読み込みを1回だけ行う
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // 値の更新時のみローカルストレージに保存
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
