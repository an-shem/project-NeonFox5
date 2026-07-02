import { initMobileMenu, setActiveNavigation } from './mobile-menu.js';

export function initAppShell() {
  setActiveNavigation();
  initMobileMenu();
}
