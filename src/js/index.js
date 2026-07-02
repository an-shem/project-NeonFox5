import { initAppShell } from './components/app-shell.js';
import { initMobileMenu } from './components/mobile-menu.js';
import { initQuote } from './components/quote.js';
import { initExercises } from './components/exercises.js';
import { initExerciseModal } from './components/exercise-modal.js';
import { initRatingModal } from './components/rating-modal.js';
import { initSubscriptionForms } from './components/subscription.js';
import { initLoader } from './components/loader.js';
import { initScrollUp } from './components/scroll-up.js';

function initHomePage() {
  initAppShell();
  initMobileMenu();
  initQuote();
  initExercises();
  initExerciseModal();
  initRatingModal();
  initSubscriptionForms();
  initLoader();
  initScrollUp();
}

document.addEventListener('DOMContentLoaded', initHomePage);
