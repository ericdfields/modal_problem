var Modal = (function() {
    var _this,config,overlay,modal;

    // constructor
    function Modal(options){
      _this = this;
      // update config w/ passed thru options
      for (var attrname in options) { config[attrname] = options[attrname]; }      
      setupOverlay();
    };

    config = {
      customClassName: undefined,
      width: '50%',
      height: '50%'
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

    var setupOverlay = function() {
      overlay.classList.add("e-overlay");
      if (config.customClassName) {
        overlay.classList.add(config.customClassName);
      }
      overlay.innerHTML = markup();
      setupModal();
    }

    var setupModal = function() {
      modal = Modal.prototype.modal = overlay.querySelector('.e-modal');
      modal.style.width = config.width;
      modal.style.height = config.height;
      appendToBody();
    }

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

    window.addEventListener('resize',function(){
      _this.setLeft()
      _this.setTop()
    },false)

    return Modal;
})();

module.exports = Modal;