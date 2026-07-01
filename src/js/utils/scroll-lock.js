export function lockPageScroll() {
  document.body.classList.add('is-scroll-locked');
}

export function unlockPageScroll() {
  document.body.classList.remove('is-scroll-locked');
}
