var Modal = require('./overlay')

// var el = document.createElement('div');
// el.innerHTML = "I'm a dom element. Put me in the modal.";
var el = 'http://www.guestcentric.com/wp-content/uploads/2012/02/url.jpg'

var modal = window.modal = new Modal(el,{
  // 
  // if you want to be able to close on click of the background overlay…
  // 
  // screenClickCloses: true,
  // 
  // if you want to be able to close on click of the modal content…
  // 
  // contentClickCloses: true
});