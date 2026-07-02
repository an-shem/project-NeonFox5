import { SPRITE_URL, PLACEHOLDER_EXERCISE_IMAGE } from '../utils/constants.js';
import { escapeHtml, titleCase, clampRating, normalizeExercise } from '../utils/format.js';

function icon(name, width = 18, height = width) {
  return `<svg class="icon" width="${width}" height="${height}" aria-hidden="true"><use href="${SPRITE_URL}#icon-${name}"></use></svg>`;
}

export function createExerciseModalMarkup(rawExercise, isFavorite = false) {
  const exercise = normalizeExercise(rawExercise);
  const rating = clampRating(exercise.rating);
  const activeStars = Math.round(rating);

  const stars = Array.from({ length: 5 }, (_, i) =>
    `<span class="exercise-modal__star${i < activeStars ? ' is-active' : ''}">${icon('star', 16)}</span>`
  ).join('');

  const imgSrc = exercise.gifUrl || PLACEHOLDER_EXERCISE_IMAGE;

  return `
    <div class="exercise-modal__layout">
      <img
        class="exercise-modal__media"
        src="${escapeHtml(imgSrc)}"
        alt="Demonstration of ${escapeHtml(exercise.name)}"
        onload="this.classList.add('is-loaded')"
      />
      <div>
        <h2 class="exercise-modal__title" id="exercise-modal-title">
          ${escapeHtml(titleCase(exercise.name))}
        </h2>
        <div class="exercise-modal__rating">
          <span>${rating.toFixed(1)}</span>
          <span class="exercise-modal__stars" aria-label="Rating ${rating.toFixed(1)} out of 5">
            ${stars}
          </span>
        </div>
        <dl class="exercise-modal__stats">
          <div>
            <dt class="exercise-modal__stat-label">Target</dt>
            <dd class="exercise-modal__stat-value">${escapeHtml(titleCase(exercise.target))}</dd>
          </div>
          <div>
            <dt class="exercise-modal__stat-label">Body Part</dt>
            <dd class="exercise-modal__stat-value">${escapeHtml(titleCase(exercise.bodyPart))}</dd>
          </div>
          <div>
            <dt class="exercise-modal__stat-label">Equipment</dt>
            <dd class="exercise-modal__stat-value">${escapeHtml(titleCase(exercise.equipment))}</dd>
          </div>
          <div>
            <dt class="exercise-modal__stat-label">Popular</dt>
            <dd class="exercise-modal__stat-value">${exercise.popularity}</dd>
          </div>
          <div>
            <dt class="exercise-modal__stat-label">Burned calories</dt>
            <dd class="exercise-modal__stat-value">${exercise.burnedCalories} / ${exercise.time} min</dd>
          </div>
        </dl>
        <p class="exercise-modal__description">${escapeHtml(exercise.description)}</p>
        <div class="exercise-modal__actions">
          <button class="exercise-modal__button exercise-modal__button--primary" type="button" data-toggle-favorite>
            <span class="exercise-modal__button-content">
              ${isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              ${icon('heart', 20)}
            </span>
          </button>
          <button class="exercise-modal__button" type="button" data-open-rating>
            Give a rating
          </button>
        </div>
      </div>
    </div>`;
}
