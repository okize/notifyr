require.config({
  baseUrl: '/',
  paths: {
    jquery: 'jquery/dist/jquery.min',
    notifyr: 'jquery.notifyr'
  }
});

define(['jquery', 'notifyr'], function ($, notifyr) {

  function slowAlert() {
    $('#target').notifyr();
  }

  window.setTimeout(slowAlert, 2000);

});
