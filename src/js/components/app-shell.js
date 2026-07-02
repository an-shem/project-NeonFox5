import { initMobileMenu, setActiveNavigation } from './mobile-menu.js';
import { initSubscriptionForms } from './subscription.js';

export function initAppShell() {
  setActiveNavigation();
  initMobileMenu();
  initSubscriptionForms();
}
