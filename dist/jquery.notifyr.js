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
    sticky: true,
    location: 'top-right',
    animationSpeed: 250,
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
      this.notice = '';
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
      var closeButton, message, title;
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
      return this.notice.stop().animate(this.animateOptions('show'), this.options.animationSpeed, 'easeOutBack', (function(_this) {
        return function() {
          return _this.el.trigger('notification-display-complete');
        };
      })(this));
    };
    Notifyr.prototype.empty = function() {
      return this.el.empty();
    };
    Notifyr.prototype.remove = function() {
      return this.notice.stop().animate(this.animateOptions('hide'), this.options.animationSpeed, 'easeInBack', (function(_this) {
        return function() {
          _this.el.empty();
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
          opts.left = '15px';
        } else {
          opts.right = '15px';
        }
      } else {
        opts.opacity = 0;
        if (this.options.location.match(/left/)) {
          opts.left = '-300px';
        } else {
          opts.right = '-300px';
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
