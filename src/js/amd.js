require.config({
  baseUrl: '/',
  paths: {
    jquery: 'jquery/dist/jquery.min',
    notifyr: 'notifyr'
  }
});

define(['jquery', 'notifyr'], function ($, notifyr) {

  @@include('./partials/script.js')
});
