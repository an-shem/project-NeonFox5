const refs = {
  menu: document.querySelector('[data-mobile-menu]'),
  openButton: document.querySelector('[data-menu-open]'),
  closeButton: document.querySelector('[data-menu-close]'),
  navLinks: document.querySelectorAll('[data-nav-link]'),
};

function openMenu() {
  refs.menu.hidden = false;
  document.body.classList.add('is-scroll-locked');

  refs.openButton.setAttribute('aria-expanded', 'true');
  refs.closeButton.focus();
}

function closeMenu() {
  refs.menu.hidden = true;
  document.body.classList.remove('is-scroll-locked');

  refs.openButton.setAttribute('aria-expanded', 'false');
  refs.openButton.focus();
}

export function initMobileMenu() {
  const { menu, openButton, closeButton } = refs;
  if (!menu || !openButton || !closeButton) return;

  openButton.addEventListener('click', openMenu);
  closeButton.addEventListener('click', closeMenu);

  menu.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) closeMenu();
  });
}

export function setActiveNavigation() {
  const page = document.body.dataset.page;

  document.querySelectorAll('[data-nav-link]').forEach(link => {
    const isActive = link.dataset.navLink === page;
    link.classList.toggle('is-active', isActive);

    if (isActive) link.setAttribute('aria-current', 'page');
  });
}
