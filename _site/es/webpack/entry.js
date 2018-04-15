import Instafeed from 'instafeed.js'
import Masonry from 'masonry-layout'
import smoothScroll from 'smooth-scroll'
import Pikaday from 'pikaday'

const feed = new Instafeed({
    get: 'user',
    userId: '5518351442',
    accessToken: '5518351442.9259fc8.e9388e5e1cfa4ad69441a018bf7d122e',
    template: '<div class="grid-item"><a href={{link}}><img src="{{image}}"/></a></div>',
    resolution: 'standard_resolution',
    limit: 20,
    filter: (img) => {
      return img.type === 'image'
    }
})

function postToGoogleSheets (data) {
  const url = 'https://script.google.com/macros/s/AKfycbxb2hQxFXnKvKA67YG2YngTv5zLea5mPjsIecjslySsOG_X7_xp/exec';

  $.ajax({
    url: url,
    data: data,
    type: 'POST',
    success: (res, status) => {
      const lang = localStorage.getItem('lang');
      const url = (lang === 'es') ? `/${lang}/thanks` : '/thanks';
      window.location.href = url;
    },
    error: (res) => {
      console.log(res)
    },
  })
}

function sendContactFormData (e) {
  e.preventDefault();
  const dataArray = $(this).serializeArray();
  let formData = {};
  dataArray.forEach(function(field) {
    formData[field.name] = field.value
  });
  postToGoogleSheets(formData);
}

function nextDay (date) {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return new Date(year, month, day + 1);
}

function initalizeDatePickers () {
  const departureDate = nextDay(new Date())
  const departureDateField = document.querySelector('input[name="departure-date"');
  const returnDateField = document.querySelector('input[name="return-date"');
  const returnDatePicker = new Pikaday({ field: returnDateField });
  const departureDatePicker = new Pikaday({
    field: departureDateField,
    minDate: departureDate,
    defaultDate: departureDate,
    onSelect: (e) => {
      const minReturnDate = nextDay(e);
      returnDatePicker.setMinDate(minReturnDate);
    }
  });
}

document.getElementById('contact-form').addEventListener('submit', sendContactFormData);
document.getElementById('en').addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.setItem('lang', 'en');
  window.location.href = '/';
});
document.getElementById('es').addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.setItem('lang', 'es');
  window.location.href = '/es';
});

initalizeDatePickers();
feed.run();
smoothScroll.init();
