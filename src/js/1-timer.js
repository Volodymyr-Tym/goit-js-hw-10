import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dateTime = document.querySelector('input#datetime-picker');
const btnStart = document.querySelector('button[data-start]');

let userSelectedDate;

const dateTimeOptions = {
  dateFormat: 'd-m-Y H:i',
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
  },
};

flatpickr(dateTime, dateTimeOptions);
