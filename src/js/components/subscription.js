import { yourEnergyApi } from '../api/your-energy-api.js';
import { beginButtonLoader } from './loader.js';
import iziToast from './notifications.js';

const refs = {
  subscribeForm: document.querySelector('[data-subscribe-form]'),
};

async function onSubscription(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const emailValue = form.elements.email.value.trim();

  const button = form.querySelector('.subscription-form__button');
  const loading = beginButtonLoader(button);

  try {
    await yourEnergyApi.subscribe(emailValue);

    iziToast.show({
      backgroundColor: '#59C991',
      message: '✅ Thank you for subscribing',
    });

    form.reset();
  } catch (e) {
    iziToast.show({
      backgroundColor: '#E26353',
      message: 'Subscription already exist',
    });
  } finally {
    await loading.stop();
  }
}

export function initSubscriptionForms() {
  if (refs.subscribeForm) {
    refs.subscribeForm.addEventListener('submit', onSubscription);
  }
}
