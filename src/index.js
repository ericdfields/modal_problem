var Modal = require('./overlay')

var el = document.createElement('div');
el.innerHTML = "I'm a dom element. Put me in the modal.";
// var el = 'http://ericdfields.s3.amazonaws.com/img/the-dumbest.png'

var modal = window.modal = new Modal(el,{
  screenClickCloses: true,
  contentClickCloses: true,
  customClassName: 'asdf'
});