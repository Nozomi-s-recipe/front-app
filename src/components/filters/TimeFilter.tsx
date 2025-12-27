/**
 * Time filter component with radio group UI
 * Implementation for T011, optimized with React.memo for T065
 *
 * @see specs/001-recipe-filter/quickstart.md
 */

'use client';

import { memo } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { TIME_FILTER_OPTIONS } from '@/lib/filters/filterTypes';
import type { TimeRange } from '@/lib/filters/filterTypes';

interface TimeFilterProps {
  value?: TimeRange;
  onChange: (value: TimeRange | undefined) => void;
}

export const TimeFilter = memo(function TimeFilter({
  value,
  onChange,
}: TimeFilterProps) {
  return (
    <div className='space-y-3' role='group' aria-label='調理時間フィルター'>
      <h3 className='font-semibold text-sm'>調理時間</h3>
      <RadioGroup value={value} onValueChange={(v) => onChange(v as TimeRange)}>
        {TIME_FILTER_OPTIONS.map((option) => (
          <div key={option.value} className='flex items-center space-x-2'>
            <RadioGroupItem
              value={option.value}
              id={`time-${option.value}`}
              aria-label={option.label}
            />
            <Label
              htmlFor={`time-${option.value}`}
              className='cursor-pointer text-sm font-normal'
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {value && (
        <button
          onClick={() => onChange(undefined)}
          className='text-sm text-muted-foreground hover:text-foreground underline'
          aria-label='調理時間フィルターをクリア'
        >
          クリア
        </button>
      )}
    </div>
  );
});
