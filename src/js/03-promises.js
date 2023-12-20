import Notiflix from "notiflix";

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handleFormSubmit(event) {
  console.log(1321)
  event.preventDefault();

  const formData = new FormData(event.target);
  const firstDelay = parseInt(formData.get("delay"), 10);
  const step = parseInt(formData.get("step"), 10);
  const amount = parseInt(formData.get("amount"), 10);

  generatePromises(amount, firstDelay, step);
}

function generatePromises(amount, firstDelay, step) {
  for (let i = 1; i <= amount; i++) {
    const currentDelay = firstDelay + (i - 1) * step;

    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.querySelector('.form')

  form.addEventListener('submit', handleFormSubmit)
})
