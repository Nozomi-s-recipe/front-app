'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to detect when user has scrolled past a threshold
 * Used for sticky header state management
 *
 * @param threshold - Scroll position in pixels to trigger state change (default: 50)
 * @returns boolean indicating if scroll position is past threshold
 */
export const useScrolled = (threshold: number = 50): boolean => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Check if we're in browser environment
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setIsScrolled(scrollY > threshold);
    };

    // Check initial state
    handleScroll();

    // Add scroll listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup listener on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
};
