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
    property: true
  };
  notifyr = (function() {
    var Plugin;
    Plugin = function(element, options) {
      this.element = element;
      this.options = $.extend({}, defaults, options);
      this._defaults = defaults;
      this._name = pluginName;
      this.el = $(this.element);
      return this.init();
    };
    Plugin.prototype.init = function() {
      return this.el.css('color', '#FC1501');
    };
    return Plugin;
  })();
  return $.fn[pluginName] = function(options) {
    this.each(function() {
      if (!$.data(this, pluginName)) {
        $.data(this, pluginName, new notifyr(this, options));
      }
    });
    return this;
  };
});
