import { initAppShell } from './components/app-shell.js';
import { initMobileMenu } from './components/mobile-menu.js';
import { initQuote } from './components/quote.js';
import { initExercises } from './components/exercises.js';
import { initExerciseModal } from './components/exercise-modal.js';
import { initRatingModal } from './components/rating-modal.js';
import { initSubscription } from './components/subscription.js';
import { initLoader } from './components/loader.js';
import { initNotifications } from './components/notifications.js';
import { initScrollUp } from './components/scroll-up.js';

function initHomePage() {
  initAppShell();
  initMobileMenu();
  initQuote();
  initExercises();
  initExerciseModal();
  initRatingModal();
  initSubscription();
  initLoader();
  initNotifications();
  initScrollUp();
}

document.addEventListener('DOMContentLoaded', initHomePage);
