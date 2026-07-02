import { initAppShell } from './components/app-shell.js';
import { initMobileMenu } from './components/mobile-menu.js';
import { initQuote } from './components/quote.js';
import { initFavoritesPage } from './components/favorites-page.js';
import { initExerciseModal } from './components/exercise-modal.js';
import { initRatingModal } from './components/rating-modal.js';
import { initLoader } from './components/loader.js';
import { initScrollUp } from './components/scroll-up.js';

function initFavoritesPageEntry() {
  initAppShell();
  initMobileMenu();
  initQuote();
  initFavoritesPage();
  initExerciseModal();
  initRatingModal();
  initLoader();
  initScrollUp();
}

document.addEventListener('DOMContentLoaded', initFavoritesPageEntry);
