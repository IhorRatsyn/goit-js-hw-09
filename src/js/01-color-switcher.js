function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0')}`;
}


let colorInterval;

function startColorChange() {
  const startButton = document.querySelector('[data-start]');
  const stopButton = document.querySelector('[data-stop]');

  startButton.disabled = true;
  stopButton.disabled = false;

  colorInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopColorChange() {
  const startButton = document.querySelector('[data-start]');
  const stopButton = document.querySelector('[data-stop]');

  startButton.disabled = false;
  stopButton.disabled = true;

  clearInterval(colorInterval);
  document.body.style.backgroundColor = ''; // Reset background color
}

