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
      }

      window.addEventListener('resize',function(){
        _this.setLeft();
        _this.setTop();
      })
      overlay.addEventListener('click',function(event){
        if (event.target.classList.contains('e-modal-close') || (options.screenClickCloses && event.target.classList.contains('e-screen')) || (options.contentClickCloses && event.target.classList.contains('e-modal'))) {
          _this.remove()
        }
      });
    };

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

    Modal.prototype.appendContent = function(content) {
      var content_container = _this.modal.querySelector('.e-modal-content');
      content_container.innerHTML = '';
      if (typeof content == 'string') {
        var img = document.createElement('div');
        // img.src = content;
        img.innerHTML = 'Loading image…'
        _this.fetchImage(content)
        content = img
      } 
      content_container.appendChild(content);
    }

    Modal.prototype.fetchImage = function(imageUrl) {
      request = new XMLHttpRequest();
      request.open('GET', imageUrl);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400){
          // Success!
          debugger
          return data = JSON.parse(request.responseText);
        } else {
          // We reached our target server, but it returned an error
          console.error('There was a problem fetching your image. Check the URL?')
        }
      };

      request.onerror = function() {
        // There was a connection error of some sort
        if (console) {
          console.error('There was a problem fetching your image. Check the URL?')
        }
      };

      request.send();
    }

    Modal.prototype.remove = function() {
      _this.overlay.remove();
      _this = null;
    }

    return Modal;
})();

module.exports = Modal;