import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";
import "notiflix/dist/notiflix-3.2.6.min.css";
import '../css/common.css'

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

document.addEventListener("DOMContentLoaded", function () {
  const datePicker = document.getElementById('datetime-picker');
  const startButton = document.querySelector('[data-start]');
  const daysElement = document.querySelector('[data-days]');
  const hoursElement = document.querySelector('[data-hours]');
  const minutesElement = document.querySelector('[data-minutes]');
  const secondsElement = document.querySelector('[data-seconds]');

  let targetDate;
  let intervalId;

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];

      if (selectedDate > new Date()) {
        // Enable the start button and set the target date
        startButton.disabled = false;
        targetDate = selectedDate;
      } else {
        // Show an alert for an invalid date
        Notiflix.Notify.failure('Please choose a date in the future');
        startButton.disabled = true;
      }
    },
  };

  const fp = flatpickr(datePicker, options);

  startButton.addEventListener('click', function () {
    // Disable the start button to prevent multiple clicks
    startButton.disabled = true;

    // Clear any existing interval
    clearInterval(intervalId);

    // Update the timer immediately
    updateTimer();

    // Start the interval to update the timer every second
    intervalId = setInterval(updateTimer, 1000);
  });

  function updateTimer() {
    const currentTime = new Date();
    const timeDifference = targetDate - currentTime;

    if (timeDifference <= 0) {
      // Stop the timer when the target date is reached
      clearInterval(intervalId);
      Notiflix.Notify.success('Countdown finished!');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    // Update the timer display
    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
  }
});
