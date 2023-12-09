function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.querySelector('[data-start]');
  const stopButton = document.querySelector('[data-stop]');
  const body = document.body;

  let intervalId;

  function startColorChange() {
    // Встановлення кнопки Start у стан неактивності
    startButton.disabled = true;
    // Зняття кнопки Stop зі стану неактивності
    stopButton.disabled = false;

    // Запуск інтервалу для зміни кольору кожну секунду
    intervalId = setInterval(function () {
      body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }

  function stopColorChange() {
    // Відміна інтервалу
    clearInterval(intervalId);

    // Скидання кольору фону на початковий
    body.style.backgroundColor = '';

    // Зняття кнопки Stop зі стану неактивності
    stopButton.disabled = true;
    // Відновлення кнопки Start
    startButton.disabled = false;
  }

  // Додавання обробників подій для кнопок
  startButton.addEventListener('click', startColorChange);
  stopButton.addEventListener('click', stopColorChange);
});
