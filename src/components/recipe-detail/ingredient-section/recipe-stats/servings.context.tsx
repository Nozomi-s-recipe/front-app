'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

// Context の型定義
interface ServingsContextType {
  servings: number;
  setServings: (servings: number) => void;
  incrementServings: () => void;
  decrementServings: () => void;
}

// Context の作成（初期値として null! を使用）
const ServingsContext = createContext<ServingsContextType | undefined>(
  undefined
);

// Provider Props の型定義
interface ServingsProviderProps {
  children: ReactNode;
}

// Context Provider コンポーネント
export const ServingsProvider = ({ children }: ServingsProviderProps) => {
  const [servings, setServings] = useState<number>(2); // デフォルト4人分

  const incrementServings = () => setServings((prev) => prev + 1);
  const decrementServings = () =>
    setServings((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <ServingsContext.Provider
      value={{
        servings,
        setServings,
        incrementServings,
        decrementServings,
      }}
    >
      {children}
    </ServingsContext.Provider>
  );
};

// カスタムフック（Context を使用する際の型安全なヘルパー）
export const useServings = () => {
  const context = useContext(ServingsContext);
  if (context === undefined) {
    throw new Error('useServings must be used within a ServingsProvider');
  }
  return context;
};
