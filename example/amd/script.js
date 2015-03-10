require.config({
  baseUrl: '/',
  paths: {
    jquery: 'jquery/dist/jquery.min',
    notifyr: 'jquery.notifyr'
  }
});

define(['jquery', 'notifyr'], function ($, notifyr) {

  $('#notification-1').on('click', function(e) {
    e.preventDefault();
    $('#notifications').notifyr({message: data.notificationMessage});
    $('#notifications').on('notification-display-complete', function() {
      alert('display complete');
      $('#notifications').off('notification-display-complete');
    });

  });

  $('#notification-2').on('click', function(e) {
    e.preventDefault();
    $('#notifications').notifyr({
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla suscipit, sapien vitae condimentum laoreet, quam lorem lacinia leo, a congue ipsum purus id odio. Quisque rhoncus sem lacus, vitae posuere nisl tempus nec. Nunc ullamcorper erat quis urna porta, ut maximus risus eleifend.',
      location: 'bottom-left',
      classes: ['custom-notification-class']
    });
  });

  $('#notification-3').on('click', function(e) {
    e.preventDefault();
    var data = $(e.target).data();
    $('#notifications').notifyr({
      message: data.notificationMessage,
      location: data.notificationLocation,
      title: data.notificationTitle
    });
  });

  $('#notification-4').on('click', function(e) {
    e.preventDefault();
    $('#notifications').notifyr({
      message: 'This is annoyingly on top of a link',
      location: 'top-left',
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
