import { SPRITE_URL } from '../utils/constants.js';

function icon(name) {
  return `<svg class="icon" width="14" height="14" aria-hidden="true"><use href="${SPRITE_URL}#icon-${name}"></use></svg>`;
}

function getVisiblePages(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([1, totalPages, currentPage]);

  if (currentPage <= 3) {
    pages.add(2);
    pages.add(3);
  } else if (currentPage >= totalPages - 2) {
    pages.add(totalPages - 2);
    pages.add(totalPages - 1);
  } else {
    pages.add(currentPage - 1);
    pages.add(currentPage + 1);
  }

  const sorted = [...pages]
    .filter(page => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  const sequence = [];
  sorted.forEach((page, index) => {
    const previous = sorted[index - 1];
    if (previous && page - previous > 1) sequence.push('ellipsis');
    sequence.push(page);
  });

  return sequence;
}

function controlMarkup({ page, label, iconName, disabled = false, modifier = '' }) {
  return `
    <button
      class="pagination__control ${modifier}"
      type="button"
      data-page="${page}"
      aria-label="${label}"
      ${disabled ? 'disabled' : ''}
    >${icon(iconName)}</button>`;
}

export function paginationMarkup(currentPage, totalPages) {
  if (totalPages <= 1) return '';

  const pages = getVisiblePages(currentPage, totalPages)
    .map(item => {
      if (item === 'ellipsis') {
        return '<span class="pagination__ellipsis" aria-hidden="true">…</span>';
      }

      const isActive = item === currentPage;
      return `
        <button
          class="pagination__page ${isActive ? 'is-active' : ''}"
          type="button"
          data-page="${item}"
          aria-label="Go to page ${item}"
          ${isActive ? 'aria-current="page"' : ''}
        >${item}</button>`;
    })
    .join('');

  return [
    controlMarkup({
      page: 1,
      label: 'Go to first page',
      iconName: 'double-chevron-left',
      disabled: currentPage === 1,
      modifier: 'pagination__control--first',
    }),
    controlMarkup({
      page: Math.max(1, currentPage - 1),
      label: 'Go to previous page',
      iconName: 'chevron-left',
      disabled: currentPage === 1,
      modifier: 'pagination__control--previous',
    }),
    pages,
    controlMarkup({
      page: Math.min(totalPages, currentPage + 1),
      label: 'Go to next page',
      iconName: 'chevron-right',
      disabled: currentPage === totalPages,
      modifier: 'pagination__control--next',
    }),
    controlMarkup({
      page: totalPages,
      label: 'Go to last page',
      iconName: 'double-chevron-right',
      disabled: currentPage === totalPages,
      modifier: 'pagination__control--last',
    }),
  ].join('');
}
