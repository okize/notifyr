$(document).on('ready', function() {

  'use strict';

  $('#trigger-notification-1').on('click', function(e) {
    e.preventDefault();
    var data = $(e.target).data();
    $('#notifications').notifyr({message: data.notificationMessage});
    $('#notifications').on('notification-display-complete', function() {
      alert('display complete');
      $('#notifications').off('notification-display-complete');
    });

  });

  $('#trigger-notification-2').on('click', function(e) {
    e.preventDefault();
    var data = $(e.target).data();
    $('#notifications').notifyr({
      message: data.notificationMessage,
      location: data.notificationLocation
    });
  });

  $('#trigger-notification-3').on('click', function(e) {
    e.preventDefault();
    var data = $(e.target).data();
    $('#notifications').notifyr({
      message: data.notificationMessage,
      location: data.notificationLocation,
      title: 'A title here'
    });
  });

  $('#trigger-notification-4').on('click', function(e) {
    e.preventDefault();
    var data = $(e.target).data();
    $('#notifications').notifyr({
      message: data.notificationMessage,
      location: data.notificationLocation,
      title: 'A non standard close button',
      closeButtonHtml: '<button style="margin-bottom: 10px;">close</button>'
    });
  });

  function delayedNotice() {
    $('#notifications').notifyr({
      title: 'Delayed notification',
      message: 'This is the message of the notification'
    });
  }

  window.setTimeout(delayedNotice, 2000);

});
