require.config({
  baseUrl: '/',
  paths: {
    jquery: 'jquery/dist/jquery.min',
    pluginify: 'plugin'
  }
});

define(['jquery', 'pluginify'], function ($, pluginify) {

  $('#target').pluginify();

});
