/**
 * Filter section wrapper component
 * Implementation for T012
 *
 * Provides consistent styling for filter sections
 */

'use client';

import { ReactNode } from 'react';
import { Separator } from '@/components/ui/separator';

interface FilterSectionProps {
  children: ReactNode;
  className?: string;
}

export function FilterSection({
  children,
  className = '',
}: FilterSectionProps) {
  return (
    <>
      <div className={`py-4 ${className}`}>{children}</div>
      <Separator />
    </>
  );
}
