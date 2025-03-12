'use client';

import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ScrollToIngredientsButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 材料セクションの位置を超えたらボタンを表示
      const ingredientSection = document.getElementById('ingredient-section');
      if (ingredientSection) {
        const position = ingredientSection.getBoundingClientRect().top;
        setIsVisible(position < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToIngredients = () => {
    const ingredientSection = document.getElementById('ingredient-section');
    if (ingredientSection) {
      ingredientSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <Button
      variant='secondary'
      size='icon'
      className='fixed bottom-6 right-6 rounded-full shadow-md z-50 h-12 w-12'
      onClick={scrollToIngredients}
      aria-label='材料セクションに戻る'
    >
      <ArrowUp className='h-6 w-6' />
    </Button>
  );
};
