require.config({
  baseUrl: '/',
  paths: {
    jquery: 'jquery/dist/jquery.min',
    notifyr: 'notifyr'
  }
});

define(['jquery', 'notifyr'], function($, notifyr) {

  $('#notification-1').on('click', function(e) {
    e.preventDefault();
    $('#notifications').notifyr({
      title: 'Events',
      message: 'Notifications trigger events after they appear and after they are dismissed'
    });
    $('#notifications').on('notification-display-complete', function() {
      alert('Notification display complete');
      $('#notifications').off('notification-display-complete');
    });
    $('#notifications').on('notification-remove-complete', function() {
      alert('Notification remove complete');
      $('#notifications').off('notification-remove-complete');
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
      title: data.notificationTitle,
      animationSpeed: data.notificationAnimationSpeed
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

  $('#notification-5').on('click', function(e) {
    e.preventDefault();
    $('#notifications').notifyr({
      location: 'top-right',
      sticky: true,
      title: 'Sticky notification',
      message: 'This notification will not be dismissed until the close button is clicked'
    });
  });

  function delayedNotification() {
    $('#notifications').notifyr({
      title: 'This is the optional title',
      message: 'This is the notification message'
    });
  }

  window.setTimeout(delayedNotification, 2000);

});
