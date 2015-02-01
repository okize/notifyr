var $ = require('jquery');
var notifyr = require('../../dist/jquery.notifyr');

$('#trigger-notification-1').on('click', function(e) {
  e.preventDefault();
  var data = $(e.target).data();
  $('#notifications').notifyr({message: data.notificationMessage});
});

$('#trigger-notification-2').on('click', function(e) {
  e.preventDefault();
  var data = $(e.target).data();
  $('#notifications').notifyr({message: data.notificationMessage, location: data.notificationLocation});
});

$('#trigger-notification-3').on('click', function(e) {
  e.preventDefault();
  var data = $(e.target).data();
  $('#notifications').notifyr({message: data.notificationMessage, location: data.notificationLocation, title: 'A title here'});
});

$('#trigger-notification-4').on('click', function(e) {
  e.preventDefault();
  var data = $(e.target).data();
  $('#notifications').notifyr({message: data.notificationMessage, location: data.notificationLocation});
});

function delayedNotice() {
  $('#notifications').notifyr({title: 'Delayed notification', message: 'This is the message of the notification'});
}

window.setTimeout(delayedNotice, 2000);
