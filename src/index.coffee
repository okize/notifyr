
###*
Module dependencies.
###

###*
Expose `notify`.
###

###*
Notification list.
###

###*
Append to body when it exists.
###

###*
Return a new `Notification` with the given
(optional) `title` and `msg`.

# @param {String} title or msg
# @param {String} msg
# @return {Dialog}
# @api public
###
notify = (title, msg) ->
  switch arguments.length
    when 2
      new Notification(
        title: title
        message: msg
      ).show().hide 4000
    when 1
      new Notification(message: title).show().hide 4000

###*
Construct a notification function for `type`.

# @param {String} type
# @return {Function}
# @api private
###
type = (type) ->
  (title, msg) ->
    notify.apply(this, arguments).type type

###*
Notification methods.
###

###*
Expose constructor.
###

###*
Initialize a new `Notification`.

Options:

- `title` dialog title
- `message` a message to display

# @param {Object} options
@api public
###
Notification = (options) ->
  Emitter.call this
  options = options or {}
  @el = dom(require("./template"))
  @render options
  @el.addClass options.classname  if options.classname
  @effect Notification.effect  if Notification.effect
  return
dom = require("dom")
Emitter = require("emitter")
onBody = require("on-body")
exports = module.exports = notify
list = dom("<ul id=\"notifications\">")
onBody (body) ->
  list.appendTo body
  return

exports.info = notify
exports.warn = type("warn")
exports.error = type("error")
exports.Notification = Notification

###*
Inherit from `Emitter.prototype`.
###
Notification:: = new Emitter

###*
Render with the given `options`.

# @param {Object} options
@api public
###
Notification::render = (options) ->
  el = @el
  title = options.title
  msg = options.message
  self = this
  el.find(".close").on "click", ->
    self.emit "close"
    self.hide()
    false

  el.on "click", (e) ->
    e.preventDefault()
    self.emit "click", e
    return

  el.find(".title").text title
  el.find(".title").remove()  unless title

  # message
  if "string" is typeof msg
    el.find("p").text msg
  else el.find("p").replace msg.el or msg  if msg
  setTimeout (->
    el.removeClass "hide"
    return
  ), 0
  return


###*
Enable the dialog close link.

# @return {Notification} for chaining
# @api public
###
Notification::closable = ->
  @el.addClass "closable"
  this


###*
Set the effect to `type`.

# @param {String} type
# @return {Notification} for chaining
# @api public
###
Notification::effect = (type) ->
  @_effect = type
  @el.addClass type
  this


###*
Show the notification.

# @return {Notification} for chaining
# @api public
###
Notification::show = ->
  @el.appendTo list
  this


###*
Set the notification `type`.

# @param {String} type
# @return {Notification} for chaining
# @api public
###
Notification::type = (type) ->
  @_type = type
  @el.addClass type
  this


###*
Make it stick (clear hide timer), and make it closable.

# @return {Notification} for chaining
# @api public
###
Notification::sticky = ->
  @hide(0).closable()


###*
Hide the dialog with optional delay of `ms`,
otherwise the notification is removed immediately.

# @return {Number} ms
@return {Notification} for chaining
# @api public
###
Notification::hide = (ms) ->
  self = this

  # duration
  if "number" is typeof ms
    clearTimeout @timer
    return this  unless ms
    @timer = setTimeout(->
      self.hide()
      return
    , ms)
    return this

  # hide / remove
  @el.addClass "hide"
  if @_effect
    setTimeout ((self) ->
      self.remove()
      return
    ), 500, this
  else
    self.remove()
  this


###*
Hide the notification without potential animation.

# @return {Dialog} for chaining
# @api public
###
Notification::remove = ->
  @el.remove()
  this
