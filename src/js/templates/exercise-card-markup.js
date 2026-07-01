import { SPRITE_URL, PLACEHOLDER_EXERCISE_IMAGE } from '../utils/constants.js';
import { escapeHtml, titleCase, clampRating, normalizeExercise } from '../utils/format.js';

function icon(name, width = 18, height = width) {
  return `<svg class="icon" width="${width}" height="${height}" aria-hidden="true"><use href="${SPRITE_URL}#icon-${name}"></use></svg>`;
}

function exerciseCardMarkup(rawExercise) {
  const exercise = normalizeExercise(rawExercise);
  const rating = clampRating(exercise.rating).toFixed(1);
  const imgSrc = exercise.gifUrl || PLACEHOLDER_EXERCISE_IMAGE;

  return `
    <li class="exercise-card" data-exercise-card="${escapeHtml(exercise.id)}">
      <div class="exercise-card__top">
        <div class="exercise-card__badge-row">
          <span class="exercise-card__badge">WORKOUT</span>
          <span class="exercise-card__rating">${rating}${icon('star', 14)}</span>
        </div>
        <button
          class="exercise-card__start"
          type="button"
          data-start-exercise="${escapeHtml(exercise.id)}"
          aria-label="Start ${escapeHtml(exercise.name)}"
        >
          Start ${icon('arrow-right', 18)}
        </button>
      </div>
      <div class="exercise-card__title-row">
        <span class="exercise-card__round-icon">${icon('running', 15)}</span>
        <h3 class="exercise-card__title">${escapeHtml(titleCase(exercise.name))}</h3>
      </div>
      <p class="exercise-card__meta">
        <span>Burned calories: <strong>${exercise.burnedCalories} / ${exercise.time} min</strong></span>
        <span>Body part: <strong>${escapeHtml(titleCase(exercise.bodyPart))}</strong></span>
        <span>Target: <strong>${escapeHtml(titleCase(exercise.target))}</strong></span>
      </p>
    </li>`;
}

export function createExerciseCardsMarkup(exercises = []) {
  if (!exercises.length) return '';
  return exercises.map(exercise => exerciseCardMarkup(exercise)).join('');
}
