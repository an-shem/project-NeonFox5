import { lockPageScroll, unlockPageScroll } from '../utils/scroll-lock.js';
import { createExerciseModalMarkup } from '../templates/exercise-modal-markup.js';

// AbortController для зняття eventListeners при закритті
let closeController = null;

function getElements() {
  return {
    backdrop: document.querySelector('[data-exercise-modal]'),
    panel:    document.querySelector('[data-exercise-modal-panel]'),
    closeBtn: document.querySelector('[data-exercise-modal-close]'),
    content:  document.querySelector('[data-exercise-modal-content]'),
    loader:   document.querySelector('[data-exercise-modal-loader]'),
  };
}

/**
 * Закриває модалку, знімає scroll-lock і видаляє всі listeners.
 */
export function closeExerciseModal() {
  const { backdrop } = getElements();
  if (!backdrop || backdrop.hidden) return;

  backdrop.hidden = true;
  unlockPageScroll();

  if (closeController) {
    closeController.abort();
    closeController = null;
  }
}

/**
 * Відкриває модалку з переданими даними вправи.
 * Викликається з задачі "GET деталей вправи по ID".
 */
export function openExerciseModal(exercise, isFavorite = false) {
  const { backdrop, content, closeBtn } = getElements();
  if (!backdrop) return;

  // Відмінити попередні listeners якщо модалка відкривається повторно
  if (closeController) {
    closeController.abort();
  }
  closeController = new AbortController();
  const { signal } = closeController;

  // Рендеримо контент
  if (content && exercise) {
    content.innerHTML = createExerciseModalMarkup(exercise, isFavorite);
  }

  // Показуємо модалку і блокуємо скрол body
  backdrop.hidden = false;
  lockPageScroll();
  closeBtn?.focus();

  // ── Закриття по кнопці × (делегація на document) ──────────
  document.addEventListener(
    'click',
    event => {
      if (event.target.closest('[data-exercise-modal-close]')) {
        closeExerciseModal();
      }
    },
    { signal }
  );

  // ── Закриття по кліку на backdrop ─────────────────────────
  backdrop.addEventListener(
    'click',
    event => {
      if (event.target === backdrop) closeExerciseModal();
    },
    { signal }
  );

  // ── Закриття по ESC ───────────────────────────────────────
  document.addEventListener(
    'keydown',
    event => {
      if (event.key === 'Escape') closeExerciseModal();
    },
    { signal }
  );
}

/**
 * Ініціалізація — точка входу для app-shell.
 * Слухаємо кліки на [data-start-exercise] щоб запустити відкриття.
 * Фактичний fetch буде в задачі "GET деталей вправи по ID".
 */
export function initExerciseModal() {
  // Placeholder для наступної задачі (GET деталей вправи по ID).
  // Зараз wiring listeners відбувається всередині openExerciseModal().
}
