/**
 * Genre/Category filter component with multi-select checkboxes
 * Implementation for T021
 *
 * @see specs/001-recipe-filter/quickstart.md
 */

'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { Genre } from '@/lib/filters/filterTypes';

interface GenreFilterProps {
  /** Available genres for filtering */
  genres: Genre[];
  /** Currently selected genre IDs */
  selectedGenres: string[];
  /** Callback when genre selection changes */
  onChange: (genreIds: string[]) => void;
}

/**
 * Genre filter component with multi-select checkboxes
 * Uses OR logic - recipes matching ANY selected genre are shown
 */
export function GenreFilter({
  genres,
  selectedGenres,
  onChange,
}: GenreFilterProps) {
  /**
   * Handle individual genre checkbox toggle
   */
  const handleToggle = (genreId: string, checked: boolean) => {
    if (checked) {
      // Add genre to selection
      onChange([...selectedGenres, genreId]);
    } else {
      // Remove genre from selection
      onChange(selectedGenres.filter((id) => id !== genreId));
    }
  };

  return (
    <div className='space-y-3'>
      <h3 className='font-semibold text-sm'>ジャンル</h3>
      <div className='space-y-2' role='group' aria-label='ジャンルフィルター'>
        {genres.map((genre) => {
          const isChecked = selectedGenres.includes(genre.id);
          return (
            <div key={genre.id} className='flex items-center space-x-2'>
              <Checkbox
                id={`genre-${genre.id}`}
                checked={isChecked}
                onCheckedChange={(checked) =>
                  handleToggle(genre.id, checked as boolean)
                }
                aria-label={`${genre.name}でフィルター`}
                aria-checked={isChecked}
              />
              <Label
                htmlFor={`genre-${genre.id}`}
                className='cursor-pointer text-sm font-normal'
              >
                {genre.name}
              </Label>
            </div>
          );
        })}
      </div>
      {selectedGenres.length > 0 && (
        <button
          onClick={() => onChange([])}
          className='text-sm text-muted-foreground hover:text-foreground transition-colors'
          aria-label='ジャンルフィルターをクリア'
        >
          クリア
        </button>
      )}
    </div>
  );
}
