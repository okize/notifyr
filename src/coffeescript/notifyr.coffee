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

  notifyr = (->

    Notifyr = (target, options) ->
      @options = $.extend({}, defaults, options)
      @_defaults = defaults
      @el = $(target)
      @init()

    Notifyr::init = ->

      # clear out notification dropzone
      @empty()

      # do nothing if a message option was not passed
      return if !@options.message?

      @render()

    Notifyr::render = () ->
      @empty()
      closeButton = $('<button>', {class: 'notification-close', html: '&times'})
      closeButton.on 'click', (e) =>
        e.preventDefault()
        @empty()
      title = if @options.title? then $('<div>', {class: 'notification-title', html: @options.title}) else ''
      message = $('<div>', {class: 'notification-message', html: @options.message})
      notice = $(
        '<div>',
          class: "notification notification-#{@options.location}"
          html: $('<div>',
            class: 'notification-content'
            html: [closeButton, title, message]
          )
      )
      @el.append notice

    Notifyr::empty = ->
      @el.empty()

    Notifyr

  )()

  $.fn[pluginName] = (options) -> return new notifyr(this, options)
