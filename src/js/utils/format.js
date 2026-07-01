export function capitalizeFirstLetter(value = '') {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
}

export function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function titleCase(value = '') {
  const text = String(value).trim();
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
}

export function clampRating(value) {
  const rating = Number(value);
  if (!Number.isFinite(rating)) return 0;
  return Math.min(5, Math.max(0, rating));
}

export function normalizeExercise(raw = {}) {
  return {
    ...raw,
    id: raw.id ?? raw._id ?? '',
    name: raw.name ?? 'Exercise',
    bodyPart: raw.bodyPart ?? raw.bodypart ?? '—',
    target: raw.target ?? '—',
    equipment: raw.equipment ?? '—',
    rating: clampRating(raw.rating ?? raw.rate),
    burnedCalories: Number(raw.burnedCalories ?? raw.calories ?? 0),
    time: Number(raw.time ?? 3),
    gifUrl: raw.gifUrl ?? raw.gifURL ?? raw.image ?? '',
  };
}
