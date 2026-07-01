import spriteUrl from '../../img/sprite.svg?url';
import exercisePlaceholderUrl from '../../img/placeholders/exercise.svg?url';

export const API_BASE_URL = 'https://your-energy.b.goit.study/api';

export const FILTERS = Object.freeze({
  MUSCLES: 'Muscles',
  BODY_PARTS: 'Body parts',
  EQUIPMENT: 'Equipment',
});

export const STORAGE_KEYS = Object.freeze({
  FAVORITES: 'your-energy-favorites',
  QUOTE: 'your-energy-daily-quote',
});

export const DEFAULT_ERROR_MESSAGE =
  'Something went wrong. Please try again later.';

export const SPRITE_URL = spriteUrl;
export const PLACEHOLDER_EXERCISE_IMAGE = exercisePlaceholderUrl;
