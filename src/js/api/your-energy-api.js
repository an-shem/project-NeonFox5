import { apiClient } from './api-client.js';

function removeEmptyValues(params = {}) {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null && value !== ''
    )
  );
}

async function getFilters({ filter = 'Muscles', page = 1, limit = 12 } = {}) {
  const response = await apiClient.get('/filters', {
    params: removeEmptyValues({ filter, page, limit }),
  });

  return response.data;
}

async function getExercises({
  bodypart,
  muscles,
  equipment,
  keyword,
  page = 1,
  limit = 10,
} = {}) {
  const response = await apiClient.get('/exercises', {
    params: removeEmptyValues({
      bodypart,
      muscles,
      equipment,
      keyword,
      page,
      limit,
    }),
  });

  return response.data;
}

async function getExerciseById(exerciseId) {
  if (!exerciseId) throw new TypeError('Exercise id is required.');

  const response = await apiClient.get(`/exercises/${exerciseId}`);
  return response.data;
}

async function addExerciseRating(exerciseId, { rate, email, review }) {
  if (!exerciseId) throw new TypeError('Exercise id is required.');

  const response = await apiClient.patch(`/exercises/${exerciseId}/rating`, {
    rate: Number(rate),
    email,
    review,
  });

  return response.data;
}

async function getQuote() {
  const response = await apiClient.get('/quote');
  return response.data;
}

async function subscribe(email) {
  const response = await apiClient.post('/subscription', { email });
  return response.data;
}

export const yourEnergyApi = Object.freeze({
  getFilters,
  getExercises,
  getExerciseById,
  addExerciseRating,
  getQuote,
  subscribe,
});
