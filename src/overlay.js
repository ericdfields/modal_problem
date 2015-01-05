var Modal = (function() {
  var config,overlay,modal;

  // constructor
  function Modal(content,options){
    _this = this;
    var options = options || {};
    // update config w/ passed thru options
    for (var attrname in options) { config[attrname] = options[attrname]; }      
    setupOverlay();
    if (content) {
      _this.appendContent(content);
    } else {
      if (console) {
        console.error('You did not provide content for the modal.')
      }
    }

    // resize listener
    window.addEventListener('resize',function(){
      _this.setLeft();
      _this.setTop();
    })

    // click listener
    overlay.addEventListener('click',function(event){
      if (event.target.classList.contains('e-modal-close') || (options.screenClickCloses && event.target.classList.contains('e-screen')) || (options.contentClickCloses && event.target.classList.contains('e-modal'))) {
        _this.remove()
      }
    });
  };

  // default configuration options
  config = {
    customClassName: undefined,
    width: '50%',
    height: '50%',
    screenClickCloses: false,
    contentClickCloses: false,
  }

  // create our container div
  overlay = Modal.prototype.overlay = document.createElement('div');

  var markup = function() {
    return ' \
      <div class="e-screen"></div>\
      <div class="e-modal">\
        <div class="e-modal-content"></div>\
        <div class="e-modal-close"></div>\
      </div>\
    '
  }

  // setup for the container
  var setupOverlay = function() {
    overlay.classList.add("e-overlay");
    if (config.customClassName) {
      overlay.classList.add(config.customClassName);
    }
    overlay.innerHTML = markup();
    setupModal();
  }

  // setup for the modal itself
  var setupModal = function() {
    modal = Modal.prototype.modal = overlay.querySelector('.e-modal');
    modal.style.width = config.width;
    modal.style.height = config.height;
    appendToBody();
  }

  // append it all to the body and adjust the centering
  var appendToBody = function() {
    document.body.appendChild(overlay);
    _this.setLeft();
    _this.setTop();
  }

  Modal.prototype.getWidth = function() {
    return _this.modal.offsetWidth
  }

  Modal.prototype.getHeight = function() {
    return _this.modal.offsetHeight
  }

  Modal.prototype.setLeft = function() {
    _this.modal.style.left = (window.innerWidth - _this.getWidth()) / 2 + 'px'
  };

  Modal.prototype.setTop = function() {
    _this.modal.style.top = (window.innerHeight - _this.getHeight()) / 2 + 'px'
  };

  Modal.prototype.appendContent = function(content) {
    if (typeof content == 'string') {
      _this.appendLoader(_this.fetchImage.bind(null,content));
    } else {
      _this.contentContainer.appendChild(content);
    }
  }

  Modal.prototype.contentContainer = function() {
    return _this.modal.querySelector('.e-modal-content');
  };

  Modal.prototype.appendLoader = function(callback) {
    var message = document.createElement('div');
    message.className = 'e-modal-loader'
    message.innerHTML = 'Loading image…'
    _this.contentContainer().appendChild(message);
    if (callback && typeof callback == 'function') {
      callback();
    }
  };

  Modal.prototype.removeLoader = function() {
    var loader = _this.modal.querySelector('.e-modal-loader');
    loader.parentNode.removeChild(loader);
  }

  Modal.prototype.fetchImage = function(imageUrl) {
    var img = new Image(); 
    img.src = imageUrl;
    img.loading = true;
    img.checked = 0;
    _this.contentContainer().appendChild(img);
    var intervalTimer = setInterval(function(){
      if (img.loading) {
        if (img.naturalWidth === 0) {
          img.checked = img.checked++;
        } else {
          _this.removeLoader();
          img.loading = false;
          img.style.height = _this.getHeight() + 'px';
          img.classList.add('loaded');
        }
      } else {
        clearInterval(intervalTimer);
      }
    },100)
  }

  Modal.prototype.remove = function() {
    document.body.removeChild(_this.overlay);
    _this = null;
  }

  return Modal;
})();

var module = module || undefined
if (module) {
  module.exports = Modal;
} else {
  window.Modal = Modal;
}