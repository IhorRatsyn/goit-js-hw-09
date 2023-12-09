import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

flatpickr("#datetime-picker", { ...options, wrap: true });

let countdownInterval;

function startCountdown() {
  const endDate = flatpickr("#datetime-picker").selectedDates[0];

  if (!endDate) {
    Notiflix.Notify.warning("Please choose a future date before starting the countdown");
    return;
  }

  countdownInterval = setInterval(updateCountdown, 1000, endDate);
  document.querySelector('[data-start]').disabled = true;
}

function updateCountdown(endDate) {
  const currentTime = new Date();
  const timeDifference = endDate - currentTime;

  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    Notiflix.Notify.success("Countdown complete!");
    document.querySelector('[data-start]').disabled = false;
  } else {
    const timeRemaining = convertMs(timeDifference);
    updateTimerDisplay(timeRemaining);
  }
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

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
