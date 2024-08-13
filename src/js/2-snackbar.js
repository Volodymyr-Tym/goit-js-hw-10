// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form.form');
const delayInput = form.delay;

const onFormSubmit = event => {
  event.preventDefault();

  const delay = delayInput.value;
  const state = form.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(message => {
      message = `✅ Fulfilled promise in ${delay}ms`;
      iziToast.show({
        title: 'OK',
        titleColor: '#ffffff',
        message: message,
        messageColor: '#ffffff',
        backgroundColor: '#59a10d',
      });
    })
    .catch(error => {
      error = `❌ Rejected promise in ${delay}ms`;
      iziToast.show({
        title: 'Error',
        titleColor: '#ffffff',
        message: error,
        messageColor: '#ffffff',
        backgroundColor: '#ef4040',
      });
    });

  form.reset();
};

form.addEventListener('submit', onFormSubmit);
