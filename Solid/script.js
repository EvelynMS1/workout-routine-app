
const btn = document.querySelector('.cybr-btn');
const link = btn.querySelector('.cybr-btn__link');

btn.addEventListener('click', function() {
  var href = link.getAttribute('href');
  window.location.href = link.href;
});