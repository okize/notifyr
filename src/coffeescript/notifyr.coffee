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
    sticky: false
    lifespan: 5000
    location: 'top-right'
    animationSpeed: 250
    offscreenPosition: '-5em'
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
      @timer = ''
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
      opts = @animateOptions('show')
      offset = if @options.location.match(/left/) then {left: @options.offscreenPosition} else {right: @options.offscreenPosition}
      @notice
        .stop()
        .css(offset)
        .animate opts, @options.animationSpeed, 'easeOutBack', =>
          @el.trigger 'notification-display-complete'
          unless @options.sticky
            clearTimeout @timer
            @timer = setTimeout(=>
              @remove()
            , @options.lifespan)

    Notifyr::empty = ->
      clearTimeout @timer
      @el.empty()

    Notifyr::remove = ->
      clearTimeout @timer
      opts = @animateOptions('hide')
      @notice
        .stop()
        .animate opts, @options.animationSpeed, 'easeInBack', =>
          @el.trigger 'notification-remove-complete'

    Notifyr::animateOptions = (state) ->
      opts = {}
      if (state == 'show')
        opts.opacity = 1
        if @options.location.match(/left/)
          opts.left = @notice.css('left')
        else
          opts.right = @notice.css('right')
      else
        opts.opacity = 0
        if @options.location.match(/left/)
          opts.left = @options.offscreenPosition
        else
          opts.right = @options.offscreenPosition
      opts

    Notifyr

  )()

  $.fn[pluginName] = (options) -> return new notifyr(this, options)
