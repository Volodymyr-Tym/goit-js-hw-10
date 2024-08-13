import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// import 'flatpickr/dist/flatpickr.min.css';

const dateTime = document.querySelector('input#datetime-picker');
const btnStart = document.querySelector('button[data-start]');

const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');

let userSelectedDate;
let timer;

const dateTimeOptions = {
  dateFormat: 'd-m-Y H:i',
  locale: {
    firstDayOfWeek: 1,
  },
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (selectedDates[0] > Date.now()) {
      if (btnStart.hasAttribute('disabled')) {
        btnStart.removeAttribute('disabled');
      }
    } else {
      if (!btnStart.hasAttribute('disabled')) {
        btnStart.setAttribute('disabled', '');
      }
      // alert('Please choose a date in the future');
      iziToast.show({
        iconUrl: './img/Error.ico',
        title: 'Error',
        titleColor: '#ffffff',
        titleSize: '16px',
        message: 'Please choose a date in the future',
        messageColor: '#ffffff',
        messageSize: '16px',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
    }
  },
};

btnStart.setAttribute('disabled', '');

flatpickr(dateTime, dateTimeOptions);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));

  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function startTimer() {
  btnStart.setAttribute('disabled', '');
  dateTime.setAttribute('disabled', '');

  timer = setInterval(() => {
    const currentDate = Date.now();
    const timeDifference = userSelectedDate - currentDate;
    const timerTime = convertMs(timeDifference);

    if (Math.floor(timeDifference / 1000) === 0) {
      stopTimer();
    }

    updateTimer(timerTime);
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
  spanDays.textContent = days;
  spanHours.textContent = hours;
  spanMinutes.textContent = minutes;
  spanSeconds.textContent = seconds;
}

function stopTimer() {
  clearInterval(timer);
  dateTime.removeAttribute('disabled');
}

btnStart.addEventListener('click', startTimer);
