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
    location: 'top-right'
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
      var closeButton, message, notice, title;
      this.empty();
      closeButton = $('<button>', {
        "class": 'notification-close',
        html: '&times'
      });
      closeButton.on('click', (function(_this) {
        return function(e) {
          e.preventDefault();
          return _this.empty();
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
      notice = $('<div>', {
        "class": "notification notification-" + this.options.location,
        html: $('<div>', {
          "class": 'notification-content',
          html: [closeButton, title, message]
        })
      });
      this.el.append(notice);
      return notice.stop().animate({
        opacity: 1,
        right: '15px'
      }, 250, 'easeOutBack', (function(_this) {
        return function() {
          return _this.el.trigger('notification-display-complete');
        };
      })(this));
    };
    Notifyr.prototype.empty = function() {
      return this.el.empty();
    };
    return Notifyr;
  })();
  return $.fn[pluginName] = function(options) {
    return new notifyr(this, options);
  };
});
