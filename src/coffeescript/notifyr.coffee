((factory) ->
  'use strict'
  if typeof define is 'function' and define.amd
    define ['jquery'], factory # AMD
  else if typeof exports is 'object'
    factory require('jquery') # CommonJS
  else
    factory jQuery # Browser globals
  return
) ($) ->

  'use strict'

  pluginName = 'notifyr'

  defaults = property: true

  notifyr = (->

    Plugin = (element, options) ->
      @element = element
      @options = $.extend({}, defaults, options)
      @_defaults = defaults
      @_name = pluginName
      @el = $(@element)
      @init()

    Plugin::init = ->
      @el.css 'color', 'red'

    Plugin

  )()

  $.fn[pluginName] = (options) ->
    @each ->
      $.data this, pluginName, new notifyr(this, options)  unless $.data(this, pluginName)
      return

    return this
