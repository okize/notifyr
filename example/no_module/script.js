$(document).on('ready', function() {

  'use strict';

  function slowAlert() {
    $('#target').notifyr();
  }

  window.setTimeout(slowAlert, 2000);

});
