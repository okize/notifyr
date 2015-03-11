/*!
 notifyr v0.0.1 (https://github.com/okize/notifyr/)
 Copyright (c) 2015 Morgan Wigmanich <okize123@gmail.com> (http://github.com/okize)
 Licensed under the MIT license
 */
(function(factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    factory(require('jquery'));
  } else {
    factory(jQuery);
  }
})(function($) {
  'use strict';
  var defaults, notifyr, pluginName;
  pluginName = 'notifyr';
  defaults = {
    sticky: false,
    lifespan: 5000,
    location: 'top-right',
    animationSpeed: 250,
    offscreenPosition: '-5em',
    classes: [],
    closeButtonHtml: '<button class="notification-close">&times;</button>'
  };
  $.easing.easeInBack = function(x, t, b, c, d, s) {
    if (s === void 0) {
      s = 1.70158;
    }
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  };
  $.easing.easeOutBack = function(x, t, b, c, d, s) {
    if (s === void 0) {
      s = 1.70158;
    }
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  };
  notifyr = (function() {
    var Notifyr;
    Notifyr = function(target, options) {
      this.options = $.extend({}, defaults, options);
      this._defaults = defaults;
      this.el = $(target);
      this.timer = '';
      return this.init();
    };
    Notifyr.prototype.init = function() {
      this.empty();
      if (this.options.message == null) {
        return;
      }
      return this.render();
    };
    Notifyr.prototype.render = function() {
      var closeButton, message, offset, opts, title;
      closeButton = $(this.options.closeButtonHtml);
      closeButton.on('click', (function(_this) {
        return function(e) {
          e.preventDefault();
          return _this.remove();
        };
      })(this));
      title = this.options.title != null ? $('<div>', {
        "class": 'notification-title',
        html: this.options.title
      }) : '';
      message = $('<div>', {
        "class": 'notification-message',
        html: this.options.message
      });
      this.notice = $('<div>', {
        "class": "notification notification-" + this.options.location + " " + (this.options.classes.join(' ')),
        html: $('<div>', {
          "class": 'notification-content',
          html: [closeButton, title, message]
        })
      });
      this.el.append(this.notice);
      opts = this.animateOptions('show');
      offset = this.options.location.match(/left/) ? {
        left: this.options.offscreenPosition
      } : {
        right: this.options.offscreenPosition
      };
      return this.notice.stop().css(offset).animate(opts, this.options.animationSpeed, 'easeOutBack', (function(_this) {
        return function() {
          _this.el.trigger('notification-display-complete');
          if (!_this.options.sticky) {
            clearTimeout(_this.timer);
            return _this.timer = setTimeout(function() {
              return _this.remove();
            }, _this.options.lifespan);
          }
        };
      })(this));
    };
    Notifyr.prototype.empty = function() {
      clearTimeout(this.timer);
      return this.el.empty();
    };
    Notifyr.prototype.remove = function() {
      var opts;
      clearTimeout(this.timer);
      opts = this.animateOptions('hide');
      return this.notice.stop().animate(opts, this.options.animationSpeed, 'easeInBack', (function(_this) {
        return function() {
          return _this.el.trigger('notification-remove-complete');
        };
      })(this));
    };
    Notifyr.prototype.animateOptions = function(state) {
      var opts;
      opts = {};
      if (state === 'show') {
        opts.opacity = 1;
        if (this.options.location.match(/left/)) {
          opts.left = this.notice.css('left');
        } else {
          opts.right = this.notice.css('right');
        }
      } else {
        opts.opacity = 0;
        if (this.options.location.match(/left/)) {
          opts.left = this.options.offscreenPosition;
        } else {
          opts.right = this.options.offscreenPosition;
        }
      }
      return opts;
    };
    return Notifyr;
  })();
  return $.fn[pluginName] = function(options) {
    return new notifyr(this, options);
  };
});
