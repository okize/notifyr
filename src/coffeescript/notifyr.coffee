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

  defaults =
    sticky: true
    location: 'top-right'
    animationSpeed: 250
    classes: []
    closeButtonHtml: '<button class="notification-close">&times;</button>'

  $.easing.easeInBack = (x, t, b, c, d, s) ->
    s = 1.70158 if s is undefined
    c * (t /= d) * t * ((s + 1) * t - s) + b

  $.easing.easeOutBack = (x, t, b, c, d, s) ->
    s = 1.70158 if s is undefined
    c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b

  notifyr = (->

    Notifyr = (target, options) ->
      @options = $.extend({}, defaults, options)
      @_defaults = defaults
      @el = $(target)
      @notice = ''
      @init()

    Notifyr::init = ->

      # clear out notification dropzone
      @empty()

      # do nothing if a message option was not passed
      return if !@options.message?

      @render()

    Notifyr::render = () ->
      closeButton = $(@options.closeButtonHtml)
      closeButton.on 'click', (e) =>
        e.preventDefault()
        @remove()
      title = if @options.title? then $('<div>', {class: 'notification-title', html: @options.title}) else ''
      message = $('<div>', {class: 'notification-message', html: @options.message})
      @notice = $(
        '<div>',
          class: "notification notification-#{@options.location} #{@options.classes.join(' ')}"
          html: $('<div>',
            class: 'notification-content'
            html: [closeButton, title, message]
          )
      )
      @el.append @notice
      @notice
        .stop()
        .animate @animateOptions('show'), @options.animationSpeed, 'easeOutBack', =>
          @el.trigger 'notification-display-complete'

    Notifyr::empty = ->
      @el.empty()

    Notifyr::remove = ->
      @notice
        .stop()
        .animate @animateOptions('hide'), @options.animationSpeed, 'easeInBack', =>
          @el.empty()
          @el.trigger 'notification-remove-complete'

    Notifyr::animateOptions = (state) ->
      opts = {}
      if (state == 'show')
        opts.opacity = 1
        if @options.location.match(/left/)
          opts.left = '15px'
        else
          opts.right = '15px'
      else
        opts.opacity = 0
        if @options.location.match(/left/)
          opts.left = '-300px'
        else
          opts.right = '-300px'
      opts

    Notifyr

  )()

  $.fn[pluginName] = (options) -> return new notifyr(this, options)
