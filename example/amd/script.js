require.config({
  baseUrl: '/',
  paths: {
    jquery: 'jquery/dist/jquery.min',
    notifyr: 'jquery.notifyr'
  }
});

define(['jquery', 'notifyr'], function ($, notifyr) {

  $('#target').notifyr();

});
